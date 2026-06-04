import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Positions from './components/Positions'
import ApplyForm from './components/ApplyForm'
import Footer from './components/Footer'

export default function App() {
  const [selectedPosition, setSelectedPosition] = useState('')

  return (
    <>
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
