import { motion } from 'framer-motion'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import { EXPERIENCE } from '../data/siteData'

export function Experience() {
  return (
    <section id="experience" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Experience"
          title="Where I’ve delivered impact"
          subtitle="A timeline of roles, achievements, and the technologies I’ve used to ship production software."
        />

        <div className="relative mt-10">
          <div className="absolute left-3 top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-6">
            {EXPERIENCE.map((item, idx) => (
              <motion.div
                key={item.company + item.duration}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: idx * 0.04 }}
                className={[
                  'relative grid gap-4 sm:grid-cols-2',
                  idx % 2 === 0 ? 'sm:[&>div]:pl-10' : 'sm:[&>div]:pr-10',
                ].join(' ')}
              >
                <div
                  className={[
                    idx % 2 === 0 ? 'sm:col-start-2' : 'sm:col-start-1',
                    'glass rounded-3xl p-6',
                  ].join(' ')}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold">{item.role}</div>
                      <div className="mt-1 text-sm text-[rgb(var(--muted))]">
                        {item.company}
                      </div>
                    </div>
                    <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-[rgb(var(--muted))] ring-1 ring-white/10">
                      {item.duration}
                    </div>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-[rgb(var(--muted))]">
                    {item.achievements.map((a) => (
                      <li key={a} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-purple-400" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-[rgb(var(--muted))] ring-1 ring-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute left-3 top-6 grid h-6 w-6 place-items-center rounded-full border border-white/15 bg-[rgb(var(--card))] sm:left-1/2 sm:-translate-x-1/2">
                  <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

