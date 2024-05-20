import React from 'react'
import Sidebar from './navCompnonet'
import { Outlet } from 'react-router-dom'

export default function Nav() {
  return (
    <div className='flex'>
    <Sidebar/>
    <Outlet/>
    </div>
  )
}
