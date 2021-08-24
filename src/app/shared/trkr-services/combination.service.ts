import {AngularFirestore} from '@angular/fire/firestore';
import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import {types} from '../constants/constants';
import {ToasterTranslationServices} from '../services/toaster-translation.services';
import {TruckInterface} from '../models/truck.interface';


@Injectable({providedIn: 'root'})

export class CombinationService {

/*
  The service for the combination of Truck Drivers and trailers is designed to select only the truck in the necessary components.
  For example offers or loads
*/

  public currentLang: string;
  public uId: string;

  public user = 'user';
  public templates = 'templates';


  constructor(
    public afs: AngularFirestore,
    public translate: TranslateService,
    private toasterTranslationServices: ToasterTranslationServices,
  ) {
    this.currentLang = localStorage.getItem('language');
    this.uId = localStorage.getItem('id');
  }

  async updateFirstTruckDriver (data: TruckInterface) {
    this.afs.collection(types.company)
      .doc(data.companyId).collection(types.truck)
      .doc(data.id).set({driver1id: data.driver1id}, {merge: true}).then(res => {
      this.toasterTranslationServices.successfullyCreated();
      return console.log('Truck created', res);
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }

  async updateSecondTruckDriver (data: TruckInterface) {
    this.afs.collection(types.company)
      .doc(data.companyId).collection(types.truck)
      .doc(data.id).set({driver2id: data.driver2id}, {merge: true}).then(res => {
      this.toasterTranslationServices.successfullyCreated();
      return console.log('Truck created', res);
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }

  async updateFirstTruckTrailer (data: TruckInterface) {
    this.afs.collection(types.company)
      .doc(data.companyId).collection(types.truck)
      .doc(data.id).set({trailer1id: data.trailer1id}, {merge: true}).then(res => {
      this.toasterTranslationServices.successfullyCreated();
      return console.log('Truck created', res);
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }

  async updateSecondTruckTrailer (data: TruckInterface) {
    this.afs.collection(types.company)
      .doc(data.companyId).collection(types.truck)
      .doc(data.id).set({trailer2id: data.trailer2id}, {merge: true}).then(res => {
      this.toasterTranslationServices.successfullyCreated();
      return console.log('Truck created', res);
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }

  async updateThirdTruckTrailer (data: TruckInterface) {
    this.afs.collection(types.company)
      .doc(data.companyId).collection(types.truck)
      .doc(data.id).set({trailer3id: data.trailer3id}, {merge: true}).then(res => {
      this.toasterTranslationServices.successfullyCreated();
      return console.log('Truck created', res);
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }
}
