import { Component, ChangeDetectorRef, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { CompanyService } from '../../shared/trkr-services/company.service';
import { Subscription } from 'rxjs';
import { EmployeeService } from '../../shared/trkr-services/employee.service';
import { EmployeeInterface } from '../../shared/models/company-employee.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  loading = true;
  subscription: Subscription;
  data: EmployeeInterface[];
  selected = new EventEmitter<string>();
  selectedId: string;
  name: string;
  companyId: string;
  currentUser: string;

  constructor(private router: Router,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) { }

  async ngOnInit() {
    this.currentUser = localStorage.getItem('uId');
    // this.companyId = localStorage.getItem('companyId');

    this.companyId = 'bMNgTD76iZADfjm4PjOR';
    this.subscription = this.employeeService.readAllUserEmployee(this.companyId, 'staff').subscribe(data => {
      this.loading = false;
      // console.log('data', data);
      this.data = data;
      this.cdr.detectChanges();
    })
  }

  async deleteUser(data: EmployeeInterface) {
    this.employeeService.deleteUserEmployee(data, data.role)
  }

  onSelect(id: string) {
    this.selected.emit(id);
  }

  selectId(user: EmployeeInterface) {
    this.selectedId = user?.id;
  }

  ngOnDestroy() {
    if (this.subscription) { this.subscription.unsubscribe() };
  }

}
