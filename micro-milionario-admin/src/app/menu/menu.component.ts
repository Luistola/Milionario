import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isOpen = false;

  toggleSubMenu() {
    this.isOpen = !this.isOpen;
  }
  constructor() { }

  ngOnInit() {
  }

}
