import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  currentYear = "";

  ngOnInit() {
    this.currentYear = String(new Date().getFullYear());
  }
}
