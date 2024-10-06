import React, { useRef } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import CreateCustomer from './components/CreateCustomer'
import ReadCustomers from './components/ReadCustomers'

function App() {
  const createRef = useRef(null)
  const readRef = useRef(null)
  const updateRef = useRef(null)

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className='container'>
      <Navbar
        scrollToSection={scrollToSection}
        createRef={createRef}
        readRef={readRef}
        updateRef={updateRef}
      />
      <section ref={createRef} className='section'>
        <CreateCustomer />
      </section>
      <section ref={readRef} className='section'>
        <ReadCustomers />
      </section>
    </div>
  )
}

export default App
