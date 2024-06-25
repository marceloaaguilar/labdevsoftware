import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import httpTask from '../lib/httpTask';
import Swal from 'sweetalert2';

export const TodoList = ({task}) => {
    const handleDelete = async () => {
        await httpTask.deleteTask(task.id);
    }

    return(
        <div className="Todo">
            <p className={`${task.completed ? "completed" : "incompleted"}`}>
                {task.description}
            </p>
            <div>
                <FontAwesomeIcon className='delete-icon' onClick={handleDelete} icon={faTrash}/>
            </div>
        </div>
    )
}