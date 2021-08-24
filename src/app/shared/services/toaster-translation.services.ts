import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';
@Injectable({providedIn: 'root'})
export class ToasterTranslationServices {
  public currentLang: string;
  constructor(
    public translate: TranslateService,
    private toastrService: ToastrService
  ) {}
  successfullyCreated(text?: string) {
    this.translate.get('TOAST.SUCCESSFULLY_CREATED').subscribe((res: string) => {
      this.toastrService.success(res + text);
    });
  }
  successfullyUpdated() {
    this.translate.get('TOAST.SUCCESSFULLY_UPDATED').subscribe((res: string) => {
      this.toastrService.success(res);
    });
  }
  successfullyDeleted(text?: string) {
    this.translate.get('TOAST.SUCCESSFULLY_DELETED').subscribe((res: string) => {
      this.toastrService.success(res + text);
    });
  }
  gotSomeError(err) {
    this.translate.get('TOAST.GET_SOME_PROBLEM').subscribe((res: string) => {
      this.toastrService.error(res + err);
    });
  }
  cantFindeDoc() {
    this.translate.get('TOAST.REQUESTED_DATA_CAN_NOT_BEEN_FOUND').subscribe((res: string) => {
      this.toastrService.error(res);
    });
  }
}
