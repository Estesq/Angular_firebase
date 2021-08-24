import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  tabTrailer = true;
  constructor() { }

  ngOnInit(): void {
  }
  changeFreeContent() {this.tabTrailer = !this.tabTrailer}
}
