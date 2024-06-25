package com.toDoList.demo.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "Tasks")

@Data
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    private int type;
    private Date date;
    private Date term;
    private int priority;
    private Integer taskCompleted;

    public Task(){}
}
