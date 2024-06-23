import React from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { useState } from "react";
import {v4 as uuidv4} from "uuid";

export const ToDoWrapper = () => {
    const[todos, setTodos] = useState([]);

    const addTodo = (todo)=> {
        setTodos([
            ...todos, {id: uuidv4(), description: todo, completed: false}
        ])
    }
    return (
        <div className='TodoWrapper'>
            <h1>Lista de Tarefas</h1>
            <TodoForm addTodo={addTodo}/>
                {todos.map((item)=>
                    <TodoList key={item.id} task={item}/>
                 )}
        </div>
    )
}