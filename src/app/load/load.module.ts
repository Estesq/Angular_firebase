import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatchHeightModule} from '../shared/directives/match-height.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';
import {PipeModule} from '../shared/pipes/pipe.module';
import { TripInfoPageComponent } from './trip-info-page/trip-info-page.component';
import { LoadInfoSectionComponent } from './load-info-section/load-info-section.component';
import { StopsInfoSectionComponent } from './stops-info-section/stops-info-section.component';
import { MapSectionComponent } from './map-section/map-section.component';
import { SendDriverInfoModalComponent } from './send-driver-info-modal/send-driver-info-modal.component';
import { EditLoadInfoSectionComponent } from './edit-load-info-section/edit-load-info-section.component';
import { EditTripInfoPageComponent } from './edit-trip-info-page/edit-trip-info-page.component';
import { EditMapSectionComponent } from './edit-map-section/edit-map-section.component';
import { EditStopsInfoSectionComponent } from './edit-stops-info-section/edit-stops-info-section.component';
import {LoadRoutingModule} from './load-routing.module';
import { LoadBoardComponent } from './load-board/load-board.component';


@NgModule({
    imports: [
        CommonModule,
        LoadRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatchHeightModule,
        RouterModule,
        TranslateModule,
        NgbModule,
        NgSelectModule,
        SharedModule,
        PipeModule
    ],
  declarations: [
   TripInfoPageComponent,
   LoadInfoSectionComponent,
   StopsInfoSectionComponent,
   MapSectionComponent,
   SendDriverInfoModalComponent,
   EditLoadInfoSectionComponent,
   EditTripInfoPageComponent,
   EditMapSectionComponent,
   EditStopsInfoSectionComponent,
   LoadBoardComponent
  ]
})
export class LoadModule { }
