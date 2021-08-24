import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientCreateComponent } from '../client-create/client-create.component';
import { UserInterface } from '../../shared/models/user.interface';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../shared/trkr-services/employee.service';
import { EmployeeInterface } from '../../shared/models/company-employee.interface';

@Component({
  selector: 'app-clinets-list',
  templateUrl: './clinets-list.component.html',
  styleUrls: ['./clinets-list.component.scss']
})
export class ClinetsListComponent implements OnInit {

  loading: boolean;
  subscription: Subscription;
  staff: EmployeeInterface[];

  selected = new EventEmitter<string>();
  selectedId: string;
  name: string;
  currentUser: UserInterface;

  constructor(
    private employeeService: EmployeeService,
    private cdRef: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.loading = true;
    this.subscription = this.employeeService.readAllUserEmployee(localStorage.getItem('companyId'), 'staff').subscribe(res => {
      this.loading = false;
      this.staff = res;
      if (this.staff.length > 0) {
        this.selectedId = this.staff[0].id
      }
      this.cdRef.detectChanges();
      this.subscription.unsubscribe();
    })
  }

  async deleteUser(employee: EmployeeInterface) {
    this.employeeService.deleteUserEmployee(employee, employee.role).then(() => {
      if (employee.role == 'staff')
        this.staff = this.staff.filter(staffs => staffs.id !== employee.id)
    })
  }

  selectId(id: string) {
    this.selectedId = id;
    console.log('id', id);
    console.log('selectedId', this.selectedId);
  }

  addCompanyUser() {
    const modalRef = this.modalService.open(ClientCreateComponent);
    modalRef.componentInstance.id = 123456; // should be the id
    modalRef.componentInstance.data = {};
    modalRef.result.then((result) => {
      this.employeeService.createEmployee(result, result.role)
    })
  }
}
