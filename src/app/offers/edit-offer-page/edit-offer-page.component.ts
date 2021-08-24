import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-offer-page',
  templateUrl: './edit-offer-page.component.html',
  styleUrls: ['./edit-offer-page.component.scss']
})
export class EditPageComponent implements OnInit {
  active = 1; // Basic Navs

  constructor() { }

  ngOnInit(): void {
  }
}
