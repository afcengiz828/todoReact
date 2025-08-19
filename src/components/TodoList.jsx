import React, { useEffect, useRef, useState } from 'react'
import { Trash2, Edit3, Calendar, Flag, User, FileText, CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { delTodo, updateTodoStatus } from '../redux/features/todo/TodoSlice'; // updateTodoStatus import'u eksikti
import { Link } from 'react-router-dom';

const TodoList = () => {
    // Redux selectors - mock data yerine gerçek selector'ları kullan
    const filterSelector = useSelector(state => state.filter); // selector yerine filterSelector
    const todoSelector = useSelector(state => state.todo)
    const allSelector = useSelector(state => state.all)
    const categorySelector = useSelector(state => state.categories);

    const dispatch = useDispatch();
    const prevRef = useRef(null);
    const nextRef = useRef(null);

    const [list, setList] = useState([]);
    const [currentTodos, setCurrentTodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage, setTodosPerPage] = useState(10);

    const lastTodoIndex = currentPage * todosPerPage;
    const firstTodoIndex = lastTodoIndex - todosPerPage;

    const priorityObj = {
        "low": "Low",
        "medium": "Medium",
        "high": "High"
    }

    const priorityColors = {
        "low": "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
        "medium": "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30",
        "high": "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
    }

    const statusIcons = {
        "pending": <Clock className="w-4 h-4" />,
        "in_progress": <AlertCircle className="w-4 h-4" />,
        "completed": <CheckCircle2 className="w-4 h-4" />,
        "cancelled": <XCircle className="w-4 h-4" />
    }

    const statusColors = {
        "pending": "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-700",
        "in_progress": "text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30",
        "completed": "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30",
        "cancelled": "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30"
    }

    // Toplam sayfa sayısını hesapla - doğru selector kullan
    const totalPages = Math.ceil((filterSelector.filterStatus ? filterSelector.filteredTodos.length : allSelector.dataCount) / todosPerPage);

    // Mevcut sayfanın geçerli olup olmadığını kontrol et ve gerekirse düzelt
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) {
            setCurrentPage(totalPages);
        } else if (totalPages === 0 && currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [totalPages, currentPage]);

    useEffect(() => {
        // filterSelector kullan, filter kontrolü düzelt
        if (filterSelector.filterStatus && filterSelector.filteredTodos && filterSelector.filteredTodos.length > 0) {
            setCurrentTodos(filterSelector.filteredTodos.slice(firstTodoIndex, lastTodoIndex));
        } else {
            // Normal durumda allTodos'dan al
            setCurrentTodos(allSelector.allTodos?.slice(firstTodoIndex, lastTodoIndex) || []);
        }
    }, [filterSelector.filteredTodos, filterSelector.filterStatus, currentPage, firstTodoIndex, lastTodoIndex, allSelector.allTodos, categorySelector.data]);

    useEffect(() => {
        if (list.length > 0) {
            setCurrentTodos(list.slice(firstTodoIndex, lastTodoIndex));
        }
    }, [list, currentPage, firstTodoIndex, lastTodoIndex]);

    // Prev/Next butonlarının durumunu kontrol et
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages || totalPages === 0;

    useEffect(() => {
        // Prev butonunu güncelle
        if (prevRef.current) {
            if (isPrevDisabled) {
                prevRef.current.classList.add("disabled");
            } else {
                prevRef.current.classList.remove("disabled");
            }
        }

        // Next butonunu güncelle
        if (nextRef.current) {
            if (isNextDisabled) {
                nextRef.current.classList.add("disabled");
            } else {
                nextRef.current.classList.remove("disabled");
            }
        }
    }, [currentPage, isPrevDisabled, isNextDisabled, totalPages]);

    const handlePrevious = () => {
        if (!isPrevDisabled) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const handleNext = () => {
        if (!isNextDisabled) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handleDelete = async (e, id) => {
        const response = await dispatch(delTodo(id));
        console.log(response.payload.data);

        // Silme sonrası sayfa kontrolü - doğru selector kullan
        const newTotalItems = (filterSelector.filterStatus ? filterSelector.filteredTodos.length : allSelector.dataCount) - 1;
        const newTotalPages = Math.ceil(newTotalItems / todosPerPage);

        if (currentPage > newTotalPages && newTotalPages > 0) {
            setCurrentPage(newTotalPages);
        }
    }

    const handleStatus = async (e, id) => {
        console.log(e.target.value);
        const idObj = {
            "id": id
        }
        const dataObj = {
            "status": e.target.value,
        }
        const data = {
            idObj,
            dataObj
        }
        console.log(data)
        const response = await dispatch(updateTodoStatus(data));
        console.log(response);
    }

    if (todoSelector.loading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
                <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700'>
                    <div className='flex flex-col items-center space-y-6'>
                        <div className='relative'>
                            <div className='w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin'></div>
                            <div className='absolute inset-0 flex items-center justify-center'>
                                <FileText className='w-6 h-6 text-blue-600 dark:text-blue-400' />
                            </div>
                        </div>
                        <div className='text-center'>
                            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                                Veriler Yükleniyor
                            </h3>
                            <p className='text-gray-600 dark:text-gray-400'>
                                Todo listesi hazırlanıyor...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (currentTodos.length == 0 && totalPages === 0) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
                <div className='bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-200 dark:border-gray-700'>
                    <div className='flex flex-col items-center space-y-6'>
                        <div className='w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 rounded-full flex items-center justify-center'>
                            <FileText className='w-10 h-10 text-red-600 dark:text-red-400' />
                        </div>
                        <div className='text-center'>
                            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                                Henüz Todo Yok
                            </h3>
                            <p className='text-gray-600 dark:text-gray-400 mb-4'>
                                İlk todo'nuzu ekleyerek başlayın!
                            </p>
                            <Link to="/addtodos">
                                <button className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg'>
                                    <FileText className='w-5 h-5 mr-2' />
                                    Todo Ekle
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold  dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Todo Listesi
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Görevlerinizi yönetin ve takip edin
                    </p>
                </div>

                {/* Todo Cards - Mobile First Design */}
                <div className="grid gap-6 md:hidden">
                    {currentTodos.map((todo) => (
                        <div key={todo.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="p-6">
                                {/* Category Badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <span
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                                        style={{
                                            color: todo.categories?.color || '#6B7280',
                                            backgroundColor: `${todo.categories?.color || '#6B7280'}20`
                                        }}
                                    >
                                        <User className="w-4 h-4 mr-1" />
                                        {todo.categories?.name || 'Kategori'}
                                    </span>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${priorityColors[todo.priority] || priorityColors.low}`}>
                                        <Flag className="w-3 h-3 mr-1" />
                                        {priorityObj[todo.priority]}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    {todo.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                    {todo.description}
                                </p>

                                {/* Status */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Durum
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={todo.status}
                                            onChange={(e) => handleStatus(e, todo.id)}
                                            className={`w-full appearance-none rounded-xl border-0 px-4 py-3 pr-10 text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-500 cursor-pointer ${statusColors[todo.status] || statusColors.pending}`}
                                        >
                                            <option value="pending">Beklemede</option>
                                            <option value="in_progress">Devam Ediyor</option>
                                            <option value="completed">Tamamlandı</option>
                                            <option value="cancelled">İptal Edildi</option>
                                        </select>
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                            {statusIcons[todo.status] || statusIcons.pending}
                                        </div>
                                    </div>
                                </div>

                                {/* Due Date */}
                                {todo.due_date && (
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        <Calendar className="w-4 h-4 mr-2" />
                                        Bitiş Tarihi: {todo.due_date.split("T")[0]}
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex space-x-3">
                                    <button
                                        onClick={(e) => handleDelete(e, todo.id)}
                                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Sil
                                    </button>
                                    <Link to={`/addtodos/${todo.id}`} className="flex-1">
                                        <div className="w-full inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                                            <Edit3 className="w-4 h-4 mr-2" />
                                            Düzenle
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                                <tr>
                                    <th className='px-6 py-4 text-left font-semibold'>
                                        <div className="flex items-center">
                                            <User className="w-4 h-4 mr-2" />
                                            Kategori
                                        </div>
                                    </th>
                                    <th className='px-6 py-4 text-left font-semibold'>
                                        <div className="flex items-center">
                                            <FileText className="w-4 h-4 mr-2" />
                                            Başlık
                                        </div>
                                    </th>
                                    <th className='px-6 py-4 text-left font-semibold'>Açıklama</th>
                                    <th className='px-6 py-4 text-left font-semibold'>Durum</th>
                                    <th className='px-6 py-4 text-left font-semibold'>
                                        <div className="flex items-center">
                                            <Flag className="w-4 h-4 mr-2" />
                                            Öncelik
                                        </div>
                                    </th>
                                    <th className='px-6 py-4 text-left font-semibold'>
                                        <div className="flex items-center">
                                            <Calendar className="w-4 h-4 mr-2" />
                                            Bitiş Tarihi
                                        </div>
                                    </th>
                                    <th className='px-6 py-4 text-center font-semibold'>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {currentTodos.map((todo, index) => (
                                    <tr key={todo.id} className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all duration-200 ${index % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}`}>
                                        <td className='px-6 py-4'>
                                            <span
                                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                                                style={{
                                                    color: todo.categories?.color || '#6B7280',
                                                    backgroundColor: `${todo.categories?.color || '#6B7280'}20`
                                                }}
                                            >
                                                <div
                                                    className="w-2 h-2 rounded-full mr-2"
                                                    style={{ backgroundColor: todo.categories?.color || '#6B7280' }}
                                                ></div>
                                                {todo.categories?.name || 'Kategori'} 
                                            </span>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {todo.title}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className="text-gray-600 dark:text-gray-300 max-w-xs truncate">
                                                {todo.description}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className="relative">
                                                <select
                                                    value={todo.status}
                                                    onChange={(e) => handleStatus(e, todo.id)}
                                                    className={`appearance-none rounded-lg border-0 px-3 py-2 pr-8 text-sm font-medium transition-all duration-200 focus:ring-2 focus:ring-blue-500 cursor-pointer ${statusColors[todo.status] || statusColors.pending}`}
                                                >
                                                    <option value="pending">Beklemede</option>
                                                    <option value="in_progress">Devam Ediyor</option>
                                                    <option value="completed">Tamamlandı</option>
                                                    <option value="cancelled">İptal Edildi</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                    {statusIcons[todo.status] || statusIcons.pending}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <span className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${priorityColors[todo.priority] || priorityColors.low}`}>
                                                <Flag className="w-3 h-3 mr-1" />
                                                {priorityObj[todo.priority]}
                                            </span>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className="text-gray-600 dark:text-gray-300 text-sm font-bold">
                                                {todo.due_date ? todo.due_date.split("T")[0] : "-"}
                                            </div>
                                        </td>
                                        <td className='px-6 py-4'>
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={(e) => handleDelete(e, todo.id)}
                                                    className="p-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-110 transition-all duration-200 shadow-lg"
                                                    title="Sil"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                                <Link to={`/addtodos/${todo.id}`}>
                                                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-110 transition-all duration-200 shadow-lg">
                                                        <Edit3 className="w-4 h-4" />
                                                    </div>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className='flex justify-center mt-8'>
                    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-2'>
                        <div className='flex items-center space-x-1'>
                            <button
                                ref={prevRef}
                                onClick={handlePrevious}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${isPrevDisabled
                                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                        : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transform hover:scale-105'
                                    }`}
                                disabled={isPrevDisabled}
                            >
                                ← Önceki
                            </button>

                            <div className='px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg'>
                                {currentPage} / {totalPages || 1}
                            </div>

                            <button
                                ref={nextRef}
                                onClick={handleNext}
                                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${isNextDisabled
                                        ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                                        : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transform hover:scale-105'
                                    }`}
                                disabled={isNextDisabled}
                            >
                                Sonraki →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Toplam Todo</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {filterSelector.filterStatus ? filterSelector.filteredTodos.length : allSelector.dataCount}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Mevcut Sayfa</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{currentPage}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                        <div className="flex items-center">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                                <Flag className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Toplam Sayfa</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalPages || 1}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .disabled {
                    pointer-events: none;
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default TodoList