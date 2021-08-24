import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatchHeightModule } from "../shared/directives/match-height.directive";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SharedModule } from "../shared/shared.module";
import { EditComponent } from "./edit/edit.component";
import { InfoComponent } from "./info/info.component";
import { ListComponent } from "./list/list.component";
import { ClientsRoutingModule } from "./clients-routing.module";
import { EditPageComponent } from "./edit-page/edit-page.component";
import { PipeModule } from "../shared/pipes/pipe.module";
import { CreateComponent } from "./create/create.component";
import { ClinetsListComponent } from "./clinets-list/clinets-list.component";
import { ClientInfoComponent } from "./client-info/client-info.component";
import { ClientCreateComponent } from "./client-create/client-create.component";
import { ClientEditComponent } from "./client-edit/client-edit.component";
import { InviteUserComponent } from "./invite-user/invite-user.component";
import { InviteClientComponent } from "./invite-client/invite-client.component";

@NgModule({
  imports: [
    CommonModule,
    ClientsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatchHeightModule,
    RouterModule,
    TranslateModule,
    NgbModule,
    NgSelectModule,
    SharedModule,
    PipeModule,
  ],
  declarations: [
    EditComponent,
    InfoComponent,
    ListComponent,
    EditPageComponent,
    CreateComponent,
    ClinetsListComponent,
    ClientInfoComponent,
    ClientCreateComponent,
    ClientEditComponent,
    InviteUserComponent,
    InviteClientComponent,
  ],
})
export class ClientsModule {}
