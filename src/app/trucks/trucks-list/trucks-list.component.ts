import {
  Component,
  ChangeDetectorRef,
  EventEmitter,
  OnInit,
} from "@angular/core";
import { AuthService } from "app/shared/auth/auth.service";
import { CreatePostingCardModalComponent } from "../create-posting-card-modal/create-posting-card-modal.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TruckInterface } from "../../shared/models/truck.interface";
import { UserInterface } from "../../shared/models/user.interface";
import { TruckService } from "../../shared/trkr-services/truck.service";
import { localStorageTypes } from "../../shared/constants/constants";
import { Subscription } from "rxjs";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import {CreateTruckModalComponent} from '../create-truck-modal/create-truck-modal.component';

@Component({
  selector: "app-trucks-list",
  templateUrl: "./trucks-list.component.html",
  styleUrls: ["./trucks-list.component.scss"],
})
export class TrucksListComponent implements OnInit {
  displayData = false;
  view: string = "month";
  loading = true;
  subscription: Subscription;
  truckSubscription;
  trailerSubscription;
  driverSubscription;
  data: TruckInterface[];
  selected = new EventEmitter<string>();
  selectedId;
  truckStatus;
  id;
  truckForm: FormGroup;
  dataBind: TruckInterface;
  currentUser: UserInterface;
  companyId: string;
  name: string;
  selectedStatus: string;
  selectedTrucks: TruckInterface;
  mero: "hello";
  constructor(
    private formBuilder: FormBuilder,
    private truckService: TruckService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
  ) {
    this.truckForm = this.formBuilder.group({
      id: [""],
      companyId: [""],
      uId: [""],
      type: [""],
      start: [""],
      end: [""],
      status: [""],
      division: [""],
      statement: [""],
      mark: [""],
      model: [""],
      color: [""],
      year: [""],
      vin: [""],
      plates: [""],
      fuelCard: [""],
      fuelType: [""],
      iPass: [""],
      bestPass: [""],
      engineSerial: [""],
      tireSize: [""],
      deductTools: [""],
      deductFuel: [""],
      odometrState: [""],
      odometrDirections: [""],
      dotInspectionExpiration: [""],
      platesExpirationDate: [""],
      insuranceExpirationDate: [""],
      insuranceValue: [""],
      escrowStartingBalance: [""],
      escrowAccauntBalance: [""],
      iftaExpirationDate: [""],
      hutNyPermit: [""],
      hutGrossWeight: [""],
      hutUnloadedWeight: [""],
      hutOfAxles: [""],
      dispatchId: [""],
      dispatchGroup: [""],
      gpsType: [""],
      gpsDeviceId: [""],
      lat: [""],
      lng: [""],
      number: [""],
      driver1id: [""],
      driver2id: [""],
      trailer1id: [""],
      trailer2id: [""],
      trailer3id: [""],
    });
  }
  async ngOnInit() {
    this.companyId = "bMNgTD76iZADfjm4PjOR";
    this.subscription = this.truckService
      .readAllCompanyTruck(this.companyId)
      .subscribe((res) => {
        this.data = res;
        this.selectedTrucks = this.data[0];
        this.cdr.detectChanges();
      });
  }

  async deleteTruck(data: TruckInterface) {
    this.truckService.deleteCompanyTruck(data).then((res) => {
      this.data = this.data.filter((trucks) => trucks.id !== data.id);
    });

    this.selectedId = undefined;
  }

  onSelect(id: string) {
    this.selected.emit(id);
  }

  selectTruckByStatus(status: string) {
    this.truckStatus = status;
  }

  selectId(truck: TruckInterface) {
    console.log("selected truck", truck);
    this.selectedTrucks = truck;
    this.displayData = true;
    this.truckForm.patchValue({
      model: this.selectedTrucks?.model,
    });
    console.log(this.selectedTrucks.model);
  }
  createPostCard(truck: TruckInterface) {
    const modalRef = this.modalService.open(CreatePostingCardModalComponent);
    modalRef.componentInstance.id = truck.id; // should be the id
    modalRef.componentInstance.data = { truck };
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  createTruck() {
    const modalRef = this.modalService.open(CreateTruckModalComponent);
    modalRef.componentInstance.id = 0; // should be the id
    modalRef.componentInstance.data = {};
    modalRef.result.then((result) => {
      console.log(result);
    });
  }

  // ngOnDestroy() {
  //   if (this.truckSubscription) this.truckSubscription.unsubscribe();
  //   if (this.trailerSubscription) this.trailerSubscription.unsubscribe();
  //   if (this.driverSubscription) this.driverSubscription.unsubscribe();
  // }
}
