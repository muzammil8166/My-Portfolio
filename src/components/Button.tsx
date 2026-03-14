import type { ButtonHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: 'primary' | 'secondary' | 'ghost'
  },
) {
  const { className, variant = 'primary', ...rest } = props
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--ring))]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--bg))]'

  const variants: Record<typeof variant, string> = {
    primary:
      'bg-[rgb(var(--accent))] text-white shadow-lg shadow-purple-500/10 hover:translate-y-[-1px] hover:shadow-purple-500/20',
    secondary:
      'glass text-[rgb(var(--fg))] hover:translate-y-[-1px] hover:border-white/20',
    ghost:
      'text-[rgb(var(--fg))]/80 hover:bg-white/5 hover:text-[rgb(var(--fg))]',
  }

  return (
    <button className={twMerge(base, variants[variant], className)} {...rest} />
  )
}

