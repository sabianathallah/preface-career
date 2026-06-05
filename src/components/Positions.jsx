import { useState, useEffect, useRef } from 'react'

const ROLES = [
  {
    title: 'Finance Manager',
    desc: 'Run the money across multiple entities — forecasting, KPIs & compliance',
    qualifications: [
      'Min. 3 years experience in finance/accounting, preferably multi-entity',
      'Strong in financial forecasting, budgeting & cash flow management',
      'Familiar with KPI reporting & compliance standards',
      'Proficient in accounting software (Accurate, Jurnal, or similar)',
      'Detail-oriented, analytical, works well under pressure',
    ],
  },
  {
    title: 'Finance Staff',
    desc: 'Daily bookkeeping, monthly reports, keeping the numbers tight',
    qualifications: [
      'D3/S1 Accounting or related field',
      'Min. 1 year experience in bookkeeping or finance admin',
      'Proficient in Microsoft Excel & basic accounting software',
      'Organized, accurate, and consistent',
    ],
  },
  {
    title: 'Operation Staff',
    desc: 'Managing production flow & distribution end-to-end',
    qualifications: [
      'Experience in operations, preferably in fashion/retail',
      'Understand production processes & supply chain basics',
      'Strong problem-solving and coordination skills',
      'Able to work across multiple teams simultaneously',
      'Organized, reliable, and detail-oriented',
    ],
  },
  {
    title: 'Marketing Intern',
    desc: 'Campaign strategy, brand activations, collab culture',
    qualifications: [
      'Currently studying or fresh grad from Marketing, Communications, or related',
      'Passionate about streetwear, fashion & local brand culture',
      'Creative thinker with strong communication skills',
      'Familiar with social media & digital marketing basics',
      'Eager to learn, proactive, not afraid to pitch ideas',
    ],
  },
  {
    title: 'Admin',
    desc: 'Daily ops, documentation, keeping the internal stuff tight',
    qualifications: [
      'Organized, detail-oriented, and proactive',
      'Proficient in Microsoft Office / Google Workspace',
      'Experience in administrative tasks & internal coordination',
      'Good communication skills, written and verbal',
      'Can manage multiple tasks simultaneously',
    ],
  },
  {
    title: 'Graphic Designer',
    desc: 'Brand visuals, digital content, packaging & merch aesthetics',
    qualifications: [
      'Proficient in Adobe Illustrator, Photoshop & Figma',
      'Strong portfolio showing brand identity & editorial design',
      'Understand streetwear/fashion visual language',
      'Can handle packaging, merch graphics & digital content',
      'Fast turnaround without sacrificing quality',
    ],
  },
  {
    title: 'Production Staff',
    desc: 'On-floor garment & merch production',
    qualifications: [
      'Experience in garment production or merchandise manufacturing',
      'Understand production flow and quality control basics',
      'Diligent, disciplined, able to meet production targets',
      'Willing to work in a fast-paced production environment',
    ],
  },
  {
    title: 'Warehouse Staff',
    desc: 'Inventory management, inbound & outbound goods',
    qualifications: [
      'Experience in warehouse or inventory management',
      'Familiar with stock opname & goods tracking systems',
      'Physical fit, organized, and reliable',
      'Basic computer skills for inventory recording',
    ],
  },
]

export default function Positions({ onSelect }) {
  const [openIdx, setOpenIdx]     = useState(null)
  const [visibleSet, setVisible]  = useState(new Set())
  const gridRef                   = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = Number(e.target.dataset.idx)
          setVisible(prev => new Set([...prev, idx]))
          observer.unobserve(e.target)
        }
      }),
      { threshold: 0.08 }
    )
    const cards = gridRef.current?.querySelectorAll('[data-idx]') || []
    cards.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const toggleCard = (idx) => {
    setOpenIdx(prev => prev === idx ? null : idx)
  }

  const handleApply = (e, title) => {
    e.stopPropagation()
    onSelect(title)
    document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="positions" id="positions">
      <div className="positions-inner">
        <h2 className="section-title reveal">OPEN POSITIONS</h2>
        <p className="section-sub reveal reveal-delay-1" style={{transitionDelay:'0.1s'}}>
          All roles WFO Bandung. Bag is competitive, based on what you bring.
        </p>
        <div className="positions-grid" ref={gridRef}>
          {ROLES.map((r, idx) => {
            const isOpen   = openIdx === idx
            const isVisible = visibleSet.has(idx)
            return (
              <div
                key={r.title}
                data-idx={idx}
                className={`pos-card${isOpen ? ' pos-card--open' : ''}${isVisible ? ' pos-visible' : ' pos-hidden'}`}
              >
                <div className="pos-card-main" onClick={() => toggleCard(idx)}>
                  <div className="pos-card-body">
                    <div className="pos-title">{r.title}</div>
                    <div className="pos-desc">{r.desc}</div>
                    <div className="pos-tag">FULL TIME &middot; BANDUNG</div>
                  </div>
                  <div className={`pos-arrow${isOpen ? ' pos-arrow--open' : ''}`}>
                    {isOpen ? '↓' : '→'}
                  </div>
                </div>

                {isOpen && (
                  <div className="pos-detail">
                    <div className="pos-detail-title">What we&rsquo;re looking for</div>
                    <ul className="pos-qual-list">
                      {r.qualifications.map((q, i) => (
                        <li key={i} className="pos-qual-item">{q}</li>
                      ))}
                    </ul>
                    <button
                      className="pos-apply-btn"
                      onClick={(e) => handleApply(e, r.title)}
                    >
                      APPLY FOR THIS ROLE &rarr;
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
