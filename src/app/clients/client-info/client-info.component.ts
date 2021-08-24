import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ClientCreateComponent } from "../client-create/client-create.component";
import { EmployeeService } from '../../shared/trkr-services/employee.service';
import { EmployeeInterface } from '../../shared/models/company-employee.interface';

@Component({
  selector: "app-client-info",
  templateUrl: "./client-info.component.html",
  styleUrls: ["./client-info.component.scss"],
})
export class ClientInfoComponent implements OnInit {
  @Input() data: string;

  companyUsers: EmployeeInterface = {
    id: "",
    fullName: "",
    department: "",
    cellPhone: "",
    mobilePhone: "",
    email: "",
    role: "",
    status: "",
  };
  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    console.log("this.data", this.data);
  }

  createCompanyUser() {
    const modalRef = this.modalService.open(ClientCreateComponent);
    modalRef.componentInstance.id = 123456; // should be the id
    modalRef.componentInstance.data = {};
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
