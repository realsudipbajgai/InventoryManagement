import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<any>(undefined);
  toast$ = this.toastSubject.asObservable();

  show(toastType:string,message:string) {
    this.toastSubject.next({toastType,message});
  }
}
