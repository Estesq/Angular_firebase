import {AngularFirestore} from '@angular/fire/firestore';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

import {types} from '../constants/constants';
import {CompanyInterface} from '../models/company.interface';
import {ToasterTranslationServices} from '../services/toaster-translation.services';
import {UserInterface} from '../models/user.interface';


@Injectable({providedIn: 'root'})

export class CompanyService {

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

  async createCompany (data: UserInterface) {
    this.afs.collection(types.company).doc(data.uId).set(data).then(res => {
      console.log('company created', res);
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }
  readAllCompany () {
    const collection = this.afs.collection(types.company)
    const docs = collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as CompanyInterface;
        data.id = a.payload.doc.id;
        // console.log('readAllUserCompany data', data);
        return data;
      });
    }));
    return docs
  }

  async readCompanyById (id: string) {
    const docRef = await this.afs.collection(types.company).doc(id)
    const doc = await docRef.ref.get();
    if (doc.exists) {
      const data = doc.data() as CompanyInterface;
      data.id = doc.id;
      return data;
    } else {
      return null;
    }
  }

  async updateCompany(data: CompanyInterface) {
    await this.afs.collection(types.company).doc(data.id).set(data, { merge: true }).then(() => {
      this.afs.collection(types.user).doc(data.uId).collection(types.company).doc(data.id).set(data);
      this.toasterTranslationServices.successfullyUpdated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
  }

  async deleteCompany(data: CompanyInterface) {
    this.afs.collection(types.company).doc(data.id).delete().then(() => {
      this.toasterTranslationServices.successfullyDeleted('Company' + data.id + 'deleted');
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
    return
  }
}
