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
import {TruckInfoComponent} from './truck-info/truck-info.component';
import {TrucksListComponent} from './trucks-list/trucks-list.component';
import {CreateTruckComponent} from './create-truck/create-truck.component';
import {TrucksRoutingModule} from './trucks-routing.module';
import { EditTruckComponent } from './edit-truck/edit-truck.component';
import { EditPageComponent } from './edit-truck-page/edit-truck-page.component';
import {TruckDriverComponent} from './truck-driver/truck-driver.component';
import {TruckTrailerComponent} from './truck-trailer/truck-trailer.component';
import { CreatePostingCardModalComponent } from './create-posting-card-modal/create-posting-card-modal.component';
import { CreateTruckModalComponent } from './create-truck-modal/create-truck-modal.component';

@NgModule({
    imports: [
        CommonModule,
        TrucksRoutingModule,
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
    TruckInfoComponent,
    TrucksListComponent,
    CreateTruckComponent,
    TruckDriverComponent,
    TruckTrailerComponent,
    EditTruckComponent,
    EditPageComponent,
    CreatePostingCardModalComponent,
    CreateTruckModalComponent
  ]
})
export class TrucksModule { }
