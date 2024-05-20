import React from 'react'
import Sidebar from './navCompnonet'
import LandingPage from '../Hero Section/LandingPage'
import Homepage from '../Hero Section/Hompage'
import Library from '../Hero Section/Library'
import { Outlet } from 'react-router-dom'

export default function Nav() {
  return (
    <div className='flex'>
    <Sidebar/>
    {/* <Homepage/> */}
    <Outlet/>
    </div>
  )
}
