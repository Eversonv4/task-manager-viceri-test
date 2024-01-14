import { Injectable, OnInit } from '@angular/core';
import { Task } from '../app/model/task.model';

export type TListPack = {
  backlog: string[],
  doing: string[],
  done: string[],
  blocked: string[],
}

@Injectable({
  providedIn: 'root'
})
export class TaskService implements OnInit {
  tasks: TListPack = {
    backlog: [],
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
    // const tasks = {
    //   backlog: this.backlog,
    //   doing: this.doing,
    //   done: this.done,
    //   blocked: this.blocked
    // }

    const tasksString = JSON.stringify(this.tasks)

    localStorage.setItem("tasks", tasksString)
  }
}
