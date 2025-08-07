import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const SpecialStats = () => {

    const selector = useSelector(state => state.all);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(selector.allTodos);
    }, [selector.allTodos]);

    const statuses = ["pending", "in_progress", "completed", "cancelled"];

    const statusObj = {
        "pending": "Pending",
        "in_progress": "In Progress",
        "completed": "Completed",
        "cancelled" : "Cancelled"
    };

    const statusCounts = (status) => {
        let statusList = data.filter(todo => todo.status == status);
        return statusList.length;
    }

    return (
        <tbody class=" divide-y divide-gray-200 text-center text-gray-900 dark:text-gray-100">
            {statuses.map((status) => {
                return (

                    <tr class="hover:bg-gray-300 dark:hover:bg-gray-500">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-inter ">
                            {statusObj[status]}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-inter ">
                                {statusCounts(status)}
                            
                        </td>

                    </tr>
                )
            })}

        </tbody>
    )

}


export default SpecialStats