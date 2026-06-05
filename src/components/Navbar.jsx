import { useState, useEffect } from 'react'
import SystemModal from './SystemModal'

const LOGO = 'https://d2kchovjbwl1tk.cloudfront.net/vendors/10019/assets/image/1741852537028-PREFACE_RED_PNG_resized256-png.webp'
const SRCSET = [128,256,512,1024].map(s =>
  `https://d2kchovjbwl1tk.cloudfront.net/vendors/10019/assets/image/1741852537028-PREFACE_RED_PNG_resized${s}-png.webp ${s}w`
).join(',')

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [modalOpen, setModalOpen]   = useState(false)
  const [scrolled, setScrolled]     = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const openModal  = (e) => { e.preventDefault(); setDrawerOpen(false); setModalOpen(true) }
  const closeModal = () => setModalOpen(false)
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a className="nav-logo" href="#" aria-label="Preface Wearhouse">
          <img src={LOGO} srcSet={SRCSET} sizes="(max-width:600px) 20vw, 256px" fetchPriority="high" alt="PREFACE" />
        </a>

        <div className="nav-links">
          <a className="nav-link active" href="#">Life at Preface</a>
          <a className="nav-link locked" href="#" onClick={openModal}>Dashboard</a>
        </div>

        <button className="nav-login" onClick={openModal}>Login &rarr;</button>

        <div className="nav-mobile-actions">
          <button className="nav-login-mobile" onClick={openModal}>Login</button>
          <button className="nav-burger" aria-label="Menu" onClick={() => setDrawerOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`nav-drawer${drawerOpen ? ' open' : ''}`}>
        <a className="nav-link active" href="#" onClick={closeDrawer}>Life at Preface</a>
        <a className="nav-link locked" href="#" onClick={openModal}>Dashboard</a>
        <button className="drawer-login" onClick={openModal}>Login &rarr;</button>
      </div>

      <SystemModal isOpen={modalOpen} onClose={closeModal} />
    </>
  )
}
