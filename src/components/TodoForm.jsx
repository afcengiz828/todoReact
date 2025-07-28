import { yupResolver } from '@hookform/resolvers/yup';
import { isValid, parse } from 'date-fns';
import React from 'react'
import { useForm } from 'react-hook-form';
import * as Yup from "yup";

const TodoForm = () => {
  
  const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

  const validationSchema = Yup.object({
        title: Yup.string().required("Title is required.")
            .min(5, "Title must be 3 character at least")
            .max(100, "Title must be max 100 character"),
        description : Yup.string().required(false, "").max(500, "Description must be max 500 character"),
        status: Yup.string().required("Status is required."),
        priority: Yup.string(),
        dueDate: Yup.string()
            .matches(dateRegex, "Tarih formatı yyyy-MM-dd şeklinde olmalı")
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

  const onSubmit = (data) => {
    console.log( errors.name && errors.name.message) 
    console.log(data.title);
    console.log(data.status);
  }
  
  return (
    <div>
        <div>TodoForm</div>

        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <input {...register("title")} type="text" placeholder='Title'/>
                {errors.title && errors.title.message}
            </div>
            <div>
                <input {...register("description")} type="text" placeholder='description'/>
                {errors.description && errors.description.message}

            </div>
            <div>
                <select {...register("status")}>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
                {errors.status && errors.status.message}

            </div>
            <div>
                <select {...register("priority")}>
                    <option value="low">Low</option>    
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                {errors.priority && errors.priority.message}

            </div>
            <div>
                <input {...register("dueDate")} type="date" placeholder='Due Date'/>
                {errors.dueDate && errors.dueDate.message}

            </div>

            <button disabled={isSubmitting} type='submit'>Submit</button>

        </form>
    </div>
  )
}

export default TodoForm