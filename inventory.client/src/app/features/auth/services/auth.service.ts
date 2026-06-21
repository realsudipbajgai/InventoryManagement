import { Injectable,inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable,BehaviorSubject } from 'rxjs';
import { ConfigService } from '../../../shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  _config=inject(ConfigService);
  _http=inject(HttpClient)

  loggedInSubject=new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$= this.loggedInSubject.asObservable();

  login(user:any):Observable<any>{
    return this._http.post(this._config.serverUrl+'/auth/login',user);
  }

  setLogin(token:string){
    localStorage.setItem('jwtToken',token);
    this.loggedInSubject.next(true);
  }

  isLoggedIn():boolean{
   return this.hasToken();
  }

  hasToken():boolean{
    return !!localStorage.getItem('jwtToken') //returns true if exists
  }

  logout(){
    localStorage.removeItem('jwtToken');
    this.loggedInSubject.next(false);
  }
}
