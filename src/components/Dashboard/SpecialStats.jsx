import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { CheckCircle2, Clock, AlertTriangle, XCircle, TrendingUp } from 'lucide-react'

const SpecialStats = () => {

    const selector = useSelector(state => state.all);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(selector.allTodos);
    }, [selector.allTodos]);

    const statuses = ["pending", "in_progress", "completed", "cancelled"];

    const statusObj = {
        "pending": "Beklemede",
        "in_progress": "Devam Ediyor", 
        "completed": "Tamamlandı",
        "cancelled": "İptal Edildi"
    };

    const statusIcons = {
        "pending": <AlertTriangle className="h-5 w-5 text-yellow-500" />,
        "in_progress": <Clock className="h-5 w-5 text-blue-500" />,
        "completed": <CheckCircle2 className="h-5 w-5 text-green-500" />,
        "cancelled": <XCircle className="h-5 w-5 text-red-500" />
    };

    const statusColors = {
        "pending": "border-l-yellow-400 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30",
        "in_progress": "border-l-blue-400 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30",
        "completed": "border-l-green-400 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30",
        "cancelled": "border-l-red-400 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30"
    };

    const statusCounts = (status) => {
        let statusList = data.filter(todo => todo.status == status);
        return statusList.length;
    }

    const getTotalCount = () => {
        return data.length;
    }

    const getPercentage = (count) => {
        const total = getTotalCount();
        return total > 0 ? Math.round((count / total) * 100) : 0;
    }

    return (
        <div className="space-y-4">
            {statuses.map((status, index) => {
                const count = statusCounts(status);
                const percentage = getPercentage(count);
                
                return (
                    <div 
                        key={status}
                        className={`border-l-4 rounded-r-xl p-6 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${statusColors[status]}`}
                        style={{ 
                            animationDelay: `${index * 0.1}s`,
                            animation: 'slideInLeft 0.6s ease-out forwards'
                        }}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-sm">
                                    {statusIcons[status]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                        {statusObj[status]}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Toplam todo'ların {percentage}%'si
                                    </p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                        {count}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        todo
                                    </div>
                                </div>
                                
                                {/* Progress bar */}
                                <div className="w-20 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full transition-all duration-1000 ease-out ${
                                            status === 'pending' ? 'bg-yellow-400' :
                                            status === 'in_progress' ? 'bg-blue-400' :
                                            status === 'completed' ? 'bg-green-400' : 'bg-red-400'
                                        }`}
                                        style={{ 
                                            width: `${percentage}%`,
                                            transitionDelay: `${index * 0.2}s`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Alt bilgi çubuğu */}
                        {count > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600 dark:text-gray-400">
                                        Bu kategoride {count} adet görev bulunuyor
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <TrendingUp className="h-4 w-4 text-gray-400" />
                                        <span className="font-medium text-gray-700 dark:text-gray-300">
                                            %{percentage}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            <style jsx>{`
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
            `}</style>
        </div>
    )
}

export default SpecialStats