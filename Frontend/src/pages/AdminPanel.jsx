

import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/Role';

import {
    
    FaBars,
    
  } from "react-icons/fa";
  import { SlBookOpen } from "react-icons/sl";




const AdminPanel = () => {
   const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()


    useEffect(()=>{
        if(user?.role !== ROLE.ADMIN){
            navigate("/")
        }
    },[user])

  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>

        <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
        <div className="flex items-center justify-between mb-6 text-blue-700">
          <FaBars  className="cursor-pointer" />
          <div className="flex items-center">
            <SlBookOpen className="text-2xl" />
            <h1 className="ml-3 text-lg font-bold">Book Rent</h1>
          </div>
        </div>

                 {/***navigation */}       
                <div>   
                    <nav className='grid p-4'>
                        <Link to={"dashboard"} className='px-2 py-1 hover:bg-slate-100'>Dashboar</Link>
                        <Link to={"upload-book"} className='px-2 py-1 hover:bg-slate-100'>upload book</Link>
                        <Link to={"owner-list"} className='px-2 py-1 hover:bg-slate-100'>Owner list</Link>
                        <Link to={"books"} className='px-2 py-1 hover:bg-slate-100'>Dashboar</Link>
                        <Link to={"notfication"} className='px-2 py-1 hover:bg-slate-100'>upload book</Link>
                        <Link to={"setting"} className='px-2 py-1 hover:bg-slate-100'>setting</Link>
                        <Link to={"logout"} className='px-2 py-1 hover:bg-slate-100'>logout</Link>
                    </nav>
                </div>  
        </aside>

        <main className='w-full h-full p-2'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel