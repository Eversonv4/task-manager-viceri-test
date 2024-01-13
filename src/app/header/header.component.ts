import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  dateTime = "";

  ngOnInit() {
    const timer = setInterval(() => {
      this.updateDateTime()
    }, 1000)
  }

  updateDateTime() {
    const date = Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit", 
      year: "numeric", 
      hour: "2-digit", 
      minute: "2-digit"
    }).format();

    this.dateTime = date;
  }
}
