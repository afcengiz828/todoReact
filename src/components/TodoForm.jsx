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
import { Plus, Edit3, Calendar, Flag, User, FileText, CheckCircle, Clock, AlertCircle, XCircle, ArrowLeft, Save } from 'lucide-react';

const TodoForm = ({ }) => {

    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

    const validationSchema = Yup.object({
        title: Yup.string().min(5, "Title must be 5 character at least")
            .max(200, "Title must be max 200 character"),
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
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const dispatch = useDispatch();
    var selector = useSelector(state => state.filter);
    var categorySelector = useSelector(state => state.categories);

    const { id } = useParams();
    const navigate = useNavigate();
    const [todos, setTodos] = useState([]);
    const [addStatus, setAddStatus] = useState(false);
    const [updateStatus, setUpdateStatus] = useState(false);
    const [color, setColor] = useState("#ffffff");

    // Watch selected category for color preview
    const selectedCategory = watch("categories");

    useEffect(() => {
        if (selector.filteredTodos.length > 0) {
            setTodos(selector.filteredTodos);
        }

        setValue("title", "");
        setValue("description", "");
        setValue("status", "");
        setValue("priority", "");
        setValue("due_date", "");

    }, [selector.filteredTodos])

    useEffect(() => {
        if (id) {
            setValue("id", id);
            handelChangeUpdate(id);
        }
    }, [id, todos]);

    useEffect(() => {
        if (selectedCategory) {
            const category = categorySelector.data.find(c => c.name.toLowerCase() === selectedCategory.toLowerCase());
            if (category) {
                setColor(category.color);
            }
        }
    }, [selectedCategory, categorySelector.data]);

    const handelChangeUpdate = (id) => {
        setValue("title", "");
        setValue("description", "");
        setValue("status", "");
        setValue("priority", "");
        setValue("due_date", "");
        if (todos) {
            todos.forEach(todo => {
                if (todo.id == Number(id) && id.trim()) {
                    console.log(todo)
                    setValue("title", todo.title);
                    setValue("description", todo.description ? todo.description : "");
                    setValue("status", todo.status);
                    setValue("priority", todo.priority);
                    setValue("due_date", todo.due_date ? todo.due_date.split("T")[0] : "");
                    setValue("categories", todo.categories.name.toLowerCase())
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
        if (data.status == "" || data.status == "status"){
            data.status = "pending"; // Default status
        }
        if (data.priority == "" || data.priority == "priority"){
            data.priority = "medium"; // Default priority
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

        if (data.due_date) {
            data.due_date = data.due_date ? new Date(data.due_date) : data.due_date;
            data.due_date = data.due_date ? format(data.due_date, "yyyy-MM-dd") : data.due_date;
        }

        if (!data.id) {
            try {
                const response = await dispatch(addTodo(data));
                console.log(response.payload);
                if (response.payload != undefined && response.payload.status == "success") {
                    setAddStatus(true);
                    dispatch(addFiltered(response.payload));
                    // Auto hide success message
                    setTimeout(() => {
                        setAddStatus(false);
                        navigate('/'); // Redirect to list after success
                    }, 2000);
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
                    // Auto hide success message
                    setTimeout(() => {
                        setUpdateStatus(false);
                        navigate('/'); // Redirect to list after success
                    }, 2000);
                }
            }
            catch (e) {
                console.log(e)
            }
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Link to="/">
                            <button className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </button>
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold  dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {id ? 'Todo Düzenle' : 'Yeni Todo Ekle'}
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400">
                                {id ? 'Mevcut todo\'yu güncelleyin' : 'Yeni bir görev oluşturun'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            
                            {/* Category Selection */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                    <User className="w-4 h-4 mr-2" />
                                    Kategori Seçin
                                </label>
                                <div className="flex items-center gap-4">
                                    <div className="flex-1">
                                        <select 
                                            {...register("categories")} 
                                            className="w-full px-4 py-3 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer"
                                            onChange={(e) => {
                                                const catName = e.target.value;
                                                const category = categorySelector.data.find(c => c.name.toLowerCase() === catName.toLowerCase());
                                                if (category) {
                                                    setColor(category.color);
                                                }
                                            }}
                                        >
                                            <option value="">Kategori Seçin</option>
                                            {categorySelector.data.map((c, index) => (
                                                <option key={index} value={c.name.toLowerCase()}>
                                                    {c.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    {/* Color Preview */}
                                    <div 
                                        className="w-12 h-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 shadow-inner transition-all duration-300"
                                        style={{ backgroundColor: color }}
                                        title="Kategori Rengi"
                                    ></div>
                                </div>
                                {errors.categories && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.categories.message}
                                    </p>
                                )}
                            </div>

                            {/* Title Input */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Başlık
                                </label>
                                <input 
                                    {...register("title")} 
                                    type="text" 
                                    placeholder="Todo başlığını girin..."
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                />
                                {errors.title && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.title.message}
                                    </p>
                                )}
                            </div>

                            {/* Description Textarea */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <FileText className="w-4 h-4 mr-2" />
                                    Açıklama
                                </label>
                                <textarea 
                                    {...register("description")} 
                                    placeholder="Todo açıklamasını girin..."
                                    rows="4"
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-600 resize-none"
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            {/* Status and Priority Row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Status */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <Clock className="w-4 h-4 mr-2" />
                                        Durum
                                    </label>
                                    <div className="relative">
                                        <select 
                                            {...register("status")} 
                                            className="w-full appearance-none px-4 py-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer pr-10"
                                        >
                                            <option value="">Durum Seçin</option>
                                            <option value="pending">⏳ Beklemede</option>
                                            <option value="in_progress">🚀 Devam Ediyor</option>
                                            <option value="completed">✅ Tamamlandı</option>
                                            <option value="cancelled">❌ İptal Edildi</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <CheckCircle className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                    {errors.status && (
                                        <p className="text-red-500 text-sm flex items-center mt-1">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.status.message}
                                        </p>
                                    )}
                                </div>

                                {/* Priority */}
                                <div className="space-y-2">
                                    <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                        <Flag className="w-4 h-4 mr-2" />
                                        Öncelik
                                    </label>
                                    <div className="relative">
                                        <select 
                                            {...register("priority")} 
                                            className="w-full appearance-none px-4 py-3 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer pr-10"
                                        >
                                            <option value="">Öncelik Seçin</option>
                                            <option value="low">🟢 Düşük</option>
                                            <option value="medium">🟡 Orta</option>
                                            <option value="high">🔴 Yüksek</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            <Flag className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </div>
                                    {errors.priority && (
                                        <p className="text-red-500 text-sm flex items-center mt-1">
                                            <AlertCircle className="w-4 h-4 mr-1" />
                                            {errors.priority.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Due Date */}
                            <div className="space-y-2">
                                <label className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    Bitiş Tarihi
                                </label>
                                <div className="relative">
                                    <input 
                                        {...register("due_date")} 
                                        type="date"
                                        className="w-full px-4 py-3 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md cursor-pointer"
                                    />
                                </div>
                                {errors.due_date && (
                                    <p className="text-red-500 text-sm flex items-center mt-1">
                                        <AlertCircle className="w-4 h-4 mr-1" />
                                        {errors.due_date.message}
                                    </p>
                                )}
                            </div>

                            {/* Hidden ID Field */}
                            <input {...register("id")} type="hidden" />

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button 
                                    disabled={isSubmitting} 
                                    type="submit" 
                                    className={`w-full py-4 px-6 rounded-xl font-semibold text-white shadow-lg transform transition-all duration-200 flex items-center justify-center space-x-2 ${
                                        isSubmitting 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span>İşleniyor...</span>
                                        </>
                                    ) : (
                                        <>
                                            {id ? <Save className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                                            <span>{id ? 'Güncelle' : 'Todo Ekle'}</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Success Messages */}
                {(addStatus || updateStatus) && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 max-w-md w-full mx-4 transform animate-pulse">
                            <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                                </div>
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {addStatus ? 'Başarılı!' : 'Güncellendi!'}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {addStatus ? 'Todo başarıyla eklendi' : 'Todo başarıyla güncellendi'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Form Tips */}
                <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
                    <h3 className="flex items-center text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        <FileText className="w-5 h-5 mr-2" />
                        Form İpuçları
                    </h3>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Başlık en az 5 karakter olmalıdır
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Bitiş tarihi bugünden sonra olmalıdır
                        </li>
                        <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Kategori seçimi zorunludur
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TodoForm