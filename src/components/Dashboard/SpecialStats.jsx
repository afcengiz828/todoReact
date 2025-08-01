import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const SpecialStats = () => {

    const selector = useSelector(state => state.todo);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(selector.data);
    }, [selector.data]);
    
    const statuses = ["pending", "in_progress", "completed", "cancelled"];

    const statusCounts = (status) => {
        let statusList = data.filter(todo => todo.status == status);
        return statusList.length;
    }

    return (
        <tbody>
            {statuses.map((status) => {
                return (

                    <tr>
                    <td>
                        {status}
                    </td>
                    <td>
                        <center>
                            {statusCounts(status)}
                        </center>
                    </td>

                </tr>
                )
            })}

        </tbody>
    )

}


export default SpecialStats