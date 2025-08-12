import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AppRouter from './AppRouter'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTodo } from './redux/features/todo/TodoSlice'
import { setFiltered, updateFiltered } from './redux/features/todo/FilteredSlice'
import { setAllTodos } from './redux/features/todo/AllTodoSlice'
import { getAllCategories } from './redux/features/categories/AllCategoriesSlice'

function App() {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.filter);
  const selectorTodo = useSelector(state => state.todo);



  async function fetchData(url) {
    await dispatch(getAllTodo(url ? url : "")).then((response) => {
      if (response.type == "gettodo/fulfilled") {
        console.log("Veri başarıyla yüklendi.", response);
      }
      else {
        console.log(response);
      }
    })
  }

  async function fetchCat() {
    await dispatch(getAllCategories()).then((response) => {
      if (response.type == "gettodo/fulfilled") {
        console.log("Veri başarıyla yüklendi.", response);
      }
      else {
        console.log(response);
      }
    })
  }

  useEffect(async () => {
    await fetchData();
    await fetchCat();

    //await fetchData("?page=1&limit=10");
  }, []);

  useEffect(() => {
    if (selectorTodo.data) {
      dispatch(setFiltered(selectorTodo.data));
      dispatch(setAllTodos(selectorTodo.data));

    }

  }, [selectorTodo.data]);

  return (
    <>

      {/* Router ları başka bir dosyada tanımlayıp projeye ekleyeceğimiz zaman browser router kullanıyoruz. */}
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>



    </>
  )
}

export default App
