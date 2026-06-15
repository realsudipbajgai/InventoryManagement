import { Injectable,inject } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import { ConfigService } from '../../../shared/services/config.service';
import { Category } from '../../../shared/models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  configService=inject(ConfigService);
  httpClient=inject(HttpClient);

  getAllCategories():Observable<any>{
    return this.httpClient.get<any>(this.configService.serverUrl+'/categories')
  }

  addCategory(category:Category):Observable<any>{
    return this.httpClient.post<any>(this.configService.serverUrl+'/categories',category)
  }
}
