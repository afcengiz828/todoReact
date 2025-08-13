import { yupResolver } from '@hookform/resolvers/yup';
import { isValid, parse } from 'date-fns';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { Link, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addTodo, getAllTodo, updateTodo } from '../redux/features/todo/TodoSlice';
import { addFiltered, updateFiltered } from '../redux/features/todo/FilteredSlice';
import { format } from 'date-fns';

const TodoForm = ({ }) => {

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;


    const validationSchema = Yup.object({
        title: Yup.string().min(5, "Title must be 3 character at least")
            .max(200, "Title must be max 100 character"),
        description: Yup.string().max(500, "Description must be max 500 character"),
        status: Yup.string().required("Status is required."),
        priority: Yup.string(),
        due_date: Yup.string()
            .test("date-format", "Please enter date in the valid format", (value) => {
                if (!value || value.trim() === '') return true;
                return dateRegex.test(value);
            })
            .test("valid-date", "Please enter a valid date", (value) => {
                if (value) {
                    const date = parse(value, "yyyy-MM-dd", new Date());
                    return isValid(date);
                }
                return true;
            })
            .test("upper-today", "Please enter a future day.", (value) => {
                if (value) {
                    const date = parse(value, "yyyy-MM-dd", new Date());
                    const today = new Date();
                    return date > today;
                }
                return true
            })
    });

    const { register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting } //isSubmitting form submit olup gönderilme sürecinde olup olmadığını tutan değer
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const dispatch = useDispatch();
    var selector = useSelector(state => state.filter);
    var categorySelector = useSelector(state => state.categories);

    const { idTodo } = useParams();
    const [todos, setTodos] = useState([]);
    const [addStatus, setAddStatus] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);

    useEffect(() => {
        if (selector.filteredTodos.length > 0) {
            setTodos(selector.filteredTodos);
        }

        setValue("title", "");
        setValue("description", "");
        setValue("status", "status");
        setValue("priority", "priority");
        setValue("due_date", "");

    }, [selector.filteredTodos])

    useEffect(() => {
        if (idTodo) {
            setValue("id", idTodo);
            handelChangeUpdate(idTodo);
        }
    }, [idTodo, todos])



    const handelChangeUpdate = (id) => {
        var formvals = null;
        setValue("title", "");
        setValue("description", "");
        setValue("status", "status");
        setValue("priority", "priority");
        setValue("due_date", "");
        if (todos) {
            todos.forEach(todo => {
                if (todo.id == Number(id) && id.trim()) {
                    setValue("title", todo.title);
                    setValue("description", todo.description ? todo.description : "");
                    setValue("status", todo.status);
                    setValue("priority", todo.priority);
                    setValue("due_date", todo.due_date ? todo.due_date.split("T")[0] : "");

                }
            });
        }

    };

    const getCategory = (c) => {
        console.log(categorySelector.data);
        console.log(c)
        const category = categorySelector.data.filter(cat => cat.name.toLowerCase() == c.toLowerCase())
        console.log(category)
        return category[0];
    }

    const onSubmit = async (data) => {

        if (data.status == "status"){
            data.status = "";
        }
        if (data.priority == "priority"){
            data.priority = "";
        }

        console.log(data);
        const c = getCategory(data.categories);
        
        const category = {
            "name" : c.name,
            "color" : c.color
        }
        const categoryId = c.id;
        data.categories = category;
        data.categories_id = categoryId;

        if (data) {

            data.due_date = data.due_date ? new Date(data.due_date) : data.due_date;
            data.due_date = data.due_date ? format(data.due_date, "yyyy-MM-dd") : data.due_date;
        }

        if (!data.id) {
            try {
                // console.log(data)
                const response = await dispatch(addTodo(data));
                console.log(response.payload);
                if (response.payload != undefined && response.payload.status == "success") {
                    setAddStatus(true);
                    dispatch(addFiltered(response.payload));
                }

            }
            catch (e) {
                console.log(e)
            }
        }
        else {

            try {
                data.id = Number(data.id);
            } catch (e) {
                console.log(e);
            }


            try {
                const response = await dispatch(updateTodo(data));
                console.log(response.payload.data)
                if (response.payload.data !== undefined && response.payload.data.status == "succes") {
                    console.log("updated");
                    setUpdateStatus(true);
                    dispatch(updateFiltered(response.payload.data.data));
                }

            }
            catch (e) {
                console.log(e)
            }
        }


    }

    return (
        <div class="w-full flex-col" >
            <div className='flex justify-center'>

                <form onSubmit={handleSubmit(onSubmit)} className='mt-2 p-4 rounded-2xl  bg-gray-100 dark:bg-gray-600 w-lg text-gray-900 dark:text-gray-200'>

                    <div className='flex justify-center'>
                        <label className='mr-4'>Select Category:</label>
                        <select {...register("categories")} className='text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-600'>
                            <option value="">Category</option>
                            {
                                categorySelector.data.map((c) => {
                                    return (
                                        <option style={{backgroundColor:c.color}} value={c.name.toLowerCase()}>{c.name}</option>
                                    )
                                })
                             }
                        </select> <br />
                        <div className='text-red-600 font-bold'>
                            {errors.category && errors.category.message}
                        </div>
                    </div>
                    <div className='m-2'>
                        <input {...register("title")} type="text" placeholder='Title' className='w-full bg-transparent border-b border-red focus:outline-none' /> <br></br>
                        <div className='text-red-600 font-bold'>
                            {errors.title && errors.title.message}
                        </div>
                    </div>
                    <div className='m-2'>
                        <textarea {...register("description")} type="text" placeholder='Description' className='w-full h-32 bg-transparent border-b border-red focus:outline-none' /> <br />
                        <div className='text-red-600 font-bold'>
                            {errors.description && errors.description.message}
                        </div>

                    </div>
                    <div className='flex justify-around'>
                        <select {...register("status")} className='text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-600'>
                            <option value="status">Status</option>
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select> <br />
                        <div className='text-red-600 font-bold'>
                            {errors.status && errors.status.message}
                        </div>

                        <select {...register("priority")} className='text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-600'>
                            <option value="priority">Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select> <br />
                        <div className='text-red-600 font-bold'>
                            {errors.priority && errors.priority.message}
                        </div>

                    </div>
                    <div className='m-2 flex justify-center '>

                        <input {...register("due_date")} type="date" placeholder='Due Date' className='' /> <br />
                        <div className='text-red-600 font-bold'>
                            {errors.due_date && errors.due_date.message}
                        </div>

                    </div>

                    <div className='m-2'>
                        <input {...register("id")} onChange={(e) => {
                            handelChangeUpdate(e.target.value);
                        }} type="text" placeholder='Id to update, not required.' className='bg-transparent border-b border-red focus:outline-none w-full' /> <br />
                    </div>


                    <button disabled={isSubmitting} type='submit' className='w-full p-2 text-center bg-indigo-600 text-gray-50 rounded-2xl cursor-pointer'>Submit</button>

                </form>
            </div>

            <div className='flex w-full justify-center'>

                {addStatus &&
                    <div className='bg-gray-200 text-blue-800 text-2xl text-center  border-0 rounded-xl mt-4 p-4'>
                        <p>
                            Veri Başarıyla Eklendi
                        </p>

                    </div>
                }

                {updateStatus &&
                    <div className='bg-gray-200 text-blue-800 text-sm md:text-2xl text-center  border-0 rounded-xl mt-4 p-4'>
                        <p >
                            Veri Başarıyla Güncellendi
                        </p>

                    </div>
                }

                <div className='opacity-0'>

                    {setTimeout(() => {
                        setAddStatus(false)
                        setUpdateStatus(false)
                    }, 3000)}
                </div>

            </div>



        </div>
    )
}

export default TodoForm


