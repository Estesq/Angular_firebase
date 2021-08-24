import {AngularFirestore} from '@angular/fire/firestore';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {types} from '../constants/constants';
import {TrailerInterface} from '../models/trailer.interface';
import {ToasterTranslationServices} from '../services/toaster-translation.services';

@Injectable({providedIn: 'root'})

export class TrailerService {

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

  async createTrailer (data: TrailerInterface) {
    this.afs.collection(types.company).doc(data.companyId).collection(types.trailer).add(data).then(() => {
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }

  readAllCompanyTrailer (companyId: string) {
    const collection = this.afs.collection(types.company).doc(companyId).collection(types.trailer)
    // return  collection.snapshotChanges().pipe(map(changes => {
    //   return changes.map(a => {
    //     const dataType = a.payload.doc.data() as TrailerInterface;
    //     dataType.id = a.payload.doc.id;
    //     return dataType;
    //   });
    // }));
    return collection.get().pipe(map(changes => {
      return changes.docs.map(a => {
        const dataType = a.data() as TrailerInterface;
        dataType.id = a.id;
        return dataType;
      });
    }));
  }

  async readCompanyTrailerById (companyId: string, trailerId: string) {
    const docRef = await this.afs.collection(types.company).doc(companyId).collection(types.trailer).doc(trailerId)
    const doc = await docRef.ref.get();
    if (doc.exists) {
      return doc.data() as TrailerInterface;
    } else {
      return null;
    }
  }

  async updateCompanyTrailer(data: TrailerInterface) {
    await this.afs.collection(types.company).doc(data.companyId)
      .collection(types.trailer).doc(data.id).set(data, { merge: true }).then(() => {
      this.toasterTranslationServices.successfullyUpdated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
    return
  }

  async deleteCompanyTrailer(data: TrailerInterface) {
    await this.afs.collection(types.company).doc(data.companyId).collection(types.trailer).doc(data.id).delete().then(() => {
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
  }
}
