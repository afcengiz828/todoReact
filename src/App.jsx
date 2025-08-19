import { BrowserRouter } from 'react-router-dom'
import './App.css'

import AppRouter from './AppRouter'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllTodo } from './redux/features/todo/TodoSlice'
import { setFiltered, updateFiltered } from './redux/features/todo/FilteredSlice'
import { setAllTodos } from './redux/features/todo/AllTodoSlice'
import { getAllCategories } from './redux/features/categories/AllCategoriesSlice'
import { getUsers } from './redux/features/user/UserSlice'

function App() {
  const dispatch = useDispatch();
  const selector = useSelector(state => state.auth);
  const selectorTodo = useSelector(state => state.todo);
  const [todoData, setTodoData] = useState(false);
  const [catData, setCatData] = useState(false);



  async function fetchData() {
    await dispatch(getAllTodo()).then((response) => {
      if (response.type == "gettodo/fulfilled") {
        console.log("Veri başarıyla yüklendi.", response);
        setTodoData(true);
      }
      else {
        console.log(response);
      }
    })
  }

  async function fetchCat() {
    await dispatch(getAllCategories()).then((response) => {
      if (response.type == "getcategory/fulfilled") {
        console.log("Veri başarıyla yüklendi.", response);
        setCatData(true);
      }
      else {
        console.log(response);
      }
    })
  }

  async function fetcUsers(params) {
    await dispatch(getUsers()).then((response) => {
      if (response.type == "getcategory/fulfilled") {
        console.log("Veri başarıyla yüklendi.", response);
        setCatData(true);
      }
      else {
        console.log(response);
      }
    })
  }

  useEffect(() => {
    if (selector.isAuthenticated) {
      fetchData();
      fetchCat();
      fetcUsers();
    }
  }, [selector.isAuthenticated]);

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
