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

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`)
  }

  addUser(user: User): Observable<User> {
    const formData = new FormData();
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('role', user.role);
    if (user.age != null) {
      formData.append('age', user.age.toString());
    }
    if (user.address) {
      formData.append('address', user.address);
    }
    if (user.photoPath) {
      formData.append('photoPath', user.photoPath);
    }
    return this.http.post<User>(this.apiUrl, formData);
  }

  updateUser(id:number,user: User): Observable<User> {
    const formData = new FormData();
    formData.append('id',id.toString());
    formData.append('name', user.name);
    formData.append('email', user.email);
    formData.append('phone', user.phone);
    formData.append('role', user.role);
    if (user.age != null) {
      formData.append('age', user.age.toString());
    }
    if (user.address) {
      formData.append('address', user.address);
    }
    if (user.photoPath) {
      formData.append('photoPath', user.photoPath);
    }

    return this.http.put<User>(this.apiUrl,formData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  seedTestUsers(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/seedtestusers`, {});
  }

}
