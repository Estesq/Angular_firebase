import { Component, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-invite-client",
  templateUrl: "./invite-client.component.html",
  styleUrls: ["./invite-client.component.scss"],
})
export class InviteClientComponent implements OnInit {
  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {}
}
