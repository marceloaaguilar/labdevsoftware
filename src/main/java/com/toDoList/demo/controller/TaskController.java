package com.toDoList.demo.controller;

import com.toDoList.demo.model.Task;
import com.toDoList.demo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class TaskController {
    @Autowired
    private TaskRepository taskRepo;

    @GetMapping("/getAllTasks")
    public ResponseEntity<List<Task>> getALlTasks(){
        try{
            List<Task> taskList = new ArrayList<>();
            taskRepo.findAll().forEach(taskList::add);

            if (taskList.isEmpty()){
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);

            }

            return new ResponseEntity<>(taskList, HttpStatus.OK);
        } catch (Exception ex){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }



    }


    @GetMapping("/getTaskById/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable Long id){
        Optional<Task> taskData = taskRepo.findById(id);

        if(taskData.isPresent()){
            return new ResponseEntity<>(taskData.get(),HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }


    @PostMapping("/addTask")
    public ResponseEntity<Task> addTask(@RequestBody Task task){
        Task taskObj = taskRepo.save(task);

        return new ResponseEntity<>(taskObj,HttpStatus.OK);
    }


    @PostMapping("/updateTaskById/{id}")
    public ResponseEntity<Task> updateTaskById(@PathVariable Long id, @RequestBody Task newTaskData){
        Optional<Task> oldTask = taskRepo.findById(id);

        if (oldTask.isPresent()){
            Task updatedTask = oldTask.get();
            updatedTask.setTitle(newTaskData.getTitle());
            updatedTask.setDescription(newTaskData.getDescription());
            updatedTask.setTaskCompleted(newTaskData.getTaskCompleted());
            Task taskObj = taskRepo.save(updatedTask);
            return new ResponseEntity<>(taskObj, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }
    @DeleteMapping("/deleteTaskById/{id}")
    public ResponseEntity<HttpStatus> deleteTaskById(@PathVariable Long id){
        taskRepo.deleteById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
