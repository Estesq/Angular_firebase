import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { CreateCsvService } from '../../shared/services/create-csv.service';
import { Subscription } from 'rxjs';
import { CompanyService } from '../../shared/trkr-services/company.service';
import { DriverService } from '../../shared/trkr-services/driver.service';
import { DriverInterface } from '../../shared/models/driver.interface';
import { EmployeeService } from '../../shared/trkr-services/employee.service';
import { TrailerService } from '../../shared/trkr-services/trailer.service';
import { TruckService } from '../../shared/trkr-services/truck.service';
import { CompanyInterface } from '../../shared/models/company.interface';
import { TruckInterface } from '../../shared/models/truck.interface';
import { TrailerInterface } from '../../shared/models/trailer.interface';
import { UserInterface } from '../../shared/models/user.interface';
import { OffersInterface } from '../../shared/models/offers.interface';

@Component({
  selector: 'app-parser-page',
  templateUrl: './parser-page.component.html',
  styleUrls: ['./parser-page.component.scss']
})

export class ParserPageComponent implements OnInit {

  companyFields = ['id', 'name', 'address', 'city', 'state', 'zip', 'mc', 'dot', 'contactPersonName', 'contactPersonPosition', 'mobilePhone', 'email', 'cellPhone', 'status', 'ssn', 'scas', 'comments', 'fax', 'address2', 'type']
  truckFields = ['id', 'type', 'start', 'end', 'status', 'division', 'statement', 'mark', 'model', 'color', 'year', 'vin', 'plates', 'fuelCard', 'fuelType', 'iPass', 'bestPass', 'engineSerial', 'tireSize', 'deductTools', 'deductFuel', 'odometrState', 'odometrDirections', 'dotInspectionExpiration', 'platesExpirationDate', 'insuranceExpirationDate', 'insuranceValue', 'escrowStartingBalance', 'escrowAccauntBalance', 'iftaExpirationDate', 'hutNyPermit', 'hutGrossWeight', 'hutUnloadedWeight', 'hutOfAxles', 'dispatchId', 'dispatchGroup', 'gpsType', 'gpsDeviceId', 'Company', 'companyId', 'lat', 'lng', 'number']
  trailerFields = ['id', 'truckId', 'companyId', 'type', 'length', 'truck', 'carryWeight', 'company', 'status', 'isActive', 'location', 'truckNumber', 'number']
  driverFields = ['id', 'truckId', 'truck', 'companyId', 'status', 'fein', 'ssn', 'hireDate', 'terminationDate', 'address', 'city', 'state', 'zip', 'homePhone', 'cellPhone', 'email', 'division', 'isSendEmail', 'isSendTextMessage', 'emergencyPhone', 'emergencyRelationship', 'emergencyContact', 'cdlState', 'cdlExpirationDate', 'cdlClass', 'cdlEndorsement', 'cdlNumber', 'statedOperated', 'safeDrivingAwards', 'specialTraining', 'yearsOfExperiece', 'company', 'address2', 'zip2', 'firstName', 'lastName', 'dateOfBirth', 'uId', 'truckNumber']
  offerFields = ['company', 'companyId', 'companyName', 'createdById', 'createdBy', 'createdByName', 'createdAt', 'pickupAddress', 'pickupState', 'pickupZip', 'pickupGps', 'pickupLat', 'pickupLng', 'pickupDate', 'deliveryZip', 'deliveryGps', 'deliveryDate', 'deliveryAddress', 'deliveryState', 'deliveryLat', 'deliveryLng', 'truckId', 'truckNumber', 'Truck']

  csvRecords: any[] = []
  header: boolean

  currentUser: UserInterface;


  public companies: CompanyInterface[] = []
  public trucks: TruckInterface[] = []
  public trailers: TrailerInterface[] = []
  public drivers: DriverInterface[] = []
  public offers: OffersInterface[] = []

  companiesDb: CompanyInterface[] = []
  trucksDb: TruckInterface[]
  trailersDb: TrailerInterface[]
  driversDb: DriverInterface[]

  companiesUploadProgress: number
  offersUploadProgress: number
  trucksUploadProgress: number
  trailersUploadProgress: number
  driversUploadProgress: number

  companiesUploadProgressStep: number
  offersUploadProgressStep: number
  trucksUploadProgressStep: number
  trailersUploadProgressStep: number
  driversUploadProgressStep: number

  sub: Subscription

  constructor(
    private companyService: CompanyService,
    private truckService: TruckService,
    private trailerService: TrailerService,
    private driverService: DriverService,
    private employeeService: EmployeeService,
    private ngxCsvParser: NgxCsvParser,
    private cdr: ChangeDetectorRef,
    private createCsvService: CreateCsvService
  ) { }

  ngOnInit() {
    this.header = true;
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  uploadCompaniesCsv($event: any): void {
    const files = $event.target.files;
    this.fileChangeListener(files).then(() => {
      this.companies = this.csvRecords
      this.cdr.detectChanges();
    });
  }
  async uploadCompaniesCsvToDb() {
    this.companiesUploadProgress = 0;
    this.companiesUploadProgressStep = 100 / this.companies.length
    for (let i = 0; i < this.companies.length; i++) {
      this.companiesUploadProgress = +this.companiesUploadProgress + this.companiesUploadProgressStep
      await this.companyService.createCompany(this.companies[i]).then(res => {
      })
    }
  }
  async updateCompaniesFromCsv() {
    this.companiesUploadProgress = 0;
    this.companiesUploadProgressStep = 100 / this.companies.length
    for (let i = 0; i < this.companies.length; i++) {
      await this.companyService.updateCompany(this.companies[i]);
      this.companiesUploadProgress = +this.companiesUploadProgress + this.companiesUploadProgressStep
    }
  }

  async downloadCompaniesFromDb() {
    this.sub = this.companyService.readAllCompany().subscribe(res => {
      this.companies = res;
      this.cdr.detectChanges();
      this.sub.unsubscribe();
      this.createCsvService.downloadFile(res, 'companies', this.companyFields);
    });
  }

  deleteCompaniesFromDb() {
    this.sub = this.companyService.readAllCompany().subscribe(res => {
      this.companies = res;
      this.cdr.detectChanges();
      this.sub.unsubscribe();
      this.companiesUploadProgress = 0;
      this.companiesUploadProgressStep = 100 / this.companies.length
      for (let i = 0; i < this.companies.length; i++) {
        this.companyService.deleteCompany(this.companies[i]).then(() => {
          this.companiesUploadProgress = +this.companiesUploadProgress + this.companiesUploadProgressStep
        });
      }
    });
  }

  uploadTrucksCsv($event: any): void {
    const files = $event.target.files;
    this.fileChangeListener(files).then(() => {
      this.trucks = this.csvRecords
      console.log('2 - this.csvRecords', this.csvRecords);
      this.cdr.detectChanges();
    });
  }

  async uploadTrucksCsvToDb() {
    this.trucksUploadProgress = 0;
    this.trucksUploadProgressStep = 100 / this.trucks.length
    for (let i = 0; i < this.trucks.length; i++) {
      this.trucksUploadProgress = +this.trucksUploadProgress + this.trucksUploadProgressStep
      const newTruck: TruckInterface = this.trucks[i];
      newTruck.start = Number(this.trucks[i].start);
      newTruck.end = Number(this.trucks[i].end);
      newTruck.year = Number(this.trucks[i].year);
      newTruck.dotInspectionExpiration = Number(this.trucks[i].dotInspectionExpiration);
      newTruck.platesExpirationDate = Number(this.trucks[i].platesExpirationDate);
      newTruck.insuranceExpirationDate = Number(this.trucks[i].insuranceExpirationDate);
      newTruck.lat = Number(this.trucks[i].lat);
      newTruck.lng = Number(this.trucks[i].lng);
      console.log('newTruck', newTruck);
      this.truckService.createTruck(newTruck).then(res => {
        console.log('newTruck created', res);
      })
      this.cdr.detectChanges();
    }
  }

  downloadTrucksFromDb() {
    this.sub = this.truckService.readAllTruck().subscribe(res => {
      this.trucks = res;
      this.createCsvService.downloadFile(res, 'truck', this.truckFields);
      this.sub.unsubscribe();
      this.cdr.detectChanges();
    });
  }

  deleteTrucksFromDb() {
    this.sub = this.truckService.readAllTruck().subscribe(res => {
      this.trucks = res;
      this.sub.unsubscribe();
      this.trucksUploadProgress = 0;
      this.trucksUploadProgressStep = 100 / this.trucks.length
      for (let i = 0; i < this.trucks.length; i++) {
        console.log('truck deleted', this.trucks[i].id);
        this.truckService.deleteCompanyTruck(this.trucks[i])
        this.trucksUploadProgress = +this.trucksUploadProgress + this.trucksUploadProgressStep
      }
    });
  }

  uploadTrailersCsv($event: any): void {
    const files = $event.target.files;
    this.fileChangeListener(files).then(() => {
      this.trailers = this.csvRecords
      console.log('2 - this.trailers', this.trailers);
      this.cdr.detectChanges();
    });
  }
  async uploadTrailersCsvToDb() {
    this.trailersUploadProgress = 0;
    this.trailersUploadProgressStep = 100 / this.trailers.length
    for (let i = 0; i < this.trailers.length; i++) {
      this.trailersUploadProgress = +this.trailersUploadProgress + this.trailersUploadProgressStep
      const newTrailer = this.trailers[i]
      newTrailer.isActive = true;
      newTrailer.length = Number(this.trailers[i].length);
      newTrailer.carryWeight = Number(this.trailers[i].carryWeight);
      console.log('0000000 - this.csvRecords', newTrailer);
      this.trailerService.createTrailer(newTrailer).then(res => {
        console.log('newTruck created', res);
      })
      this.cdr.detectChanges();
    }
  }
  downloadTrailersFromDb() {
    this.sub = this.trailerService.readAllCompanyTrailer('bMNgTD76iZADfjm4PjOR').subscribe(res => {
      this.trailers = res;
      this.createCsvService.downloadFile(res, 'trailer', this.trailerFields);
      this.sub.unsubscribe();
      this.cdr.detectChanges();
    });
  }

  async deleteTrailersFromDb() {
    this.trailersUploadProgress = 0;
    this.trailersUploadProgressStep = 100 / this.trailers.length
    this.sub = this.trailerService.readAllCompanyTrailer('bMNgTD76iZADfjm4PjOR').subscribe(res => {
      this.trucksUploadProgress = 0;
      this.trucksUploadProgressStep = 100 / this.trailers.length
      for (let i = 0; i < res.length; i++) {
        console.log('trailer deleted', this.trailers[i].id);
        this.trailerService.deleteCompanyTrailer(this.trailers[i]);
        this.trailersUploadProgress = +this.trailersUploadProgress + this.trailersUploadProgressStep
      }
      this.sub.unsubscribe();
      this.cdr.detectChanges();
    });
  }

  uploadDriversCsv($event: any): void {
    const files = $event.target.files;
    this.fileChangeListener(files).then(() => {
      this.drivers = this.csvRecords
      console.log('2 - this.csvRecords', this.csvRecords);
      this.cdr.detectChanges();
    });
  }
  async uploadDriversCsvToDb() {
    this.driversUploadProgress = 0;
    this.driversUploadProgressStep = 100 / this.drivers.length
    for (let i = 0; i < this.drivers.length; i++) {
      this.driversUploadProgress = +this.driversUploadProgress + this.driversUploadProgressStep
      const newDriver: DriverInterface = this.drivers[i]
      newDriver.isSendEmail = true;
      newDriver.isSendTextMessage = true;
      newDriver.hireDate = Number(this.drivers[i].hireDate);
      newDriver.terminationDate = Number(this.drivers[i].terminationDate);
      newDriver.yearsOfExperiece = Number(this.drivers[i].yearsOfExperiece);
      newDriver.dateOfBirth = Number(this.drivers[i].dateOfBirth);
      newDriver.cdlExpirationDate = Number(this.drivers[i].cdlExpirationDate);
      console.log('0000000 - this.csvRecords', newDriver);
      this.driverService.createDriver(newDriver).then(res => {
        console.log('newDriver created', res);
      })
      this.cdr.detectChanges();
    }
  }

  async downloadDriversFromDb() {
    this.sub = this.driverService.readAllDrivers().subscribe(res => {
      this.drivers = res;
      this.createCsvService.downloadFile(res, 'drivers', this.driverFields);
      this.sub.unsubscribe();
      this.cdr.detectChanges();
    });
  }

  async deleteDriversFromDb() {
    this.driversUploadProgress = 0;
    this.driversUploadProgressStep = 100 / this.drivers.length
    this.sub = this.driverService.readAllDrivers().subscribe(res => {
      this.driversUploadProgress = 0;
      this.driversUploadProgressStep = 100 / this.drivers.length
      for (let i = 0; i < res.length; i++) {
        console.log('drivers deleted', this.drivers[i].id);
        this.driverService.deleteCompanyDriver(this.drivers[i]);
        this.driversUploadProgress = +this.driversUploadProgress + this.driversUploadProgressStep
      }
      this.sub.unsubscribe();
      this.cdr.detectChanges();
    });
  }
  
  async fileChangeListener(files: any) {
    this.header = (this.header as unknown as string) === 'true' || this.header === true;
    await this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ';' })
      .pipe().subscribe((result: Array<any>) => {
        // console.log('Result', result);
        this.csvRecords.push(...result);
      }, (error: NgxCSVParserError) => {
        // console.log('Error', error);
      });
    // console.log('1 - this.csvRecords', this.csvRecords);
    return this.csvRecords;
  }
}
