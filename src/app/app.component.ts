import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements  OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    const tasks = localStorage.getItem("tasks");
    if(tasks) {
      const tasksJson = JSON.parse(tasks);
      this.taskService.tasks = tasksJson;
      return
    }
    const createNewDB = JSON.stringify(this.taskService.tasks);
    localStorage.setItem("tasks", createNewDB)
  }
}
