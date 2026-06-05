const LOGO = 'https://d2kchovjbwl1tk.cloudfront.net/vendors/10019/assets/image/1741852537028-PREFACE_RED_PNG_resized1024-png.webp'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <img className="hero-watermark" src={LOGO} alt="" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-tag-wrap">
          <div className="hero-tag">★ BANDUNG, ID &mdash; WFO</div>
          <span className="hero-tag-sticker">OPEN</span>
        </div>
        <h1 className="hero-headline">
          <span className="hero-line-1">WE NEED</span>
          <span className="hero-line-2">HEADS.</span>
        </h1>
        <p className="hero-sub">
          PREFACE IS EXPANDING.<br />
          WE&rsquo;RE LOOKING FOR THE RIGHT HEADS TO RIDE WITH US.
        </p>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-label">Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
