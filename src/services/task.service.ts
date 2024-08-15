import { Injectable, OnInit } from '@angular/core';
import { TListPack } from '../shared/types';



@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit {
  tasks: TListPack = {
    backlog: ["Crie sua primeira tarefa 😀"],
    doing: [],
    done: [],
    blocked: [],
  };

  constructor() { }

  ngOnInit() {
    const rawTasks = localStorage.getItem("tasks");
    if(rawTasks) {
      const tasks = JSON.parse(rawTasks);
      this.tasks = tasks;
    }
  }

  create(title: string) {
    if(title === "") {
      return;
    }

    this.tasks.backlog.push(title);
    this.updateDataBase()
  }

  list() {}
  filter() {}
  switchStatus() {}
  update() {}
  destroy() {}

  updateDataBase() {
    const tasksString = JSON.stringify(this.tasks)
    localStorage.setItem("tasks", tasksString)
  }
}
