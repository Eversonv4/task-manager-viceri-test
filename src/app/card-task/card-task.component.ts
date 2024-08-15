import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-task',
  templateUrl: './card-task.component.html',
  styleUrl: './card-task.component.scss'
})
export class CardTaskComponent {
  @Input() title !: string;
  @Input() bgColor !: string;
  @Output() delete = new EventEmitter();
  @Output() openModal = new EventEmitter();

  deleteTask() {
    this.delete.emit();
  }

  openUpdateTaskModal() {
    this.openModal.emit();
  }
}
