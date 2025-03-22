import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import Navbar from './component/navbar/Navbar'
import Home from './component/home/Home'
import Footer from './component/footer/Footer'

function App() {

  return (
    <>
      
      <div>
        <Navbar/>
        <Home/>
        <Footer/>

      </div>
    </>
  )
}

export default App
