import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TodoList = () => {

    
        const selector = useSelector((state) => state.todo);
        
        while(!selector){  }    
        //console.log(Array.isArray(selector.data))
        
    

  return (
    <div>

        <div>
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

                        {selector.data.map((c) => {
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
            
        </div>
    </div>
  )
}

export default TodoList