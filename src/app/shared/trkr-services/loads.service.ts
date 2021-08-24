import {AngularFirestore} from '@angular/fire/firestore';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {types} from '../constants/constants';
import {DriverInterface} from '../models/driver.interface';
import {ToasterTranslationServices} from '../services/toaster-translation.services';
import {LoadInterface} from '../models/load.interface';
import {StopsInterface} from '../models/stops.interface';


@Injectable({providedIn: 'root'})

export class LoadsService {

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

  async createLoad (data: LoadInterface) {
    this.afs.collection(types.company).doc(data.companyId).collection(types.load).add(data).then(() => {
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }

  readAllLoad (companyId: string) {
    const collection = this.afs.collection(types.company).doc(companyId).collection(types.load)
    return collection.get().pipe(map(changes => {
      return changes.docs.map(a => {
        const dataType = a.data() as DriverInterface;
        dataType.id = a.id;
        return dataType;
      });
    }));
  }

  async readLoadById (data: LoadInterface) {
    const docRef = this.afs.collection(types.company).doc(data.companyId).collection(types.load).doc(data.id)
    const doc = await docRef.ref.get();
    if (doc.exists) {
      return doc.data() as LoadInterface;
    } else {
      return null;
    }
  }

  async updateLoad(data: LoadInterface) {
    await this.afs.collection(types.company).doc(data.companyId)
      .collection(types.load).doc(data.id)
      .set(data, { merge: true }).then(() => {
      this.toasterTranslationServices.successfullyUpdated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
    return
  }

  async deleteLoad(data: LoadInterface) {
    await this.afs.collection(types.company).doc(data.companyId).collection(types.load).doc(data.id).delete().then(() => {
      this.toasterTranslationServices.successfullyDeleted('Driver');
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
    return
  }

  //  stops

  async createTripStop (data: StopsInterface) {
    this.afs.collection(types.company).doc(data.companyId)
      .collection(types.load).doc(data.id)
      .collection(types.stops).add(data).then(() => {
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }

  readAllTripStop (companyId: string, loadId: string) {
    const collection = this.afs.collection(types.company).doc(companyId)
      .collection(types.load).doc(loadId)
      .collection(types.stops)
    return collection.get().pipe(map(changes => {
      return changes.docs.map(a => {
        const dataType = a.data() as DriverInterface;
        dataType.id = a.id;
        return dataType;
      });
    }));
  }

  async readTripStopById (companyId: string, loadId: string, stopId: string) {
    const docRef = this.afs.collection(types.company).doc(companyId)
      .collection(types.load).doc(loadId)
      .collection(types.stops).doc(stopId)
    const doc = await docRef.ref.get();
    if (doc.exists) {
      return doc.data() as LoadInterface;
    } else {
      return null;
    }
  }

  async updateTripStop(data: StopsInterface) {
    await this.afs.collection(types.company).doc(data.companyId)
      .collection(types.load).doc(data.loadId)
      .collection(types.stops).doc(data.id)
      .set(data, { merge: true }).then(() => {
        this.toasterTranslationServices.successfullyUpdated();
      }).catch((error) => {
        this.toasterTranslationServices.gotSomeError(error);
      })
    return
  }

  async deleteTripStop(data: StopsInterface) {
    await this.afs.collection(types.company).doc(data.companyId)
      .collection(types.load).doc(data.loadId)
      .collection(types.stops).doc(data.id).delete().then(() => {
      this.toasterTranslationServices.successfullyDeleted('Driver');
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
    return
  }

}
