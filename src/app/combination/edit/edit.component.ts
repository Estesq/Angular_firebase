import { Component, OnInit } from '@angular/core';
import { DriverInterface } from 'app/shared/models/driver.interface';
import { TrailerInterface } from 'app/shared/models/trailer.interface';
import { TruckInterface } from 'app/shared/models/truck.interface';
import { CombinationService } from 'app/shared/trkr-services/combination.service';
import { DriverService } from 'app/shared/trkr-services/driver.service';
import { TrailerService } from 'app/shared/trkr-services/trailer.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from 'app/store/app.reducer';
import { State } from 'app/store/user/user.reducers';
import { LoadUser } from 'app/store/user/user.actions';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  user: Observable<State>;

  constructor(private driverServ: DriverService,
              private trailerServ: TrailerService,
              private combinationServ: CombinationService,

              private store: Store<AppState>) {
    this.user = store.select("user")
  }



  driver: any;
  truck: TruckInterface;
  trailer: any[];
  companyId;
  freeDrivers: DriverInterface[];
  freeTrailers: TrailerInterface[];
  driverCnt: number = 0;
  trailerCnt: number = 0;

  ngOnInit(): void {

    //  this.companyId = 'bMNgTD76iZADfjm4PjOR'
    //this.currentUser.id = "4I3iem2xRKTpUajy39keTELObLf2"

    this.store.dispatch(new LoadUser({ companyId: "bMNgTD76iZADfjm4PjOR", uId: "4I3iem2xRKTpUajy39keTELObLf2" }))


    this.truck = {
      id: "zuGzkQiAleFGy2uyoRm0",
      companyId: "bMNgTD76iZADfjm4PjOR",
      driver1id: "",
      driver2id: "",
      trailer1id: "",
      trailer2id: "",
      trailer3id: ""
    }


    this.user.subscribe(d => this.companyId = d.userModel.companyId)

    this.driverServ.readAllCompanyDrivers(this.companyId).subscribe(drivers => {
      this.driver = drivers;
      this.freeDrivers = this.driver.filter(d => d.truck === "");
    });


    this.trailerServ.readAllCompanyTrailer(this.companyId).subscribe(triler => {
      this.trailer = triler;
      this.freeTrailers = this.trailer.filter(t => t.truck === "");
    })


  }
  addDriver(driver) {
    if (this.truck.driver1id.includes(driver.id) || this.truck.driver2id.includes(driver.id)) {
      alert("already Present");
      return;
    }

    if (this.driverCnt >= 2) {
      alert("cannot be added");
      return;
    }

    this.driverCnt++;

    if (this.driverCnt == 1) {
      this.truck.driver1id = driver.id;
      this.combinationServ.updateFirstTruckDriver(this.truck);
    }

    if (this.driverCnt == 2) {
      this.truck.driver2id = driver.id;
      this.combinationServ.updateSecondTruckDriver(this.truck);
    }

    // Updating driver
    driver.truckId = this.truck.id;
    this.driverServ.updateCompanyDriver(driver);
  }

  addTrailer(trailer) {
    if (this.truck.trailer1id.includes(trailer.id) || this.truck.trailer1id.includes(trailer.id) ||
      this.truck.trailer3id.includes(trailer.id)) {
      alert("already Present");
      return;
    }

    if (this.trailerCnt >= 3) {
      alert("cannot be added");
      return;
    }


    this.trailerCnt++;
    if (this.trailerCnt == 1) {
      this.truck.trailer1id = trailer.id;
      this.combinationServ.updateFirstTruckTrailer(this.truck);
    }

    if (this.trailerCnt == 2) {
      this.truck.trailer2id = trailer.id;
      this.combinationServ.updateSecondTruckTrailer(this.truck);

    }
    if (this.trailerCnt == 3) {
      this.truck.trailer3id = trailer.id;
      this.combinationServ.updateThirdTruckTrailer(this.truck);
    }

    trailer.truckId = this.truck.id;
    this.trailerServ.updateCompanyTrailer(trailer);

  }

  deleteDriver(driverId) {
    if (driverId == "") {
      alert("not define")
      return;
    }
    let did = this.truck.driver1id === driverId ? 1 : 2;


    if (did === 1) {
      this.driverCnt--;
      this.truck.driver1id = "";
      this.combinationServ.updateFirstTruckDriver(this.truck);
    }

    if (did === 2) {
      this.driverCnt--;
      this.truck.driver2id = "";
      this.combinationServ.updateSecondTruckDriver(this.truck);
    }

    this.driverServ.updateCompanyDriver({ companyId: this.companyId, id: driverId, truckId: "" });
  }
  deleteTrailer(trailerId) {
    if (trailerId == "") {
      alert("not define")
      return;
    }

    if (this.truck.trailer1id === trailerId) {
      this.trailerCnt--;
      this.truck.trailer1id = "";
      this.combinationServ.updateFirstTruckTrailer(this.truck);
    }

    if (this.truck.trailer2id === trailerId) {
      this.trailerCnt--;
      this.truck.trailer2id = "";
      this.combinationServ.updateSecondTruckTrailer(this.truck);
    }
    if (this.truck.trailer3id === trailerId) {
      this.trailerCnt--;
      this.truck.trailer3id = "";
      this.combinationServ.updateThirdTruckTrailer(this.truck);
    }

    this.trailerServ.updateCompanyTrailer({ companyId: this.companyId, id: trailerId, truckId: "" });
  }
  test(){}

}
