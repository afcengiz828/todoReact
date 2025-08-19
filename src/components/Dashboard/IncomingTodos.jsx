import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { delTodo, updateTodoStatus } from '../../redux/features/todo/TodoSlice';
import { CheckCircle, Circle, AlertTriangle, ChevronUp, ChevronDown, Minus, XCircle, Edit3, Trash2, Calendar, Tag, Flag } from 'lucide-react';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const IncomingTodos = () => {

    const selector = useSelector(state => state.all);
    const todo = useSelector(state => state.todo);

    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const [deleteModal, setDeleteModal] = useState({
        isOpen: false,
        todoId: null,
        todoText: ""
    });

    const openDeleteModal = (id, text) => {
        setDeleteModal({
            isOpen: true,
            todoId: id,
            todoText: text
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({
            isOpen: false,
            todoId: null,
            todoText: ""
        });
    };

    const confirmDelete = (e) => {
        handleDelete(e, deleteModal.todoId);
    };

    const priorityObj = {
        "low": "Düşük",
        "medium": "Orta",
        "high": "Yüksek"
    }

    useEffect(() => {
        getTodosByDate();
    }, [selector.allTodos]);

    const handleDelete = async (e, id) => {
        const response = await dispatch(delTodo(id));
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            'completed': {
                color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200',
                icon: <CheckCircle className="h-3 w-3" />,
                label: 'Tamamlandı'
            },
            'in_progress': {
                color: 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
                icon: <Circle className="h-3 w-3" />,
                label: 'Devam Ediyor'
            },
            'pending': {
                color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
                icon: <AlertTriangle className="h-3 w-3" />,
                label: 'Beklemede'
            },
            'cancelled': {
                color: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200',
                icon: <XCircle className="h-3 w-3" />,
                label: 'İptal Edildi'
            }
        };

        const config = statusConfig[status];
        if (!config) return null;

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.icon}
                {config.label}
            </span>
        );
    };

    const getPriorityBadge = (priority) => {
        const priorityConfig = {
            'high': {
                color: 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200',
                icon: <ChevronUp className="h-4 w-4" />,
                label: 'Yüksek'
            },
            'medium': {
                color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
                icon: <Minus className="h-4 w-4" />,
                label: 'Orta'
            },
            'low': {
                color: 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200',
                icon: <ChevronDown className="h-4 w-4" />,
                label: 'Düşük'
            }
        };

        const config = priorityConfig[priority];
        if (!config) return null;

        return (
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.icon}
                {config.label}
            </span>
        );
    };

    const handleStatus = async (e, id) => {
        const idObj = { "id": id }
        const dataObj = { "status": e.target.value }
        const data = { idObj, dataObj }
        const response = await dispatch(updateTodoStatus(data));
    }

    const getTodosByDate = () => {
        const today = new Date();
        const date = new Date();
        date.setDate(today.getDate() + 30);

        const todos = selector.allTodos.filter(todo => {
            let due_date = new Date(todo.due_date);
            return due_date < date && due_date > today;
        });

        setData(todos);
        return todos;
    }

    if (todo.loading) {
        return (
            <div className='flex items-center justify-center p-8'>
                <div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-6 text-center shadow-lg'>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                    <p className='font-bold text-xl'>Veriler yükleniyor...</p>
                </div>
            </div>
        )
    }

    if (todo.error) {
        return (
            <div className='flex items-center justify-center p-8'>
                <div className='bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-2xl p-6 text-center shadow-lg'>
                    <XCircle className="h-12 w-12 mx-auto mb-4" />
                    <h1 className='font-bold text-2xl mb-2'>Bir Hata Oluştu</h1>
                    <p className='text-red-100'>{todo.error}</p>
                </div>
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className='flex items-center justify-center p-8'>
                <div className='bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-8 text-center shadow-lg max-w-md'>
                    <Calendar className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <h2 className='font-bold text-2xl mb-2'>Harika! 🎉</h2>
                    <p className='text-emerald-100'>Önümüzdeki 30 gün içerisinde yaklaşan todo'nuz bulunmuyor.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Desktop Table View */}
            <div className="hidden lg:block">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-4 w-4" />
                                            Kategori
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Başlık
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Açıklama
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        Durum
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <Flag className="h-4 w-4" />
                                            Öncelik
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4" />
                                            Bitiş Tarihi
                                        </div>
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                                        İşlemler
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                                {data.map((todo, index) => (
                                    <tr
                                        key={todo.id}
                                        className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            animation: 'fadeInUp 0.6s ease-out forwards'
                                        }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-3 h-3 rounded-full"
                                                    style={{ backgroundColor: todo.categories.color }}
                                                ></div>
                                                <span
                                                    className="text-sm font-medium"
                                                    style={{ color: todo.categories.color }}
                                                >
                                                    {todo.categories.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-gray-100 max-w-xs truncate">
                                                {todo.title}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                                                {todo.description}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                value={todo.status}
                                                onChange={(e) => handleStatus(e, todo.id)}
                                                className="text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                            >
                                                <option value="pending">Beklemede</option>
                                                <option value="in_progress">Devam Ediyor</option>
                                                <option value="completed">Tamamlandı</option>
                                                <option value="cancelled">İptal Edildi</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getPriorityBadge(todo.priority)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                                <Calendar className="h-4 w-4" />
                                                {todo.due_date ? todo.due_date.split("T")[0] : "Belirtilmemiş"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <Link to={`../tododetail/${todo.id}`}>
                                                    <button className="inline-flex items-center gap-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105">
                                                        <Edit3 className="h-3 w-3" />
                                                        Düzenle
                                                    </button>
                                                </Link>
                                                <button
                                                    onClick={() => openDeleteModal(todo.id, todo.title)}
                                                    className="inline-flex items-center gap-1 px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-xs font-medium rounded-lg transition-all duration-200 hover:scale-105"
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                    Sil
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {data.map((todo, index) => (
                    <div
                        key={todo.id}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
                        style={{
                            animationDelay: `${index * 0.1}s`,
                            animation: 'slideInUp 0.6s ease-out forwards'
                        }}
                    >
                        {/* Card Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-4 h-4 rounded-full"
                                    style={{ backgroundColor: todo.categories.color }}
                                ></div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {todo.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {todo.categories.name}
                                    </p>
                                </div>
                            </div>
                            {getPriorityBadge(todo.priority)}
                        </div>

                        {/* Description */}
                        {todo.description && (
                            <div className="mb-4">
                                <p className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                                    {todo.description}
                                </p>
                            </div>
                        )}

                        {/* Status and Date */}
                        <div className="flex items-center justify-between mb-4">
                            <div className="space-y-2">
                                <div className="text-xs text-gray-500 dark:text-gray-400">Durum</div>
                                <select
                                    value={todo.status}
                                    onChange={(e) => handleStatus(e, todo.id)}
                                    className="text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                >
                                    <option value="pending">Beklemede</option>
                                    <option value="in_progress">Devam Ediyor</option>
                                    <option value="completed">Tamamlandı</option>
                                    <option value="cancelled">İptal Edildi</option>
                                </select>
                            </div>

                            <div className="text-right">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">Bitiş Tarihi</div>
                                <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300">
                                    <Calendar className="h-4 w-4" />
                                    {todo.due_date ? todo.due_date.split("T")[0] : "Belirtilmemiş"}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
                            <Link to={`../tododetail/${todo.id}`} className="flex-1">
                                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105">
                                    <Edit3 className="h-4 w-4" />
                                    Düzenle
                                </button>
                            </Link>
                            <button
                                onClick={() => openDeleteModal(todo.id, todo.title)}
                                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105"
                            >
                                <Trash2 className="h-4 w-4" />
                                Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
                itemName={deleteModal.todoText}
                title="Todo Sil"
            />

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>)
}

export default IncomingTodos;