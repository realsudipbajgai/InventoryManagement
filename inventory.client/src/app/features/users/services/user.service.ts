import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/User';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }
  //Get All Users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    console.log('inside service:', user);
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('role', user.role);
    if (user.age != null) {
      formData.append('age', user.age.toString());
    }
    if(user.address){
    formData.append('address', user.address);
    }
    if(user.photoPath){
    formData.append('photoPath', user.photoPath);
    }
    return this.http.post<User>(this.apiUrl, formData);
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  seedTestUsers():Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/seedtestusers`,{});
  }
  
}
