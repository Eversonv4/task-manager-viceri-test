import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TListPack, TaskService } from '../../services/task.service';
import { TStatus } from '../../shared/types';

type TSelectedTask = {
  status: TStatus,
  title: string
  index: number
}

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

  selectedTask !: TSelectedTask;

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

  openModal(modal: HTMLDivElement, updateInput: HTMLTextAreaElement, status: TStatus, index: number) {
    modal.style.left = "0";
    const title = this.taskService.tasks[status][index];
    updateInput.value = title;
    this.selectedTask = {
      index,
      status,
      title,
    }
  }

  updateTask(status: TStatus, index: number, updateTaskInput: HTMLTextAreaElement, modal: HTMLDivElement) {
    if(updateTaskInput.value === "") {
      return
    }

    this.taskService.tasks[status][index] = updateTaskInput.value;

    modal.style.left = "100%";
    updateTaskInput.value = "";

    this.taskService.updateDataBase();
  }

  closeModal(modal: HTMLDivElement, HTMLTextAreaElement: HTMLTextAreaElement) {
    modal.style.left = "100%";
    HTMLTextAreaElement.value = "";
  }
}
