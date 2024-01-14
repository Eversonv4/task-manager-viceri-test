import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { TListPack, TaskService } from '../../services/task.service';

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
    }
  }
}
