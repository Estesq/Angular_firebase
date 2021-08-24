import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {UserInterface} from '../../shared/models/user.interface';
import {AdminService} from '../../shared/trkr-services/admin.service';
import {AuthService} from '../../shared/auth/auth.service';
import {localStorageTypes} from '../../shared/constants/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-edit-modal',
  templateUrl: './user-edit-modal.component.html',
  styleUrls: ['./user-edit-modal.component.scss']
})
export class UserEditModalComponent implements OnInit {
  userSubscription: Subscription;
  usersForm: FormGroup;
  currentUser: UserInterface;
  companyId: string
  @Input() id: any;
  @Input() data: UserInterface;

  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    // this.userSubscription = DataStore.observe<User>(User).subscribe(() => {});
    this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    this.companyId = localStorage.getItem(localStorageTypes.companyId)
    this.buildItemForm(this.data);
  }
  // ngOnDestroy() {
  //   if (this.userSubscription) this.userSubscription.unsubscribe();
  // }
  private buildItemForm(item) {
    this.usersForm = this.formBuilder.group({
      email: [item.email || ''],
      role: [item.role || ''],
      status: [item.status || ''],
    });
  }

  async onSubmit () {
    this.adminService.updateUser({
      email: this.usersForm.value.email,
      role: this.usersForm.value.role,
      status: this.usersForm.value.status,
    }).then(() => {
      this.activeModal.close();
    })
    // await DataStore.save(User.copyOf(this.data, (item: MutableModel<User>) => {
    //   item.email = this.usersForm.value.email;
    //   item.role = this.usersForm.value.role;
    //   item.status = this.usersForm.value.status;
    // }));
  }
}


