import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TodoItem from './TodoItem';

const TodoList = () => {
 
    const selector = useSelector((state) => state.todo);
    var idList = [];
    
    while(!selector){  }    
    
    selector.data.forEach(element => {
        
        idList.push(element.id);
    });

  return (
    <div>
        <TodoItem idList={idList}/>
    </div>
  )
}

export default TodoList