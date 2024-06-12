package com.toDoList.demo.service;

import com.toDoList.demo.entity.Task;
import com.toDoList.demo.repository.TaskRepository;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class taskService {
    private TaskRepository repository;

    public taskService(TaskRepository repository){
        this.repository = repository;
    }

    public List<Task> create(Task task){
        repository.save(task);
        return list();
    }

    public List<Task> list(){
        java.util.List<Task> taskList = new ArrayList<>();
        repository.findAll().forEach(taskList::add);
        return taskList;
    }

    public Task update(Long id, Task task){
        Optional<Task> oldTask = repository.findById(id);

        if (oldTask.isPresent()){
            Task updatedTask = oldTask.get();
            updatedTask.setTitle(task.getTitle());
            updatedTask.setDescription(task.getDescription());
            updatedTask.setTaskCompleted(task.getTaskCompleted());
            Task taskObj = repository.save(updatedTask);
            return task;
        }

        return task;


    }

    public boolean delete(Long id){
        repository.deleteById(id);
        return true;
    }

    public Optional<Task> getOne(Long id){
        Optional<Task> task = repository.findById(id);
        if(task.isPresent()){
            return task;
        }

        return task;

    }
}
