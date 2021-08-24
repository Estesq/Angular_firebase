import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { types } from '../constants/constants';
import { ToasterTranslationServices } from '../services/toaster-translation.services';
import { EmployeeInterface } from '../models/company-employee.interface';

@Injectable({ providedIn: 'root' })

export class EmployeeService {
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

  async createEmployee(data: EmployeeInterface, type: string = "staff") {
    this.afs.collection(types.company).doc(data.companyId)
      .collection(types[type]).doc(data.uId)
      .set(data).then(() => {
        this.toasterTranslationServices.successfullyCreated();
      }).catch((error) => {
        this.toasterTranslationServices.gotSomeError(error);
      });
  }

  readAllUserEmployee(companyId: string, type: string = "staff") {
    const collection = this.afs.collection(types.company).doc(companyId).collection(types[type])
    const docs = collection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const dataType = a.payload.doc.data() as EmployeeInterface;
        dataType.id = a.payload.doc.id;
        return dataType;
      });
    }));
    return docs
  }

  async readUserEmployeeById(companyId: string, employeeId: string, type: string = "staff") {
    const docRef = await this.afs.collection(types.company).doc(companyId).collection(types[type]).doc(employeeId)
    const doc = await docRef.ref.get();
    if (doc.exists) {
      return doc.data() as EmployeeInterface;
    } else {
      return null;
    }
  }

  async updateUserEmployee(data: EmployeeInterface, type: string = "staff") {
    await this.afs.collection(types.company).doc(data.companyId).collection(types[type]).doc(data.uId).set(data, { merge: true }).then(() => {
      this.toasterTranslationServices.successfullyUpdated();
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
    return
  }

  async deleteUserEmployee(data: EmployeeInterface, type: string = "staff") {
    await this.afs.collection(types.company).doc(data.companyId).collection(types[type]).doc(data.id).delete().then(() => {
      this.toasterTranslationServices.successfullyDeleted(type.toUpperCase());
    }).catch((error) => {
      this.toasterTranslationServices.gotSomeError(error);
    })
    return
  }
}
