import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

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
    title: 'Marketing Staff',
    desc: 'Campaign strategy, brand activations, collab culture',
    qualifications: [
      'Experience in marketing, brand activation, or campaign management',
      'Understand streetwear/fashion/lifestyle market',
      'Strong network or ability to build brand collaborations',
      'Creative thinker with strong communication skills',
      'Familiar with digital marketing tools & analytics',
    ],
  },
  {
    title: 'Graphic Designer',
    desc: 'Brand visuals, digital content, packaging & merch aesthetics',
    qualifications: [
      'Proficient in Adobe Illustrator, Photoshop & Figma',
      'Strong portfolio showing brand identity & editorial design',
      'Understand streetwear/fashion visual language',
      'Can handle packaging design, merch graphics & digital content',
      'Fast turnaround without sacrificing quality',
    ],
  },
  {
    title: 'Content Creator',
    desc: 'Photos, videos, storytelling across every platform we run',
    qualifications: [
      'Skilled in photography and/or videography (fashion/lifestyle preferred)',
      'Proficient in video editing (Premiere Pro, CapCut, or similar)',
      'Strong eye for aesthetics that match brand identity',
      'Experience creating content for Instagram, TikTok & YouTube',
      'Can work independently and hit deadlines consistently',
    ],
  },
  {
    title: 'Social Media Specialist',
    desc: 'Own the strategy & full management of all brand socials',
    qualifications: [
      'Min. 2 years managing brand social media accounts',
      'Strong understanding of Instagram, TikTok & emerging platforms',
      'Data-driven — comfortable reading analytics & adjusting strategy',
      'Copywriting skills that match streetwear tone of voice',
      'Experience growing brand communities organically',
    ],
  },
  {
    title: 'Admin',
    desc: 'Daily ops, documentation, keeping the internal stuff tight',
    qualifications: [
      'Organized, detail-oriented, and proactive',
      'Proficient in Microsoft Office / Google Workspace',
      'Experience handling administrative tasks & internal coordination',
      'Good communication skills, both written and verbal',
      'Can manage multiple tasks simultaneously',
    ],
  },
  {
    title: 'Operations',
    desc: 'Managing production flow & distribution end-to-end',
    qualifications: [
      'Experience in operations management, preferably in fashion/retail',
      'Understand production processes & supply chain basics',
      'Strong problem-solving and process optimization skills',
      'Able to coordinate across multiple teams',
      'Data-oriented with experience in operational reporting',
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
  {
    title: 'Production Staff',
    desc: 'On-floor garment & merch production',
    qualifications: [
      'Experience in garment production or merchandise manufacturing',
      'Understand production flow and quality control basics',
      'Diligent, disciplined, and able to meet production targets',
      'Willing to work in a fast-paced production environment',
    ],
  },
]

export default function Positions({ onSelect }) {
  useReveal()
  const [openIdx, setOpenIdx] = useState(null)

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
        <p className="section-sub reveal reveal-delay-1">
          All roles WFO Bandung. Bag is competitive, based on what you bring.
        </p>
        <div className="positions-grid">
          {ROLES.map((r, idx) => {
            const isOpen = openIdx === idx
            return (
              <div key={r.title} className={`pos-card reveal${isOpen ? ' pos-card--open' : ''}`}>
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
