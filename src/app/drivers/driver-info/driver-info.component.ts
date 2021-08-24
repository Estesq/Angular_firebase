import {Component, ChangeDetectorRef, Input, OnInit, OnChanges} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {DriverInterface} from '../../shared/models/driver.interface';
import {DriverService} from '../../shared/trkr-services/driver.service';

@Component({
  selector: 'app-driver-info',
  templateUrl: './driver-info.component.html',
  styleUrls: ['./driver-info.component.scss']
})
export class DriverInfoComponent implements OnInit {

  @Input() data: DriverInterface

  driverStatus;
  now = new Date();

  driver: DriverInterface = {
    id: '',
    ssn: '',
    fein: '',
    status: 'Pending',
    hireDate: this.now.getTime(),
    terminationDate: this.now.getTime(),
    division: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    homePhone: '',
    cellPhone: '',
    email: '',
    isSendTextMessage: false,
    isSendEmail: false,
    emergencyContact: '',
    emergencyPhone: '',
    emergencyRelationship: '',
    cdlNumber: '',
    cdlState: '',
    cdlExpirationDate: this.now.getTime(),
    cdlClass: '',
    cdlEndorsement: '',
    yearsOfExperiece: 0,
    statedOperated: '',
    safeDrivingAwards: '',
    specialTraining: '',
  }
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private driverService: DriverService,
  ) { }

  ngOnInit(): void {
    this.driver = this.data
    this.driverStatus = '';
  }
  changeDriverStatus(status: string) {
    this.driverStatus = status
  }
  async ngOnChanges(changes: string) {
    this.driver = this.data;
    console.log('driver in info panel', this.driver);
    this.cdr.detectChanges();
  }
}
