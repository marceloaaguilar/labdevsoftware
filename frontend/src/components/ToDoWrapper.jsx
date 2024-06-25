import React, { useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";
import { useState } from "react";
import httpTask from "../lib/httpTask";
import Swal from 'sweetalert2';


export const ToDoWrapper = () => {
    
    const[todos, setTodos] = useState([]);

    const setAllTasks = async () => {
        const response = await httpTask.getAll();
        await setTodos(response.data);
    }

    useEffect(()=> {
        setAllTasks();
    },[])

    const deleteTodo = async (id) => {
        await httpTask.deleteTask(id);
        setAllTasks();
        Swal.fire({title: "Tarefa Excluida", icon: "success"});
    };

    const addTodo = async (task)=> {
        await httpTask.addTask(task);
        await setAllTasks();
        Swal.fire({title: "Tarefa Adicionada com sucesso!", icon: "success"});
    }

    const toggleComplete = id => {
        const newTodos = todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed}: todo);
        setTodos(newTodos);
    }

    const editTodo = (id) => {
        setTodos(
            todos.map((todo)=> 
            todo.id === id ? {... todo, isEditing: !todo.isEditing}: todo)
        )
    }

    return (
        <div className='TodoWrapper'>
            <h1>Lista de Tarefas</h1>
            <TodoForm addTodo={addTodo}/>
                {todos.map((item)=>
                    <TodoList key={item.id} task={item} deleteTodo={deleteTodo} editTodo={editTodo}/>
                 )}
        </div>
    )
}