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
import {CreateComponent} from './create/create.component';
import { EditComponent } from './edit/edit.component';
import {CombinationRoutingModule} from './combination-routing.module';
import { TrailersListComponent } from './trailers-list/trailers-list.component';
import { DriversListComponent } from './drivers-list/drivers-list.component';
import { CombinatinsListComponent } from './combinatins-list/combinatins-list.component';
import { ListComponent } from './list/list.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


@NgModule({
    imports: [
        CommonModule,
        CombinationRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatchHeightModule,
        RouterModule,
        TranslateModule,
        NgbModule,
        NgSelectModule,
        SharedModule,
        PipeModule,
        DragDropModule
    ],
  declarations: [
    CreateComponent,
    EditComponent,
    TrailersListComponent,
    DriversListComponent,
    CombinatinsListComponent,
    ListComponent,
  ]
})
export class CombinationModule { }
