import {AngularFirestore} from '@angular/fire/firestore';
import {TranslateService} from '@ngx-translate/core';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {types} from '../constants/constants';
import {UserInterface} from '../models/user.interface';
import {ToasterTranslationServices} from '../services/toaster-translation.services';


@Injectable({providedIn: 'root'})

export class AdminService {

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

  async createUser (data: UserInterface) {
    this.afs.collection(types.user).doc(data.uId).set(data).then(() => {
      this.toasterTranslationServices.successfullyCreated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
  }
  readAllUsers () {
    const collection = this.afs.collection(types.user)
    const docs = collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const dataType = a.payload.doc.data() as UserInterface;
        dataType.id = a.payload.doc.id;
        return dataType;
      });
    }));
    return docs
  }

  readAdmins () {
    // const collection = this.afs.collection(types.user);
    const collection = this.afs.collection(types.user, ref => ref
      .where('role', '==', 'admin'));
    const docs = collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const dataType = a.payload.doc.data() as UserInterface;
        dataType.id = a.payload.doc.id;
        return dataType;
      });
    }));
    return docs
  }

  async readUserById (id: string) {
    const docRef = this.afs.collection(types.user).doc(id)
    const doc = await docRef.ref.get();
    if (doc.exists) {
      return doc.data() as UserInterface;
    } else {
      return null;
    }
  }

  async updateUser(data: UserInterface) {
    await this.afs.collection(types.user).doc(data.id).set(data, { merge: true }).then(() => {
      this.toasterTranslationServices.successfullyUpdated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
    return
  }

  async deleteUser(data: UserInterface) {
    await this.afs.collection(types.user).doc(data.id).delete().then(() => {
      this.toasterTranslationServices.successfullyDeleted('User');
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    });
    return
  }
}
