import React, { useEffect } from 'react'
import CategoryForm from '../components/CategoryForm'
import Header from '../components/Header'
import CategoryList from '../components/CategoryList'
import { useSelector } from 'react-redux'

const Categories = () => {

  const selector = useSelector(state => state.dark);

  useEffect(() => {
    if (selector.dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [selector.dark]);

  return (
    <div className='bg-gray-50 dark:bg-gray-900 h-full'>
      <center>

        <Header />

        {/* Kategori ekleme formu */}
        <CategoryForm />

        {/* Kategori Listesi */}
        <CategoryList />
        
        
      </center>
    </div>

  )
}

export default Categories