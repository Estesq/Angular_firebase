import {Component, ChangeDetectorRef, EventEmitter, OnInit} from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import {DriverService} from '../../shared/trkr-services/driver.service';
import {TruckService} from '../../shared/trkr-services/truck.service';
import {TruckInterface} from '../../shared/models/truck.interface';
import {UserInterface} from '../../shared/models/user.interface';
import {localStorageTypes} from '../../shared/constants/constants';
import { Subscription } from 'rxjs';
import {DriverInterface} from '../../shared/models/driver.interface';

@Component({
  selector: 'app-truck-driver',
  templateUrl: './truck-driver.component.html',
  styleUrls: ['./truck-driver.component.scss']
})
export class TruckDriverComponent implements OnInit {

  loading = true;
  driverSubscription;
  data: DriverInterface[];
  selected = new EventEmitter<string>();
  selectedId;
  driverStatus
  id;
  currentUser: UserInterface;
  truckId;
  truck: TruckInterface;
  subscription: Subscription;
  companyId: string;

  constructor(
    private driverService: DriverService,
    private truckService: TruckService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) { }
  async ngOnInit() {
    this.currentUser.uId = localStorage.getItem(localStorageTypes.userId)
    this.companyId = localStorage.getItem(localStorageTypes.companyId)
    this.route.params.subscribe((params) => this.truckId = params['id']);
    this.router.navigate(['/trucks/truck-driver', this.truckId]);

    // try {
      this.truckService.readCompanyTruckById({companyId: this.companyId, id: this.truckId}).then(res => {
        this.truck = res;
        this.loadData();
      });
      // const queryFilterTruck: ProducerModelPredicate<Truck> = (truck: ModelPredicate<Truck>) => truck.id('eq', this.truckId)
      // const result = await DataStore.query<Truck>(Truck, queryFilterTruck);
      // if (result.length) {
      //   this.truck = result[0];
      // }
    // } catch(error) {
    //   console.log(error);
    // }

    // this.currentUser = this.authService.currentUser;
    // this.driverSubscription = DataStore.observe<Driver>(Driver).subscribe(async () => {
    //   await this.loadData();
    // });
    // this.driverStatus = '';
  }

  async loadData() {
    this.subscription = this.driverService.readAllCompanyDrivers(this.companyId).subscribe(drivers => {
      this.data = drivers;
      this.cdr.detectChanges();
    })
    // const queryFilter: ProducerModelPredicate<Driver> = (driver: ModelPredicate<Driver>) => driver.companyId('eq', this.currentUser.companyId)
    // try {
    //   this.data = await DataStore.query<Driver>(Driver, queryFilter)
    // } catch(error) {
    //   console.log(error);
    // }
    // this.loading = false;
    // this.cdr.detectChanges();
  }
  async assignDriver(id: string) {
    const driver = this.data.find(obj => {
      return obj.id === id
    });
    try {
      // await DataStore.delete<Driver>(Driver, id);
      if (driver.truckId) {
        driver.truckId = null;
        driver.truckNumber = null;
        this.driverService.updateCompanyDriver(driver).then(() => {
          return
        })
        // await DataStore.save(Driver.copyOf(driver, (item: MutableModel<Driver>) => {
        //   item.truck = null;
        //   item.truckId = null;
        //   item.truckNumber = null;
        // }));
      } else {
        driver.truckId = this.truckId;
        driver.truckNumber = this.truck.number;
        this.driverService.updateCompanyDriver(driver).then(() => {
          return
        })

        // await DataStore.save(Driver.copyOf(driver, (item: MutableModel<Driver>) => {
        //   item.truck = this.truck;
        //   item.truckId = this.truckId;
        //   item.truckNumber = this.truck.number;
        // }));
      }
      this.loadData()
    } catch(error) {
      console.log('error deleting all messages...', error);
    }
  }

  onSelect(id: string) {
    this.selected.emit(id);
    console.log('id', id);
  }

  selectDriverByStatus(status: string) {
    this.driverStatus = status;
  }

  selectId(id: string) {
    this.selectedId = id;
  }

  // ngOnDestroy() {
  //   if (this.driverSubscription) this.driverSubscription.unsubscribe();
  // }

}
