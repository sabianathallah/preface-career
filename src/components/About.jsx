import { useReveal } from '../hooks/useReveal'

export default function About() {
  useReveal()

  return (
    <section className="about" id="about">
      <div className="about-inner">
        <div className="about-grid">
          <h2 className="about-heading reveal">WHO<br />WE ARE</h2>
          <p className="about-body reveal reveal-delay-1">
            Preface ain&rsquo;t just a fashion brand. We&rsquo;re building a whole culture &mdash;
            straight outta Bandung, spreading everywhere. We&rsquo;re moving into new lanes
            and we need the right heads to come up with us. No passengers. Real ones only.
          </p>
        </div>
        <div className="about-stats">
          <div className="stat reveal">
            <div className="stat-value">4 BUSINESS UNITS</div>
            <div className="stat-label">and we ain&rsquo;t done</div>
          </div>
          <div className="stat reveal reveal-delay-1">
            <div className="stat-value">EST. BANDUNG</div>
            <div className="stat-label">from the streets, for everyone</div>
          </div>
          <div className="stat reveal reveal-delay-2">
            <div className="stat-value">WE DON&rsquo;T STOP</div>
            <div className="stat-label">no days off. ever.</div>
          </div>
        </div>
      </div>
    </section>
  )
}
