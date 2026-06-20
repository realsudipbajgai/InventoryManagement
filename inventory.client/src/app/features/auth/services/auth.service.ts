import { Injectable,inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../../../shared/services/config.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  _config=inject(ConfigService);
  _http=inject(HttpClient)

  login(user:any):Observable<any>{
    return this._http.post(this._config.serverUrl+'/auth/login',user);
  }
}
