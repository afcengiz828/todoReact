import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AppRouter from './AppRouter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllTodo } from './redux/features/todo/TodoSlice'

function App() {
  const dispatch = useDispatch();
  async function fetchData() {
      const response = await dispatch(getAllTodo());
    }
  useEffect(() => {
    
    fetchData();

  },[])

  return (
    <>

      {/* Router ları başka bir dosyada tanımlayıp projeye ekleyeceğimiz zaman browser router kullanıyoruz. */}
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>

    
      
    </>
  )
}

export default App
