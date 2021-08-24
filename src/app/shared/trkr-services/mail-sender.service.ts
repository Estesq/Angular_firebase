import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToasterTranslationServices } from '../services/toaster-translation.services';
import { MessageInterface } from '../models/message.interface';
import { AngularFireFunctions } from '@angular/fire/functions';
import { map } from 'rxjs/operators';
import { types } from '../constants/constants';

@Injectable({providedIn: 'root'})

export class MailSenderService {
    public currentLang: string;
    public uId: string;

    constructor(
        public afs: AngularFirestore,
        private fns: AngularFireFunctions,
        public translate: TranslateService,
        private toasterTranslationServices: ToasterTranslationServices,
    ) {
        this.currentLang = localStorage.getItem('language');
        this.uId = localStorage.getItem('id');
    }

    private sendEmail(data: MessageInterface) {
        const param = {
            email: data.receiverEmail,
            subjet: data.subject,
            text: data.content,
            htmlBody: this.makeHTMLForEmail(data),
        }
        var sendEmail = this.fns.httpsCallable('sendEmail');
        return sendEmail(param).toPromise();
    }

    private makeHTMLForEmail(data: MessageInterface) {
        return "";
    }

    private async saveEmailHistory(history: MessageInterface) {
        await this.afs.collection(types.message).add(history).then(res => {
            this.toasterTranslationServices.successfullyCreated();
            return console.log('history created', res.id);
        })
    }

    async sendAndSaveEmail(data: MessageInterface) {
        return this.sendEmail(data)
            .then(async (res: any) => {
                if (res.success) 
                    await this.saveEmailHistory(data);
                return res;
            })
            .catch((err: any) => err)
    }

    readEmailsByReceiverId(userId: string) {
        const collection = this.afs.collection(types.message, ref => ref
            .where('receiverId', '==', userId));
        const docs = collection.snapshotChanges().pipe(map(changes => {
            return changes.map(a => {
                const dataType = a.payload.doc.data() as MessageInterface;
                dataType.id = a.payload.doc.id;
                return dataType;
            });
        }));
        return docs
    }  
}