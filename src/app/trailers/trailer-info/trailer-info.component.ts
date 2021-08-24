import {Component, ChangeDetectorRef, Input, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TrailerInterface} from '../../shared/models/trailer.interface';
import {TrailerService} from '../../shared/trkr-services/trailer.service';
import {localStorageTypes} from '../../shared/constants/constants';
import {UserInterface} from '../../shared/models/user.interface';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-trailer-info',
  templateUrl: './trailer-info.component.html',
  styleUrls: ['./trailer-info.component.scss']
})
export class TrailerInfoComponent implements OnInit {

  @Input() data: TrailerInterface

  trailerStatus;
  now = new Date();
  companyId: string;
  subscription: Subscription;
  currentUser: UserInterface;
  trailer: TrailerInterface = {
    type: ``,
    length: 0,
    truckNumber: ``,
  }
  constructor(
    private trailerService: TrailerService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    // this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    // this.companyId = localStorage.getItem(localStorageTypes.companyId)
    this.trailerStatus = '';
  }
  changeTrailerStatus(status: string) {
    this.trailerStatus = status;
  }
  async ngOnChanges(changes: string) {
    this.trailer = this.data;
  }
}
