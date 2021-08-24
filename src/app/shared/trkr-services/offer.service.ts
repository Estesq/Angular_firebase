import { AngularFirestore } from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { types } from '../constants/constants';
import { ToasterTranslationServices } from '../services/toaster-translation.services';
import { OffersInterface } from '../models/offers.interface';

@Injectable({ providedIn: 'root' })

export class OfferService {
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

  async createOffer(data: OffersInterface) {
    await this.afs.collection(types.offer).add(data).then((res: any) => {
      this.afs.collection(types.company).doc(data.companyId).collection(types.offer).doc(res.id).set(data);
      this.toasterTranslationServices.successfullyCreated();
      return console.log('Offer created', res.id);
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
  }

  readAllCompanyOffer(companyId: string) {
    const collection = this.afs.collection(types.company).doc(companyId).collection(types.offer)
    return collection.get().pipe(map((changes: any) => {
      return changes.docs.map((a: any) => {
        const dataType = a.data() as OffersInterface;
        dataType.id = a.id;
        return dataType;
      });
    }));
  }

  readAllOffer() {
    const collection = this.afs.collection(types.offer)
    return collection.get().pipe(map((changes: any) => {
      console.log("changes count =>", changes.docs[0].data());
      return changes.docs.map((a: any) => {
        const dataType = a.data() as OffersInterface;
        dataType.id = a.id;
        return dataType;
      });
    }));
  }

  async readCompanyOfferById(data: OffersInterface) {
    const docRef = await this.afs.collection(types.company).doc(data.companyId).collection(types.offer).doc(data.id)
    const doc = await docRef.ref.get();
    if (doc.exists) {
      return doc.data() as OffersInterface;
    } else {
      return null;
    }
  }

  async updateCompanyOffer(data: OffersInterface) {
    await this.afs.collection(types.offer).doc(data.id).set(data, { merge: true }).then(() => {
      this.afs.collection(types.company).doc(data.companyId).collection(types.offer).doc(data.id).set(data, { merge: true });
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error: any) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
    return
  }

  async deleteCompanyOffer(data: OffersInterface) {
    await this.afs.collection(types.offer).doc(data.id).delete().then(() => {
      this.afs.collection(types.company).doc(data.companyId).collection(types.offer).doc(data.id).delete().then(() => {
        this.toasterTranslationServices.successfullyDeleted('Offer');
      }).catch((error) => {
        this.toasterTranslationServices.gotSomeError(error);
      });
    });
  }
}
