import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import { addCategories, updateCategories } from '../redux/features/categories/AllCategoriesSlice';

const CategoryForm = () => {

    const selector = useSelector(state => state.categories);

    const validationSchema = Yup.object({
        name: Yup.string().min(5, "Name must be 5 character at least")
            .max(200, "Name must be max 100 character"),
    });
    const { register,
        setValue,
        handleSubmit,
        formState: { errors, isSubmitting } //isSubmitting form submit olup gönderilme sürecinde olup olmadığını tutan değer
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (selector.id && selector.id != undefined) {

            console.log("Id algıandı", selector.id);
            const data = selector.data.filter((d) => d.id == selector.id)[0]
            console.log(data)
            setValue("name", data.name)
            setValue("color", data.color)
            setValue("id", data.id)
        }else{
            setValue("name", "")
            setValue("color", "#000000")
            setValue("id", "")
        }
    }, [selector.id])

    const onSubmit = async (data) => {
        console.log(data);
        var category = {
            "name": data.name,
            "color": data.color
        }
        console.log(data.color)

        if (data) {
            if (data.id) {
                console.log(data);
                console.log(category);
                dispatch(updateCategories([category, data.id]))
            } else {
                dispatch(addCategories(category));
            }
        }
    }

    return (
        <div className='h-full bg-gray-50 text-gray-500 dark:bg-gray-900  dark:text-gray-100'>
            <form onSubmit={handleSubmit(onSubmit)} className='m-2 p-4 border-0 rounded-2xl w-96 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-gray-200'>
                <div class="flex justify-center p-2">
                    <input {...register("name")} className='ml-2 w-full bg-transparent border-b border-red focus:outline-none' type="text" placeholder="Category Name" />
                </div>

                <div class="flex justify-start p-2 pl-4  ">
                    <label className=''>Set Color</label>
                    <input {...register("color")} className='ml-2 w-8 bg-transparent border-b border-red ' type="color" id="color" placeholder="Category Color" onChange={(e) => {
                        setValue("color", e.target.value)
                    }} />
                </div>

                <div class="opacity-0 flex justify-center p-2 ">
                    <input {...register("id")} className='opacity-0 ml-2 w-0 h-0 bg-transparent border-b border-red focus:outline-none' type="text" id="id" placeholder="Id not required" />
                </div>

                <div class="mt-2">
                    <button type='submit' className='w-full p-2 text-center bg-indigo-600 text-gray-50 rounded-2xl cursor-pointer'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CategoryForm;