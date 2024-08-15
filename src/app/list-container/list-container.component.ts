import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Colors } from '../../shared/types';

type TIteratableTasks = {description: string, status: string}[]

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss'
})
export class ListContainerComponent { 
  allTasks :TIteratableTasks = [];
  tasks :TIteratableTasks = [];
  searchText :string = "";
  chosenStatus :string = "";
  colors : any;

  statusOptions = [
    {status: "", statusName: "Todas"},
    {status: "À Fazer", statusName: "À Fazer"},
    {status: "Em andamento", statusName: "Em andamento"},
    {status: "Bloqueada", statusName: "Bloqueada"},
    {status: "Concluída", statusName: "Concluída"}
  ];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.colors = Colors;

    const mapping = {
      backlog: "À Fazer",
      doing: "Em andamento",
      done: "Concluída",
      blocked: "Bloqueada"
    }

    const dbTasks = this.taskService.tasks;

    // @ts-ignore
    const allTasks = Object.keys(dbTasks).flatMap((property: string) => dbTasks[property].map(description =>({
      description,
      // @ts-ignore
      status: mapping[property]
    })))

    const filteredTasks = allTasks.filter((task) => task.description !== undefined);

    if(filteredTasks.length === 0) {
      this.tasks = [];
      return
    }

    this.tasks = filteredTasks;
    this.allTasks = filteredTasks;
  }

  filterTasks(titleSearch: string, selectedStatus: string) {
    if(titleSearch === "" && selectedStatus === "") {
      this.tasks = this.allTasks;
      return 
    }

    const tasks = this.allTasks.slice();
    const tasksFilteredByText = tasks.filter(task => task.description.includes(titleSearch))

    if(selectedStatus === "") {
      this.tasks = tasksFilteredByText
      return 
    }

    const tasksfilteredByStatus = tasks.filter(task => task.status === selectedStatus)

    this.tasks = tasksfilteredByStatus;
  }
}
