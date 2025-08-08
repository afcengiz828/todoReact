import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { setDark } from '../redux/features/todo/ThemeSlice';

const Header = () => {


    const dispatch = useDispatch();

    const toggleTheme = (e) => {
        document.documentElement.classList.toggle("dark");
    }

    return (

        // HEADER SECTION 
        <header className='py-6 text-black dark:text-gray-200 uppercase '>
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

                    <div>
                        <button className='cursor-pointer rounded-full bg-white' onClick={() => dispatch(setDark())} aria-label="Toggle dark mode">
                            <img
                                src="/dark-theme-svgrepo-com.svg"
                                alt="Koyu Tema Ikonu"
                                className="w-10 h-10"
                            />
                        </button>
                    </div>
                </nav>
            </div>
        </header>

    )
}

export default Header