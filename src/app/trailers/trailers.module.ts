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
import {TrailerInfoComponent} from './trailer-info/trailer-info.component';
import {TrailersListComponent} from './trailers-list/trailers-list.component';
import {CreateTrailerComponent} from './create-trailer/create-trailer.component';
import {TrailersRoutingModule} from './trailers-routing.module';
import { EditPageComponent } from './edit-trailer-page/edit-trailer-page.component';


@NgModule({
    imports: [
        CommonModule,
        TrailersRoutingModule,
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
    TrailerInfoComponent,
    TrailersListComponent,
    CreateTrailerComponent,
    EditPageComponent,
  ]
})
export class TrailersModule { }
