import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TListPack, TStatus } from '../../shared/types';

type TSelectedTask = {
  status: TStatus,
  title: string
  index: number
}

type TStatuses = {
  status: TStatus,
  title: string
}[]

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent implements OnInit {
  tasks: TListPack = {
    backlog: [],
    doing: [],
    done: [],
    blocked: []
  }
  statuses :TStatuses = [
    {status: "backlog", title: "À Fazer"}, 
    {status: "doing", title: "Em andamento"}, 
    {status: "done", title: "Concluída"}, 
    {status: "blocked", title: "Bloqueada"}
  ];

  selectedTask : TSelectedTask = {
    index: 0,
    status: "backlog",
    title: ""
  };

  constructor(private taskService: TaskService) {

  }
  
  ngOnInit(): void {
    this.tasks = this.taskService.tasks
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.taskService.updateDataBase();
  }

  createNewTask(event: HTMLInputElement) {
    if(event.value !== "") {
      const task = event.value;
      this.taskService.create(task)
      event.value = "";
    }
  }

  deleteTask(status: TStatus, index: number) {
    const confirmation = confirm("Tem certeza que deseja excluir esta tarefa?")

    if(!confirmation) {
      return;
    }

    const filteredTasks = this.taskService.tasks[status].filter((task, i) => index !== i);
    this.taskService.tasks[status] = filteredTasks;

    this.taskService.updateDataBase();
  }

  openModal(modal: HTMLDivElement, updateTextarea: HTMLTextAreaElement, status: TStatus, index: number) {
    modal.style.left = "0";
    const title = this.taskService.tasks[status][index];
    updateTextarea.value = title;
    this.selectedTask = {
      index,
      status,
      title,
    }
  }

  updateTask(updateTaskTextArea: HTMLTextAreaElement, modal: HTMLDivElement, newStatus: string) {
    if(updateTaskTextArea.value === "") {
      return
    }

    if(newStatus !== this.selectedTask.status) {
      // @ts-ignore
      this.changeTaskStatus(this.selectedTask.status, this.selectedTask.index)
      // @ts-ignore
      this.taskService.tasks[newStatus].push(updateTaskTextArea.value);
    } else {
      this.taskService.tasks[this.selectedTask.status][this.selectedTask.index] = updateTaskTextArea.value;
    }

    modal.style.left = "100%";
    updateTaskTextArea.value = "";

    this.taskService.updateDataBase();
  }

  changeTaskStatus(status: TStatus, index: number) {
    const filteredTasks = this.taskService.tasks[status].filter((task, i) => index !== i);
    this.taskService.tasks[status] = filteredTasks;

    this.taskService.updateDataBase();
  }

  closeModal(modal: HTMLDivElement, HTMLTextAreaElement: HTMLTextAreaElement) {
    modal.style.left = "100%";
    HTMLTextAreaElement.value = "";
  }
}
