import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../../shared/models/Employee';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../../shared/models/ApiResponse';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/users`;
  constructor(private http: HttpClient) { }
  //Get All Users
  getAllEmployees(): Observable<ApiResponse<Employee[]>> {
    return this.http.get<ApiResponse<Employee[]>>(this.apiUrl);
  }

  getEmployeeById(id: number): Observable<ApiResponse<Employee>> {
    return this.http.get<ApiResponse<Employee>>(`${this.apiUrl}/${id}`)
  }

  addEmployee(employee: Employee,file:File|null): Observable<ApiResponse<Employee>> {
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('phone', employee.phone);
    formData.append('role', employee.role);
    if (employee.age != null) {
      formData.append('age', employee.age.toString());
    }
    if (employee.address) {
      formData.append('address', employee.address);
    }
    if(file){
      formData.append('photo',file,file.name);
    }
    return this.http.post<ApiResponse<Employee>>(this.apiUrl, formData);
  }

  updateEmployee(id:number,employee: Employee,newPhoto:File|null): Observable<ApiResponse<Employee>> {
    const formData = new FormData();
    formData.append('id',id.toString());
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('phone', employee.phone);
    formData.append('role', employee.role);
    if (employee.age != null) {
      formData.append('age', employee.age.toString());
    }
    if (employee.address) {
      formData.append('address', employee.address);
    }
    if (employee.photoPath) {
      formData.append('photoPath', employee.photoPath);
    }
    if(newPhoto){
      formData.append('photo',newPhoto,newPhoto.name);
    }
    return this.http.put<ApiResponse<Employee>>(this.apiUrl,formData);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  seedTestEmployees(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/seedtestusers`, {});
  }

}
