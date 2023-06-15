import React from 'react'
import Navbar from '../pages/shared/Navbar'
import Footer from '../pages/shared/Footer'
import { Outlet } from 'react-router-dom'

const Main = () => {
  return (
    <div>
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  )
}

export default Main