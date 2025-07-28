import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Dashboard from './pages/dashboard'
import TodoDetail from './pages/TodoDetail'
import TodoList from './pages/TodoList'
import AppRouter from './AppRouter'

function App() {

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
