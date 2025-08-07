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
        <tbody class=" divide-y divide-gray-200 text-center">
            {statuses.map((status) => {
                return (

                    <tr class="hover:bg-gray-200">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-inter text-gray-900">
                            {statusObj[status]}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-inter text-gray-900">
                                {statusCounts(status)}
                            
                        </td>

                    </tr>
                )
            })}

        </tbody>
    )

}


export default SpecialStats