import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { types } from '../constants/constants';
import { ToasterTranslationServices } from '../services/toaster-translation.services';
import { PostingCardInterface } from '../models/posting-card.interface';

@Injectable({ providedIn: 'root' })

export class PostingService {
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

  async createPosting(data: PostingCardInterface) {
    await this.afs.collection(types.posting).add(data).then(res => {
      this.afs.collection(types.company).doc(data.companyId).collection(types.posting).doc(res.id).set(data);
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
  }
  async readAllCompanyPosting(companyId: string) {
    const collection = this.afs.collection(types.company).doc(companyId).collection(types.posting)
    const docs = collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const dataType = a.payload.doc.data() as PostingCardInterface;
        dataType.id = a.payload.doc.id;
        return dataType;
      });
    }));
    return docs
  }

  readAllPosting() {
    const collection = this.afs.collection(types.posting)
    const docs = collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const dataType = a.payload.doc.data() as PostingCardInterface;
        dataType.id = a.payload.doc.id;
        return dataType;
      });
    }));
    return docs
  }

  async readCompanyPostingById(companyId: string, id: string) {
    const docRef = await this.afs.collection(types.company).doc(companyId).collection(types.posting).doc(id)
    const doc = await docRef.ref.get();
    if (doc.exists) {
      return doc.data() as PostingCardInterface;
    } else {
      return null;
    }
  }

  async updateUserPosting(data: PostingCardInterface) {
    await this.afs.collection(types.posting).doc(data.companyId).set(data).then(() => {
      this.afs.collection(types.company).doc(data.companyId).collection(types.posting).doc(data.id).set(data);
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
    return
  }

  async deleteUserPosting(data: PostingCardInterface) {
    await this.afs.collection(types.posting).doc(data.companyId).delete().then(() => {
      this.afs.collection(types.company).doc(data.companyId).collection(types.posting).doc(data.id).delete();
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
  }
}
