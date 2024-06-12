package com.toDoList.demo.controller;

import com.toDoList.demo.entity.Task;
import com.toDoList.demo.repository.TaskRepository;
import com.toDoList.demo.service.taskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@Controller

public class TaskController {
    @Autowired
    private taskService service;

    @GetMapping("getAllTasks")
    public ResponseEntity<List<Task>> getALlTasks(){
        try{
            List<Task> taskList = service.list();
            return new ResponseEntity<>(taskList, HttpStatus.OK);
        } catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("getTaskById/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        Optional<Task> task = service.getOne(id);

        if(task.isPresent()){
            return new ResponseEntity<>(task.get(),HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping("addTask")
    public List<Task> addTask(@RequestBody Task task){
        List<Task> taskList = service.create(task);
        return taskList;
    }


    @PostMapping("updateTaskById/{id}")
    public ResponseEntity<Task> updateTaskById(@PathVariable Long id, @RequestBody Task newTaskData){
        Task taskUpdate = service.update(id, newTaskData);
        return new ResponseEntity<>(taskUpdate, HttpStatus.OK);

    }
    @DeleteMapping("deleteTaskById/{id}")
    public ResponseEntity<HttpStatus> deleteTaskById(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
