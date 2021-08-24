import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../shared/trkr-services/employee.service';
import { EmployeeInterface } from '../../shared/models/company-employee.interface';
import { UserInterface } from '../../shared/models/user.interface';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.scss']
})
export class ClientCreateComponent implements OnInit {

  companyUsersForm = new FormGroup({
    fullName: new FormControl(''),
    department: new FormControl(''),
    cellPhone: new FormControl(''),
    mobilePhone: new FormControl(''),
    email: new FormControl(''),
    role: new FormControl(''),
    status: new FormControl(''),
  });
  user: UserInterface;

  constructor(
    private employeeService: EmployeeService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    // this.userSubscription = DataStore.observe<User>(User).subscribe(() => {});
    // this.companyUsersSubscription = DataStore.observe<CompanyUsers>(Company).subscribe(() => {});
    // this.buildItemForm();
  }
  // buildItemForm() {
  // }

  // ngOnDestroy() {
  //   if (this.userSubscription) {this.userSubscription.unsubscribe()};
  //   if (this.companyUsersSubscription) {this.companyUsersSubscription.unsubscribe()};
  // }
  async onSubmit() {
    const newStaff: EmployeeInterface = {
      fullName: this.companyUsersForm.value.fullName,
      department: this.companyUsersForm.value.department,
      cellPhone: this.companyUsersForm.value.cellPhone,
      mobilePhone: this.companyUsersForm.value.mobilePhone,
      role: this.companyUsersForm.value.role,
      email: this.companyUsersForm.value.email,
      status: this.companyUsersForm.value.status,
    };
    this.employeeService.createEmployee(newStaff, 'staff').then(() => {
      this.activeModal.close();
    })
    // await DataStore.save(
    //   new CompanyUsers({
    //     fullName: this.companyUsersForm.value.fullName,
    //     department: this.companyUsersForm.value.department,
    //     cellPhone: this.companyUsersForm.value.cellPhone,
    //     mobilePhone: this.companyUsersForm.value.mobilePhone,
    //     role: this.companyUsersForm.value.role,
    //     email: this.companyUsersForm.value.email,
    //     status: this.companyUsersForm.value.status,
    //   })
    // );
    // await DataStore.save(User.copyOf(this.companyUsersForm.value.email, (item: MutableModel<User>) => {
    //   item.email = this.companyUsersForm.value.email;
    //   item.role = 'company';
    // }));
  }
}


