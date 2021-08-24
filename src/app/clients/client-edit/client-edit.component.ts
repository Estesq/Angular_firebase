import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../shared/trkr-services/employee.service';
import { EmployeeInterface } from '../../shared/models/company-employee.interface';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  companyUsersForm: FormGroup;
  companyUsersSubscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.employeeService.readUserEmployeeById(localStorage.getItem('companyId'), localStorage.getItem('uId'), 'staff').then(res => {
      this.buildItemForm(res);
      this.cdRef.detectChanges();
    })
  }
  private buildItemForm(item: any) {
    this.companyUsersForm = this.formBuilder.group({
      fullName: [item.fullName || ''],
      department: [item.department || ''],
      cellPhone: [item.cellPhone || ''],
      mobilePhone: [item.mobilePhone || ''],
      email: [item.email || ''],
      role: [item.role || ''],
      status: [item.status || ''],
    });
    this.cdRef.detectChanges();
  }

  async onSubmit() {
    const staff: EmployeeInterface = this.companyUsersForm.value
    staff.companyId = localStorage.getItem('companyId')
    staff.uId = localStorage.getItem('uId')
    this.employeeService.updateUserEmployee(staff, 'staff').then(() => {

    })
    // await DataStore.save(
    //   new CompanyUsers({
    //     fullName: this.companyUsersForm.value.fullName,
    //     department: this.companyUsersForm.value.department,
    //     cellPhone: this.companyUsersForm.value.cellPhone,
    //     mobilePhone: this.companyUsersForm.value.mobilePhone,
    //     email: this.companyUsersForm.value.email,
    //     role: this.companyUsersForm.value.role,
    //     status: this.companyUsersForm.value.status,
    //   })
    // )
  }
}


