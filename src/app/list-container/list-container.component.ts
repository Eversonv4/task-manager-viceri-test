import { Component } from '@angular/core';
import { TListPack } from '../../shared/types';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrl: './list-container.component.scss'
})
export class ListContainerComponent {
  tasks : TListPack = {
    backlog: [],
    doing: [],
    done: [],
    blocked: [],
  }

  statusOptions = [
    {status: "", statusName: "Todas"},
    {status: "backlog", statusName: "Pendente"},
    {status: "doing", statusName: "Fazendo"},
    {status: "blocked", statusName: "Bloqueada"},
    {status: "done", statusName: "Concluída"}
  ];

}
