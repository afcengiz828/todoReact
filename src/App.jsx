import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AppRouter from './AppRouter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getTodo } from './redux/features/todo/TodoSlice'

function App() {
  const dispatch = useDispatch();
  async function fetchData() {
      const response = await dispatch(getTodo());
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
