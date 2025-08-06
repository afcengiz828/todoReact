import React from 'react'
import Dashboard from '../pages/Dashboard'
import { Link } from 'react-router-dom'

const Header = () => {

    return (

        // HEADER SECTION 
        <header className='py-6 text-black font-poppins uppercase '>
            {/* HEADER CONTAINER */}
            <div className="container mx-auto flex items-center justify-between px-2 space-x-8">
                {/* LOGO */}
                <Link to={'../dashboard'} >
                    <a href='#' className='font-poppins text-2xl sm:text-4xl font-bold text-transparent bg-gradient-to-r bg-clip-text from-amber-400 to-red-500'>TODO</a>
                </Link>

                {/* NAVIGATION BAR */}
                <nav className='flex justify-between flex-1 '>
                    <div className="flex items-center text-lg space-x-4">
                        <Link to={'../todolist'} >
                            <a href="#" className='hover:text-amber-400 transition duration-300 text-xl sm:text-2xl'>List</a>
                        </Link>
                        <Link to={'../tododetail'} >
                            <a href="#" className='hover:text-amber-400 transition duration-300 text-xl sm:text-2xl'>Add</a>
                        </Link>

                    </div>
                </nav>
            </div>
        </header>

    )
}

export default Header