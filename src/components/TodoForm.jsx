import { yupResolver } from '@hookform/resolvers/yup';
import { isValid, parse } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { Link, Route, useNavigate, useParams } from 'react-router-dom';
import { addTodo, getAllTodo, updateTodo } from '../redux/features/todo/TodoSlice';
import { addFiltered, updateFiltered } from '../redux/features/todo/FilteredSlice';

const TodoForm = ({}) => {
  
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
                    

  const validationSchema = Yup.object({
        title: Yup.string().min(5, "Title must be 3 character at least")
            .max(200, "Title must be max 100 character"),
        description : Yup.string().max(500, "Description must be max 500 character"),
        status: Yup.string().required("Status is required."),
        priority: Yup.string(),
        dueDate: Yup.string()
            .test("date-format", "Please enter date in the valid format", (value) => {
                if (!value || value.trim() === '') return true;
                return dateRegex.test(value);
            })
            .test("valid-date", "Please enter a valid date", (value) => {
                if(value){

                    const date = parse(value, "yyyy-MM-dd", new Date());
                    return isValid(date);
                }
                return true;
            })
            .test("upper-today", "Please enter a future day.", (value) => {
                if(value){

                    const date = parse(value, "yyyy-MM-dd", new Date());
                    const today = new Date();
                    return date > today;
                }
                return true
            })
  });

  const {register, 
         watch,
         setValue,
         handleSubmit, 
         formState : {errors, isSubmitting} //isSubmitting form submit olup gönderilme sürecinde olup olmadığını tutan değer
        } = useForm({
            resolver : yupResolver(validationSchema)
        });

  const dispatch = useDispatch();
  var selector = useSelector(state => state.filter);

  const {idTodo} = useParams();
  const [todos, setTodos] = useState([]);

  useEffect(() => {

    setTodos(selector.filteredTodos);

  },[selector.filteredTodos])

  useEffect( () => {
    if(idTodo){
        console.log(idTodo);
        setValue("id", idTodo);
        handelChangeUpdate(idTodo);
    }
  },[idTodo, todos])

  const handelChangeUpdate = (id) => {
    
    var formvals = null;
    //console.log(todos)
    //const todoIdList = todos.data.map( (todo) => todo.id);
    //console.log(todoIdList); 
    setValue("title", "");
    setValue("description", "");
    setValue("status", "status");
    setValue("priority", "priority");            
    setValue("dueDate", "");

    todos.forEach(todo => {

        if(todo.id == Number(id) && id.trim()){

            setValue("title", todo.title);
            console.log(todo.title);
            setValue("description", todo.description ? todo.description : "");
            setValue("status", todo.status);
            setValue("priority", todo.priority);            
            setValue("dueDate", todo.due_date ? todo.due_date.split(" ")[0] : "");      
            formvals = watch();
            console.log(formvals);

        }
    });

    //console.log(todos);
    //console.log(id);
  };

  const onSubmit = async (data) => {
      console.log(data);

    if( !data.id ){
        console.log("data boş add çalıştı.")
        console.log(data)
        try{
            const response = await dispatch(addTodo(data));
            //while(!selector.filteredData);
            dispatch(addFiltered(response.payload));
            console.log(selector.filteredTodos); 
            console.log(response);
        }
        catch(e){
            console.log(e)
        }
    }
    else{

        try{
            data.id = Number(data.id);
        }catch(e){
            console.log(e);
        }

        console.log("data var update çalıştı.")

        try{
            const response = await dispatch(updateTodo(data));
            //while(!selector.filteredData);
            dispatch(updateFiltered(response.payload));
            console.log(selector.filteredTodos); 
            console.log(response);
        }
        catch(e){
            console.log(e)
        }
    }

    console.log("onsubmit çalıştı")

  }
  
  return (
    <div>
        <div>TodoForm</div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register("title")} type="text" placeholder='Title'/> <br></br> 
                {errors.title && errors.title.message}
            </div>
            <div>
                <input {...register("description")} type="text" placeholder='Description'/> <br/>
                {errors.description && errors.description.message}

            </div>
            <div>
                <select {...register("status")}>
                    <option value="status">Status</option>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>    
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select> <br/>
                {errors.status && errors.status.message}

            </div>
            <div>
                <select {...register("priority")}>
                    <option value="priority">Priority</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select> <br/>
                {errors.priority && errors.priority.message}

            </div>
            <div>
                <input {...register("dueDate")} type="date" placeholder='Due Date'/> <br/> 
                {errors.dueDate && errors.dueDate.message}

            </div>

            <div>
                <input {...register("id")} onChange={(e) => {
                    handelChangeUpdate(e.target.value);
                }} type="text" placeholder='Id to update, not required.'/> <br/>
            </div>


            <button disabled={isSubmitting} type='submit'>Submit</button>

        </form>

        

    </div>
  )
}

export default TodoForm