import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Positions from './components/Positions'
import ApplyForm from './components/ApplyForm'
import Footer from './components/Footer'

export default function App() {
  const [selectedPosition, setSelectedPosition] = useState('')

  const TICK = 'NOW HIRING  ★  BANDUNG, ID  ★  NO PASSENGERS, REAL ONES ONLY  ★  8 OPEN ROLES  ★  WFO  ★  SLIDE IN  ★  '

  return (
    <>
      <div className="ticker" aria-hidden="true">
        <div className="ticker-inner">
          {[...Array(4)].map((_, i) => (
            <span key={i}>{TICK}</span>
          ))}
        </div>
      </div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Positions onSelect={setSelectedPosition} />
        <ApplyForm selectedPosition={selectedPosition} />
      </main>
      <Footer />
    </>
  )
}
