import { yupResolver } from '@hookform/resolvers/yup';
import { isValid, parse } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { Link, Route, useNavigate } from 'react-router-dom';
import { addTodo, getAllTodo, updateTodo } from '../redux/features/todo/TodoSlice';
import { addFiltered } from '../redux/features/todo/FilteredSlice';

const TodoForm = () => {
  
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  const validationSchema = Yup.object({
        title: Yup.string().required("Title is required.")
            .min(5, "Title must be 3 character at least")
            .max(100, "Title must be max 100 character"),
        description : Yup.string().max(500, "Description must be max 500 character"),
        status: Yup.string().required("Status is required."),
        priority: Yup.string(),
        dueDate: Yup.string()
            .matches(dateRegex, "Please enter date in the valid format")
            .test("valid-date", "Please enter a valid date", (value) => {
                const date = parse(value, "yyyy-mm-dd", new Date());
                return isValid(date);
            })
            .test("upper-today", "Please enter a future day.", (value) => {
                const date = parse(value, "yyyy-MM-dd", new Date());
                const today = new Date();
                return date > today;
            })
  });

  const {register, 
         handleSubmit, 
         formState : {errors, isSubmitting} //isSubmitting form submit olup gönderilme sürecinde olup olmadığını tutan değer
        } = useForm({
            resolver : yupResolver(validationSchema)
        });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  var selector = useSelector(state => state.filter);
  const [todos, setTodos] = useState([]);

  useEffect(() => {

    setTodos(selector.filteredTodos);

  },[selector.filteredTodos])

  const handelChangeUpdate = (e) => {
    
    const id = e.target.value;

    todos.forEach(todo => {
        if(todo.id == id && id.trim()){
            
        }
    });

    //console.log(todos);
    //console.log(id);
  };

  const onSubmit = async (data) => {
      console.log(data);
    if( !data.update && !Number.isInteger(data.update) ){

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
    else if ( data.update && Number.isInteger(data.update) ){
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

  }
  
  return (
    <div>
        <div>TodoForm</div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register("title")} value="" type="text" placeholder='Title'/> <br></br> 
                {errors.title && errors.title.message}
            </div>
            <div>
                <input {...register("description")} type="text" placeholder='Description'/> <br/>
                {errors.description && errors.description.message}

            </div>
            <div>
                <select {...register("status")}>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select> <br/>
                {errors.status && errors.status.message}

            </div>
            <div>
                <select {...register("priority")}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select> <br/>
                {errors.priority && errors.priority.message}

            </div>
            <div>
                <input {...register("dueDate")} type="date" value="" placeholder='Due Date'/> <br/> 
                {errors.dueDate && errors.dueDate.message}

            </div>

            <div>
                <input {...register("update")} onChange={(e) => {
                    handelChangeUpdate(e);
                }} type="text" placeholder='Id to update, not required.'/> <br/>
            </div>


            <button disabled={isSubmitting} type='submit'>Submit</button>

        </form>

        

    </div>
  )
}

export default TodoForm