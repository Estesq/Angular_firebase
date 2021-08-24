import {AngularFirestore} from '@angular/fire/firestore';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {types} from '../constants/constants';
import {DriverInterface} from '../models/driver.interface';
import {ToasterTranslationServices} from '../services/toaster-translation.services';


@Injectable({providedIn: 'root'})

export class DriverService {

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

  async createDriver (data: DriverInterface) {
    await this.afs.collection(types.driver).add(data).then(res => {
      this.afs.collection(types.company).doc(data.companyId).collection(types.driver).doc(res.id).set(data);
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
  }
  readAllCompanyDrivers (companyId: string) {
    const collection = this.afs.collection(types.company).doc(companyId).collection(types.driver)
    return collection.get().pipe(map(changes => {
      return changes.docs.map(a => {
        const dataType = a.data() as DriverInterface;
        dataType.id = a.id;
        return dataType;
      });
    }));
  }
  readAllDrivers () {
    const collection = this.afs.collection(types.driver)
    return collection.get().pipe(map(changes => {
      console.log("changes count =>", changes.docs[0].data());
      return changes.docs.map(a => {
        const dataType = a.data() as DriverInterface;
        dataType.id = a.id;
        return dataType;
      });
    }));
  }

  async readCompanyDriverById (data: DriverInterface) {
    const docRef = this.afs.collection(types.company).doc(data.companyId).collection(types.driver).doc(data.id)
    const doc = await docRef.ref.get();
    if (doc.exists) {
      return doc.data() as DriverInterface;
    } else {
      return null;
    }
  }

  async updateCompanyDriver(data: DriverInterface) {
    await this.afs.collection(types.company).doc(data.companyId)
      .collection(types.driver).doc(data.id)
      .set(data, { merge: true }).then(() => {
      this.toasterTranslationServices.successfullyUpdated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
    return
  }

  async deleteCompanyDriver(data: DriverInterface) {
    await this.afs.collection(types.company).doc(data.companyId).collection(types.driver).doc(data.id).delete().then(() => {
      this.toasterTranslationServices.successfullyDeleted('Driver');
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
    return
  }
}
