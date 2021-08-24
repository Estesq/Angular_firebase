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
import {DriverInfoComponent} from './driver-info/driver-info.component';
import {DriversListComponent} from './drivers-list/drivers-list.component';
import {CreateDriverComponent} from './create-driver/create-driver.component';
import {DriversRoutingModule} from './drivers-routing.module';
import { EditPageComponent } from './edit-driver-page/edit-driver-page.component';


@NgModule({
    imports: [
        CommonModule,
        DriversRoutingModule,
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
    DriverInfoComponent,
    DriversListComponent,
    CreateDriverComponent,
    EditPageComponent,
  ]
})
export class DriversModule { }
