import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../shared/models/User';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }
  //Get All Users
  getAllUsers(): Observable<ApiResponse<User[]>> {
    return this.http.get<ApiResponse<User[]>>(this.apiUrl);
  }

  getUserById(id: number): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/${id}`)
  }

  addUser(user: User,file:File|null): Observable<ApiResponse<User>> {
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
    if(file){
      formData.append('photo',file,file.name);
    }
    return this.http.post<ApiResponse<User>>(this.apiUrl, formData);
  }

  updateUser(id:number,user: User): Observable<ApiResponse<User>> {
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

    return this.http.put<ApiResponse<User>>(this.apiUrl,formData);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  seedTestUsers(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/seedtestusers`, {});
  }

}
