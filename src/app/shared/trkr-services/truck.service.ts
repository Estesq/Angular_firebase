import {AngularFirestore} from '@angular/fire/firestore';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {types} from '../constants/constants';
import {TruckInterface} from '../models/truck.interface';
import {ToasterTranslationServices} from '../services/toaster-translation.services';

@Injectable({providedIn: 'root'})

export class TruckService {

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

  async createTruck (data: TruckInterface) {
    this.afs.collection(types.company).doc(data.companyId).collection(types.truck).add(data).then(res => {
      this.toasterTranslationServices.successfullyCreated();
      return console.log('Truck created', res.id);
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }
  readAllCompanyTruck (companyId: string) {
    const collection = this.afs.collection(types.company).doc(companyId).collection(types.truck)
    return collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const dataType = a.payload.doc.data() as TruckInterface;
        dataType.id = a.payload.doc.id;
        return dataType;
      });
    }));
  }

  readAllTruck () {
    const collection = this.afs.collection(types.truck)
    return collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const dataType = a.payload.doc.data() as TruckInterface;
        dataType.id = a.payload.doc.id;
        return dataType;
      });
    }));
  }

  async readCompanyTruckById (data: TruckInterface) {
    // console.log('readCompanyTruckById data', data);
    const docRef = this.afs.collection(types.company).doc(data.companyId).collection(types.truck).doc(data.id);
    const doc = await docRef.ref.get()
    if (doc.exists) {
      return doc.data();
    } else {
      return null;
    }
  }

  async updateCompanyTruck(data: TruckInterface) {
    await this.afs.collection(types.company).doc(data.companyId)
      .collection(types.truck).doc(data.id)
      .set(data).then(() => {
      this.toasterTranslationServices.successfullyUpdated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
    return
  }

  async deleteCompanyTruck(data: TruckInterface) {
    this.afs.collection(types.company).doc(data.companyId).collection(types.truck).doc(data.id).delete().then(() => {
      this.toasterTranslationServices.successfullyDeleted('Truck');
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }
}
