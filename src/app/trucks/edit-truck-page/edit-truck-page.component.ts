import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-truck-page',
  templateUrl: './edit-truck-page.component.html',
  styleUrls: ['./edit-truck-page.component.scss']
})
export class EditPageComponent implements OnInit {

  active = 1; // Basic Navs

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    if (this.route.snapshot.url[0]?.path === "truck-driver") {
      this.active = 2;
    } else if (this.route.snapshot.url[0]?.path === "truck-trailer") {
      this.active = 3;
    }
  }

}
