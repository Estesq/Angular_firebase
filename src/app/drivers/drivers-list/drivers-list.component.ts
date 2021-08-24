import {
  Component,
  ChangeDetectorRef,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { AuthService } from "app/shared/auth/auth.service";
import { DriverInterface } from "../../shared/models/driver.interface";
import { localStorageTypes, types } from "../../shared/constants/constants";
import { DriverService } from "../../shared/trkr-services/driver.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-drivers-list",
  templateUrl: "./drivers-list.component.html",
  styleUrls: ["./drivers-list.component.scss"],
})
export class DriversListComponent implements OnInit {
  view: string = "Driver-info";
  loading = true;
  sub: Subscription;
  data: DriverInterface[];
  selected = new EventEmitter<string>();
  selectedId;
  driverStatus;
  id;
  companyId: string;
  today = new Date().getTime();
  selectedDriver: DriverInterface = {}

  constructor(
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private driverService: DriverService
  ) {}

  async ngOnInit() {
    this.driverStatus = "";
    this.companyId = localStorage.getItem(localStorageTypes.companyId);
    this.sub = this.driverService
      .readAllCompanyDrivers(this.companyId)
      .subscribe((drivers) => {
        this.data = drivers;
        this.cdr.detectChanges();
      });
  }
  async deleteDriver(driver: DriverInterface) {
    console.log("driver => ", driver);
    this.driverService.deleteCompanyDriver(driver).then(() => {
      this.data = this.data.filter((drivers) => drivers.id !== driver.id);
    });
    // try {
    //   await DataStore.delete<Driver>(Driver, id)
    //   this.selectedId = undefined;
    //   this.loadData()
    // } catch (error) {
    //   console.log('error deleting:', error);
    // }
  }

  onSelect(id: string) {
    this.selected.emit(id);
  }

  selectDriverByStatus(status: string) {
    this.driverStatus = status;
  }

  selectId(id: string) {
    this.selectedId = id;
  }

  selectedDriverForInfo(driver: DriverInterface) {
    console.log("selected driver");
    this.selectedDriver = driver;
    this.cdr.detectChanges();
  }
}
