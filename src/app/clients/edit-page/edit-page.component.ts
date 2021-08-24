import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {

  active = 1; // Basic Navs

  constructor() { }

  ngOnInit() {
  }
}
