import { useReveal } from '../hooks/useReveal'

const ROLES = [
  { title: 'Finance Manager',         desc: 'Run the money across multiple entities — forecasting, KPIs & compliance' },
  { title: 'Finance Staff',           desc: 'Daily bookkeeping, monthly reports, keeping the numbers tight' },
  { title: 'Marketing Staff',         desc: 'Campaign strategy, brand activations, collab culture' },
  { title: 'Graphic Designer',        desc: 'Brand visuals, digital content, packaging & merch aesthetics' },
  { title: 'Content Creator',         desc: 'Photos, videos, storytelling across every platform we run' },
  { title: 'Social Media Specialist', desc: 'Own the strategy & full management of all brand socials' },
  { title: 'Admin',                   desc: 'Daily ops, documentation, keeping the internal stuff tight' },
  { title: 'Operations',              desc: 'Managing production flow & distribution end-to-end' },
  { title: 'Warehouse Staff',         desc: 'Inventory management, inbound & outbound goods' },
  { title: 'Production Staff',        desc: 'On-floor garment & merch production' },
]

export default function Positions({ onSelect }) {
  useReveal()

  const handleClick = (title) => {
    onSelect(title)
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="positions" id="positions">
      <div className="positions-inner">
        <h2 className="section-title reveal">OPEN POSITIONS</h2>
        <p className="section-sub reveal reveal-delay-1">
          All roles WFO Bandung. Bag is competitive, based on what you bring.
        </p>
        <div className="positions-grid">
          {ROLES.map((r) => (
            <div key={r.title} className="pos-card reveal" onClick={() => handleClick(r.title)}>
              <div className="pos-card-body">
                <div className="pos-title">{r.title}</div>
                <div className="pos-desc">{r.desc}</div>
                <div className="pos-tag">FULL TIME &middot; BANDUNG</div>
              </div>
              <div className="pos-arrow">&rarr;</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
