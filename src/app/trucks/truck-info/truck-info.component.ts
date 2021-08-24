import {Component, OnInit, ChangeDetectorRef, Input, OnChanges} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TruckInterface} from '../../shared/models/truck.interface';
import {TruckService} from '../../shared/trkr-services/truck.service';
import {localStorageTypes} from '../../shared/constants/constants';

@Component({
  selector: 'app-truck-info',
  templateUrl: './truck-info.component.html',
  styleUrls: ['./truck-info.component.scss']
})
export class TruckInfoComponent implements OnInit {

  @Input() data: TruckInterface

  truckStatus
  truck: TruckInterface;
  companyId: string;

  constructor(
    private truckService: TruckService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.truck = this.data;
    // console.log('truck in info panel', this.truck);
    this.cdr.detectChanges();
  }

  changeTruckStatus(status: string) {
    this.truckStatus = status
  }
  async ngOnChanges(changes: string) {
    this.truck = this.data;
    console.log('truck in info panel', this.truck);
    this.cdr.detectChanges();
  }
}
