import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='flex items-center justify-center min-h-screen bg-[url("/bg_image.png")] bg-cover bg-center'>
        <Navbar/>
        <Header/>
    </div>
  )
}

export default Home