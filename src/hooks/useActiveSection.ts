import { useEffect, useMemo, useRef, useState } from 'react'
import type { NavSectionId } from '../data/siteData'

type ActiveSectionOptions = {
  // Preferred visibility ratio before switching section (e.g. 0.5).
  // Lower values react faster for short sections.
  preferredThreshold?: number
  // Tune observer trigger area to account for sticky navbar.
  rootMargin?: string
}

const DEFAULT_ROOT_MARGIN = '-18% 0px -55% 0px'

export function useActiveSection(
  sectionIds: NavSectionId[],
  options: ActiveSectionOptions = {},
) {
  const preferredThreshold = options.preferredThreshold ?? 0.5
  const rootMargin = options.rootMargin ?? DEFAULT_ROOT_MARGIN
  const ids = useMemo(() => Array.from(new Set(sectionIds)), [sectionIds])
  const [active, setActive] = useState<NavSectionId>(ids[0] ?? 'home')
  const frameRef = useRef<number | null>(null)
  const ratioMapRef = useRef<Map<NavSectionId, number>>(new Map())
  const visibleSetRef = useRef<Set<NavSectionId>>(new Set())
  const activeRef = useRef<NavSectionId>(ids[0] ?? 'home')

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    if (!ids.length) return
    const sections = ids
      .map((id) => ({ id, el: document.getElementById(id) }))
      .filter(
        (x): x is { id: NavSectionId; el: HTMLElement } => x.el instanceof HTMLElement,
      )

    if (!sections.length) return

    const applyBestActive = () => {
      const viewportAnchor = window.innerHeight * 0.42
      const currentActive = activeRef.current
      const currentRatio = ratioMapRef.current.get(currentActive) ?? 0

      let bestId: NavSectionId | null = null
      let bestScore = Number.NEGATIVE_INFINITY

      for (const { id, el } of sections) {
        const ratio = ratioMapRef.current.get(id) ?? 0
        if (!visibleSetRef.current.has(id) && ratio <= 0) continue

        const rect = el.getBoundingClientRect()
        const center = rect.top + rect.height / 2
        const distancePenalty = Math.abs(center - viewportAnchor)
        const score = ratio * 1000 - distancePenalty

        if (score > bestScore) {
          bestScore = score
          bestId = id
        }
      }

      if (!bestId) {
        let fallbackId: NavSectionId | null = null
        let smallestDistance = Number.POSITIVE_INFINITY

        for (const { id, el } of sections) {
          const rect = el.getBoundingClientRect()
          const center = rect.top + rect.height / 2
          const distance = Math.abs(center - viewportAnchor)
          if (distance < smallestDistance) {
            smallestDistance = distance
            fallbackId = id
          }
        }

        if (fallbackId) {
          setActive((prev) => (prev === fallbackId ? prev : fallbackId))
        }

        frameRef.current = null
        return
      }

      const bestRatio = ratioMapRef.current.get(bestId) ?? 0
      const shouldSwitch =
        bestId !== currentActive &&
        (bestRatio >= preferredThreshold || currentRatio < preferredThreshold)

      if (shouldSwitch) {
        setActive(bestId)
      } else if (bestId === currentActive) {
        setActive((prev) => prev)
      }

      frameRef.current = null
    }

    const scheduleApply = () => {
      if (frameRef.current !== null) return
      frameRef.current = window.requestAnimationFrame(applyBestActive)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as NavSectionId
          ratioMapRef.current.set(id, entry.intersectionRatio)
          if (entry.isIntersecting) {
            visibleSetRef.current.add(id)
          } else {
            visibleSetRef.current.delete(id)
          }
        }
        scheduleApply()
      },
      {
        root: null,
        rootMargin,
        threshold: [0, 0.1, 0.25, 0.4, 0.5, 0.65, 0.8, 1],
      },
    )

    for (const { id, el } of sections) {
      ratioMapRef.current.set(id, 0)
      observer.observe(el)
    }

    const onResize = () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
        frameRef.current = null
      }
      applyBestActive()
    }

    applyBestActive()
    window.addEventListener('resize', onResize)

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current)
      }
      observer.disconnect()
      ratioMapRef.current.clear()
      visibleSetRef.current.clear()
      window.removeEventListener('resize', onResize)
    }
  }, [ids, preferredThreshold, rootMargin])

  return active
}

