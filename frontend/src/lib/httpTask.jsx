import axios from "../axios";

const httpTask = {
    getAll() {
        return axios.get('/getAllTasks');
    },
    deleteTask(id){
        return axios.delete(`/deleteTaskById/${id}`)
    },
    addTask(task){
        return axios.post(`/addTask`, task);
    }
}

export default httpTask