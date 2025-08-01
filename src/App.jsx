import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AppRouter from './AppRouter'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTodo } from './redux/features/todo/TodoSlice'
import { setFiltered, updateFiltered } from './redux/features/todo/FilteredSlice'

function App() {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.filter);
  const selectorTodo = useSelector(state => state.todo);
  


  async function fetchData() {
      await dispatch(getAllTodo("?page=1&limit=10")).then((response) => {
          if(response.type == "gettodo/fulfilled"){
              console.log("Veri başarıyla yüklendi.", response);
          }    
          else {
            console.log(response);
          }      
      })
    }

    useEffect(() => {    
      fetchData();
    },[])

    useEffect(() => {
      console.log(selectorTodo.data);
      if(selectorTodo.data){
            dispatch(setFiltered(selectorTodo.data));
            //console.log("filtered todos");
            //console.log(selector.filteredTodos);       // Neden burada yakalayamıyorum.      
      } 
    },[selectorTodo.data]);
    
    // useEffect(() => {
    //   console.log(selector.filteredTodos)
    // },[selector.filteredTodos])

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
