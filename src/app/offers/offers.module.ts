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
import {OfferInfoComponent} from './offer-info/offer-info.component';
import {OffersListComponent} from './offers-list/offers-list.component';
import {CreateOfferComponent} from './create-offer/create-offer.component';
import {OffersRoutingModule} from './offers-routing.module';
import { EditPageComponent } from './edit-offer-page/edit-offer-page.component';
import {ListPageComponent} from './offer-list-page/offer-list-page.component';


@NgModule({
  imports: [
    CommonModule,
    OffersRoutingModule,
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
    OfferInfoComponent,
    OffersListComponent,
    CreateOfferComponent,
    EditPageComponent,
    ListPageComponent,
  ]
})
export class OffersModule { }
