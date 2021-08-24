import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TruckInterface} from '../../shared/models/truck.interface';
import {CreatePostingCardModalComponent} from '../../trucks/create-posting-card-modal/create-posting-card-modal.component';
import {LoadInterface} from '../../shared/models/load.interface';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EditLoadInfoSectionComponent} from '../edit-load-info-section/edit-load-info-section.component';


@Component({
  selector: 'app-trip-info-page',
  templateUrl: './trip-info-page.component.html',
  styleUrls: ['./trip-info-page.component.scss']
})
export class TripInfoPageComponent implements OnInit {

  load: LoadInterface;
  id = 1;

  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }
  editLoad(load: LoadInterface) {
    const modalRef = this.modalService.open(EditLoadInfoSectionComponent, { size: 'lg'});
    modalRef.componentInstance.id = this.id; // should be the id
    modalRef.componentInstance.data = this.load;
    modalRef.result.then((result) => {
      console.log(result);
    });
  }
}
