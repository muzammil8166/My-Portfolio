import { useEffect, useMemo, useState } from 'react'
import type { NavSectionId } from '../data/siteData'

export function useActiveSection(sectionIds: NavSectionId[]) {
  const ids = useMemo(() => Array.from(new Set(sectionIds)), [sectionIds])
  const [active, setActive] = useState<NavSectionId>(ids[0] ?? 'home')

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (!elements.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))
        const top = visible[0]?.target as HTMLElement | undefined
        const id = top?.id as NavSectionId | undefined
        if (id) setActive(id)
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: [0.1, 0.2, 0.4, 0.6] },
    )

    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}

