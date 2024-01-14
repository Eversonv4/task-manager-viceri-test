import { Component } from '@angular/core';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss'
})
export class ListContainerComponent {
  statusOptions = [
    {status: "", statusName: "Nenhum"},
    {status: "backlog", statusName: "Pendente"},
    {status: "doing", statusName: "Fazendo"},
    {status: "blocked", statusName: "Bloqueada"},
    {status: "done", statusName: "Concluída"}
  ];
}
