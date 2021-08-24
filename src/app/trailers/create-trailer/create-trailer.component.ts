import {Component, ChangeDetectorRef, OnInit, ViewEncapsulation} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import {states} from 'app/shared/data/states';
import {UserInterface} from '../../shared/models/user.interface';
import {TruckInterface} from '../../shared/models/truck.interface';
import {TrailerInterface} from '../../shared/models/trailer.interface';
import {TruckService} from '../../shared/trkr-services/truck.service';
import {TrailerService} from '../../shared/trkr-services/trailer.service';
import {localStorageTypes} from '../../shared/constants/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-trailer',
  templateUrl: './create-trailer.component.html',
  styleUrls: ['./create-trailer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateTrailerComponent implements OnInit {
  popupModel;
  loading: boolean = false;
  truckSubscription;
  trailerSubscription;
  currentUser: UserInterface;
  trucks: TruckInterface[];
  now = new Date();
  stateList = states;
  id: string;
  trailer: TrailerInterface;
  trailerFormSubmitted = false;
  error: string = "";
  trailerForm: FormGroup
  companyId: string;
  subscription: Subscription;

  constructor(
    private truckService: TruckService,
    private trailerService: TrailerService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  get cf() {
    return this.trailerForm.controls;
  }

  private buildItemForm(item: any) {
    this.trailerForm = this.formBuilder.group({
      id: [this.id || ''],
      companyId: [this.companyId],
      truck: [item.truck || '', Validators.required],
      number: [item.number || '', Validators.required],
      status: [item.status || 'Pending', Validators.required],
      type: [item.type || '', Validators.required],
      length: [item.length || '', Validators.required],
    });
  }

  async ngOnInit() {
    // this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    // this.companyId = localStorage.getItem(localStorageTypes.companyId)
    this.route.params.subscribe((params) => this.id = params['id']);
    this.companyId = 'bMNgTD76iZADfjm4PjOR'
    this.loadData();
  }

  convertToFormDate(date: any) {
    const dateData = new Date(date);
    return {
      year: dateData.getFullYear(),
      month: dateData.getMonth() + 1,
      day: dateData.getDate(),
    }
  }

  async loadData() {
    this.loading = true;
    this.subscription = this.truckService.readAllCompanyTruck(this.companyId).subscribe(res => {
      this.trucks = res;
    })

    if (this.id) {
      this.trailerService.readCompanyTrailerById(this.companyId, this.id).then(res => {
        this.trailer = res
        this.buildItemForm(this.trailer);
        this.loading = false;
        this.cdr.detectChanges();
      })
    } else {
      const trailer: TrailerInterface = {};
      this.buildItemForm(trailer);
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  async onSubmit () {
    this.trailerFormSubmitted = true;
    const editedTrailer: TrailerInterface = this.trailerForm.value;
    const truck = this.trucks.find(obj => {
      return obj.id === this.trailerForm.value.truck
    });
    editedTrailer.truckNumber = truck.number
    if (this.trailerForm.invalid) {
      return;
    }
    if (this.id) {
      this.trailerService.updateCompanyTrailer(editedTrailer).then(() => {
        this.trailerForm.reset();
        this.trailerFormSubmitted = false;
        this.router.navigate(['/trailers/list']);
      })
    } else {
      this.trailerService.createTrailer(editedTrailer).then(() => {
        this.trailerForm.reset();
        this.trailerFormSubmitted = false;
        this.router.navigate(['/trailers/list']);
      })
    }
  }
}
