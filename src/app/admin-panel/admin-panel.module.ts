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
import {AdminPanelRoutingModule} from "./admin-panel-routing.module";
import { UsersListComponent } from './users-list/users-list.component';
import { UserEditModalComponent } from './user-edit-modal/user-edit-modal.component';
import { AdminInfoPanelComponent } from './admin-info-panel/admin-info-panel.component';
import { AdminUserEditComponent } from './admin-user-edit/admin-user-edit.component';
import { ParserPageComponent } from './parser-page/parser-page.component';


@NgModule({
    imports: [
        CommonModule,
        AdminPanelRoutingModule,
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
  
    UsersListComponent,
       UserEditModalComponent,
       AdminInfoPanelComponent,
       AdminUserEditComponent,
       ParserPageComponent
  ]
})
export class AdminPanelModule { }
