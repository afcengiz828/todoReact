import React from 'react'
import { useSelector } from 'react-redux'

const TodoItem = ({idList}) => {
    const selector = useSelector((state) => state.todo);
    console.log(selector.data);
    var elements = [];
    
    for(let i=0;i<idList.length;i++){

        selector.data.forEach(element => {
            
            if(element.id == idList[i]){
                elements.push(element); 
            } 
            console.log(element)
        });
    }
    console.log("elements " + elements);
  return (
    <div> 
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Due Date</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                        </tr>   
                    </thead>
                    <tbody>
                        {elements.map((c) => {
                            return (
                                <tr key={c.id}>
                                    <td>{c.id}</td>
                                    <td>{c.title}</td>
                                    <td>{c.description}</td>
                                    <td>{c.status}</td>
                                    <td>{c.priority}</td>
                                    <td>{c.due_date}</td>
                                    <td>{c.createdAt}</td>
                                    <td>{c.updatedAt}</td>
                                </tr>
                            )
                        })} 
                    </tbody>
                </table>
            </div> 
  )
}

export default TodoItem