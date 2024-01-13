import { Injectable, OnInit } from '@angular/core';
import { Task } from '../app/model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit {
  tasks: Task[] = [];

  constructor() { }

  ngOnInit() {
    const rawTasks = localStorage.getItem("tasks");
    if(rawTasks) {
      const tasks = JSON.parse(rawTasks);
      this.tasks = tasks;
    }
  }

  create() {}
  list() {}
  filter() {}
  switchStatus() {}
  update() {}
  destroy() {}
}
