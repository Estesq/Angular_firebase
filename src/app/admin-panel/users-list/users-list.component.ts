import {ChangeDetectorRef, Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../shared/auth/auth.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserEditModalComponent} from '../user-edit-modal/user-edit-modal.component';
import {AdminService} from '../../shared/trkr-services/admin.service';
import {localStorageTypes} from '../../shared/constants/constants';
import {UserInterface} from '../../shared/models/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  loading = true;
  subscription: Subscription;
  data: UserInterface[];
  selectedUser: UserInterface;
  name: string;
  activeUser: any;


  constructor(
    private adminService: AdminService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  async ngOnInit() {
    this.subscription = await this.adminService.readAdmins().subscribe(res => {
      this.data = res
      console.log('readAdmins this.data', this.data);
      this.selectUser(this.data[0]);
      this.loading = false;
      // this.subscription.unsubscribe();
      this.cdr.detectChanges();
    })
  }

  async deleteUser(user: UserInterface) {
    this.adminService.deleteUser(user).then(() => {
      this.data = this.data.filter(users => users.id !== user.id)
    })
  }
  selectUser(user: UserInterface) {
    console.log('selectId', user);
    console.log(this);
    this.selectedUser = user;
    this.cdr.detectChanges();
    this.activeUser = user;
  }
}
