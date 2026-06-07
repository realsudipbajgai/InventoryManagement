import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../../shared/models/User';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl=`${environment.apiUrl}/users`;
  constructor(private http:HttpClient){}

  //Get All Users
  getAllUsers():Observable<User[]>{
     return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user:User):Observable<User>{
    console.log('inside service:',user);
    const formData=new FormData();
    formData.append('name',user.name);
    formData.append('email',user.email);
    formData.append('phone',user.phone);
    formData.append('role',user.role);
    formData.append('age',user.age.toString());
    formData.append('address',user.address);
    formData.append('photoPath',user.photoPath);
    return this.http.post<User>(this.apiUrl,formData);
  }

}
