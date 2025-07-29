import { yupResolver } from '@hookform/resolvers/yup';
import { isValid, parse } from 'date-fns';
import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as Yup from "yup";
import { Link, Route, useNavigate } from 'react-router-dom';
import { addTodo } from '../redux/features/todo/TodoSlice';

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

  const onSubmit = async (data) => {
    try{
         
        console.log(data);
        const response = await dispatch(addTodo(data));
        console.log(response);
    }
    catch(e){
        console.log(e)
    }
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
                <input {...register("description")} type="text" placeholder='Description'/> <br></br>
                {errors.description && errors.description.message}

            </div>
            <div>
                <select {...register("status")}>
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select> <br></br>
                {errors.status && errors.status.message}

            </div>
            <div>
                <select {...register("priority")}>
                    <option value="low">Low</option>    
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select> <br></br>
                {errors.priority && errors.priority.message}

            </div>
            <div>
                <input {...register("dueDate")} type="date" placeholder='Due Date'/> <br></br>
                {errors.dueDate && errors.dueDate.message}

            </div>

            <div>
                <input {...register("update")} type="text" placeholder='Id to update, not required.'/> <br></br>
            </div>


            <button disabled={isSubmitting} type='submit'>Submit</button>

        </form>

        <div>
            <Link to="/todolist">Todo List</Link>
        </div>

    </div>
  )
}

export default TodoForm