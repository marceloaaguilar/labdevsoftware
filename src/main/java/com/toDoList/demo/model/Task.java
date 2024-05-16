package com.toDoList.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "Tasks")
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String title;
    private String description;
    private int type;
    private Date date;
    private int term;
    private int priority;
    private Integer taskCompleted;
}
