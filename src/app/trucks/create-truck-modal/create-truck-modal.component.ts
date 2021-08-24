import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TruckService} from '../../shared/trkr-services/truck.service';

@Component({
  selector: 'app-create-truck-modal',
  templateUrl: './create-truck-modal.component.html',
  styleUrls: ['./create-truck-modal.component.scss']
})
export class CreateTruckModalComponent implements OnInit {
  @Input() id: string;
  truckForm: FormGroup;
  companyId: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private truckService: TruckService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.companyId = 'bMNgTD76iZADfjm4PjOR'
    this.truckForm = new FormGroup({
      id: new FormControl(''),
      companyId: new FormControl(this.companyId),
      type: new FormControl(''),
      number: new FormControl(''),
      start: new FormControl(''),
      end: new FormControl(''),
      status: new FormControl(''),
      division: new FormControl(''),
      statement: new FormControl(''),
      mark: new FormControl(''),
      model: new FormControl(''),
      color: new FormControl(''),
      year: new FormControl(''),
      vin: new FormControl(''),
      plates: new FormControl(''),
      fuelCard: new FormControl(''),
      fuelType: new FormControl(''),
      iPass: new FormControl(''),
      bestPass: new FormControl(''),
      engineSerial: new FormControl(''),
      tireSize: new FormControl(''),
      deductTools: new FormControl(''),
      deductFuel: new FormControl(''),
      odometrState: new FormControl(''),
      odometrDirections: new FormControl(''),
      dotInspectionExpiration: new FormControl(''),
      platesExpirationDate: new FormControl(''),
      insuranceExpirationDate: new FormControl(''),
      insuranceValue: new FormControl(''),
      escrowStartingBalance: new FormControl(''),
      escrowAccauntBalance: new FormControl(''),
      iftaExpirationDate: new FormControl(''),
      hutNyPermit: new FormControl(''),
      hutGrossWeight: new FormControl(''),
      hutUnloadedWeight: new FormControl(''),
      hutOfAxles: new FormControl(''),
      dispatchId: new FormControl(''),
      dispatchGroup: new FormControl(''),
      gpsType: new FormControl(''),
      gpsDeviceId: new FormControl(''),
      lat: new FormControl(''),
      lng: new FormControl(''),
      driver1id: new FormControl('none'),
      driver2id: new FormControl('none'),
      trailer1id: new FormControl('none'),
      trailer2id: new FormControl('none'),
      trailer3id: new FormControl('none'),
    })
  }
  convertToFormDate(date) {
    const dateData = new Date(date);
    return {
      year: dateData.getFullYear(),
      month: dateData.getMonth() + 1,
      day: dateData.getDate(),
    }
  }
  private buildItemForm(item) {
    this.truckForm = this.formBuilder.group({
      id: [item.id || ''],
      companyId: this.companyId,
      type: [item.type || '', Validators.required],
      number: [item.number || 0, Validators.required],
      status: [item.status || '', Validators.required],
      division: [item.division || '', Validators.required],
      statement: [item.statement || '', Validators.required],
      mark: [item.mark || '', Validators.required],
      model: [item.model || '', Validators.required],
      color: [item.color || '', Validators.required],
      year: [item.year || 0, Validators.required],
      vin: [item.vin || '', Validators.required],
      plates: [item.plates || '', Validators.required],
      fuelCard: [item.fuelCard || '', Validators.required],
      fuelType: [item.fuelType || '', Validators.required],
      iPass: [item.iPass || '', Validators.required],
      bestPass: [item.bestPass || '', Validators.required],
      engineSerial: [item.engineSerial || '', Validators.required],
      tireSize: [item.tireSize || '', Validators.required],
      deductTools: [item.deductTools || '', Validators.required],
      deductFuel: [item.deductFuel || '', Validators.required],
      odometrState: [item.odometrState || '', Validators.required],
      odometrDirections: [item.odometrDirections || '', Validators.required],
      dotInspectionExpiration: [item.dotInspectionExpiration || 0, Validators.required],
      platesExpirationDate: [item.platesExpirationDate || 0, Validators.required],
      insuranceExpirationDate: [item.insuranceExpirationDate || 0, Validators.required],
      insuranceValue: [item.insuranceValue || '', Validators.required],
      escrowStartingBalance: [item.escrowStartingBalance || '', Validators.required],
      escrowAccauntBalance: [item.escrowAccauntBalance || '', Validators.required],
      iftaExpirationDate: [item.iftaExpirationDate || '', Validators.required],
      hutNyPermit: [item.hutNyPermit || '', Validators.required],
      hutGrossWeight: [item.hutGrossWeight || '', Validators.required],
      hutUnloadedWeight: [item.hutUnloadedWeight || '', Validators.required],
      hutOfAxles: [item.hutOfAxles || '', Validators.required],
      dispatchId: [item.dispatchId || '', Validators.required],
      dispatchGroup: [item.dispatchGroup || '', Validators.required],
      gpsType: [item.gpsType || '', Validators.required],
      gpsDeviceId: [item.gpsDeviceId || '', Validators.required],
      lat: [item.lat || 0, Validators.required],
      lng: [item.lng || 0, Validators.required],
      driver1id: ['none'],
      driver2id: ['none'],
      trailer1id: ['none'],
      trailer2id: ['none'],
      trailer3id: ['none'],
    });
    return
  }
  async onSubmit () {
    this.truckService.createTruck(this.truckForm.value).then(() => {
      this.activeModal.close();
    })
  }
}
