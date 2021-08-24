import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatchHeightModule} from '../shared/directives/match-height.directive';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgSelectModule} from '@ng-select/ng-select';
import {SharedModule} from '../shared/shared.module';
import {InfoComponent} from './info/info.component';
import {ListComponent} from './list/list.component';
import {CompanyRoutingModule} from './company-routing.module';
import { EditPageComponent } from './edit-page/edit-page.component';
import {PipeModule} from '../shared/pipes/pipe.module';
import { CreateComponent } from './create/create.component';


@NgModule({
    imports: [
        CommonModule,
        CompanyRoutingModule,
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
    InfoComponent,
    ListComponent,
    EditPageComponent,
    CreateComponent
  ]
})
export class CompanyModule { }
