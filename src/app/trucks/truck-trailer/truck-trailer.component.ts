import {Component, ChangeDetectorRef, EventEmitter, OnInit} from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {TrailerInterface} from '../../shared/models/trailer.interface';
import {UserInterface} from '../../shared/models/user.interface';
import {TruckInterface} from '../../shared/models/truck.interface';
import {DriverService} from '../../shared/trkr-services/driver.service';
import {TruckService} from '../../shared/trkr-services/truck.service';
import { Subscription } from 'rxjs';
import {localStorageTypes} from '../../shared/constants/constants';
import {TrailerService} from '../../shared/trkr-services/trailer.service';

@Component({
  selector: 'app-truck-trailer',
  templateUrl: './truck-trailer.component.html',
  styleUrls: ['./truck-trailer.component.scss']
})
export class TruckTrailerComponent implements OnInit {

  loading = true;
  trailerSubscription;
  data: TrailerInterface[];
  selected = new EventEmitter<string>();
  selectedId;
  trailerStatus
  id;
  currentUser: UserInterface;
  truckId;
  truck: TruckInterface;
  subscription: Subscription;
  companyId: string;

  constructor(
    private driverService: DriverService,
    private truckService: TruckService,
    private trailerService: TrailerService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) { }
  async ngOnInit() {
    this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    this.companyId = localStorage.getItem(localStorageTypes.companyId)
    this.route.params.subscribe((params) => this.truckId = params['id']);
    this.router.navigate(['/trucks/truck-trailer', this.truckId]);
    this.truckService.readCompanyTruckById({companyId: this.companyId, id: this.truckId}).then(res => {
      this.truck = res;
      this.loadData();
    });

    // try {
    //   const queryFilterTruck: ProducerModelPredicate<Truck> = (truck: ModelPredicate<Truck>) => truck.id('eq', this.truckId)
    //   const result = await DataStore.query<Truck>(Truck, queryFilterTruck);
    //   if (result.length) {
    //     this.truck = result[0];
    //   }
    // } catch(error) {
    //   console.log(error);
    // }

    // this.currentUser = this.authService.currentUser;
    // this.trailerSubscription = DataStore.observe<Trailer>(Trailer).subscribe(async () => {
    //   await this.loadData();
    // });
    // await this.loadData();
    this.trailerStatus = '';
  }

  async loadData() {
    this.subscription = this.trailerService.readAllCompanyTrailer(this.companyId).subscribe(trailers => {
      this.data = trailers;
      this.loading = false;
      this.subscription.unsubscribe();
      this.cdr.detectChanges();
    })

    // const queryFilter: ProducerModelPredicate<Trailer> = (trailer: ModelPredicate<Trailer>) => trailer.companyId('eq', this.currentUser.companyId)
    // try {
    //   this.data = await DataStore.query<Trailer>(Trailer, queryFilter)
    // } catch(error) {
    //   console.log(error);
    // }
    // this.loading = false;
    // this.cdr.detectChanges();
  }
  async assignTrailer(id: string) {
    const trailer = this.data.find(obj => {
      return obj.id === id
    });
    try {
      // await DataStore.delete<Trailer>(Trailer, id);
      if (trailer.truckId) {
        trailer.truckId = null;
        trailer.truckNumber = null;
        this.trailerService.updateCompanyTrailer(trailer).then(() => {
          return
        })
        //
        // await DataStore.save(Trailer.copyOf(trailer, (item: MutableModel<Trailer>) => {
        //   item.truck = null;
        //   item.truckId = null;
        //   item.truckNumber = null;
        // }));
      } else {
        trailer.truckId = this.truckId;
        trailer.truckNumber = this.truck.number;
        this.trailerService.updateCompanyTrailer(trailer).then(() => {
          return
        })

        // await DataStore.save(Trailer.copyOf(trailer, (item: MutableModel<Trailer>) => {
        //   item.truck = this.truck;
        //   item.truckId = this.truckId;
        //   item.truckNumber = this.truck.number;
        // }));
      }
      this.loadData()
    } catch (error) {
      console.log('error deleting all messages...', error);
    }
  }

  onSelect(id: string) {
    this.selected.emit(id);
    console.log('id', id);
  }

  selectTrailerByStatus(status: string) {
    this.trailerStatus = status;
  }

  selectId(id: string) {
    this.selectedId = id;
    console.log('id', id);
    console.log('selectedId', this.selectedId);
  }

  // ngOnDestroy() {
  //   if (this.trailerSubscription) this.trailerSubscription.unsubscribe();
  // }

}
