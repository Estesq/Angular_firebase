import {Component, ChangeDetectorRef, EventEmitter, OnInit} from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import {TrailerInterface} from '../../shared/models/trailer.interface';
import {UserInterface} from '../../shared/models/user.interface';
import { Subscription } from 'rxjs';
import {TrailerService} from '../../shared/trkr-services/trailer.service';
import {localStorageTypes} from '../../shared/constants/constants';
import {TruckInterface} from '../../shared/models/truck.interface';

@Component({
  selector: 'app-trailers-list',
  templateUrl: './trailers-list.component.html',
  styleUrls: ['./trailers-list.component.scss']
})
export class TrailersListComponent implements OnInit {

  loading = true;
  subscription: Subscription;
  data: TrailerInterface[];
  // selectedTrailer: TrailerInterface = {}
  selected = new EventEmitter<string>();
  selectedId;
  trailerStatus;
  id;
  currentUser: UserInterface;
  selectedTrailer: TrailerInterface;
  companyId: string
  activeTrailer: any;

  constructor(
    private trailerService: TrailerService,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
  ) { }

  async ngOnInit() {
    this.companyId = 'bMNgTD76iZADfjm4PjOR'
    this.subscription = this.trailerService.readAllCompanyTrailer(this.companyId).subscribe(res => {
      this.data = res;
      this.selectedTrailer = this.data[0]
      this.cdr.detectChanges();
    })
  }


  async deleteTrailer(trailer: TrailerInterface) {
    this.trailerService.deleteCompanyTrailer(trailer).then(() => {
      this.data = this.data.filter(trailers => trailers.id !== trailer.id)
    })
  }

  onSelect(id: string) {
    this.selected.emit(id);
  }

  selectTrailerByStatus(status: string) {
    this.trailerStatus = status;
  }
  selectedTrailerForInfo(trailer: TrailerInterface) {
    this.selectedTrailer = trailer;
    this.cdr.detectChanges();
    console.log('truck selected truck', trailer);
    console.log('truck selected this.selectedTruck', this.selectedTrailer);
  }

  selectId(trailer: TrailerInterface) {
    console.log('selected trailer', trailer);
    this.selectedTrailer = trailer;
    this.activeTrailer = trailer;
  }
}
