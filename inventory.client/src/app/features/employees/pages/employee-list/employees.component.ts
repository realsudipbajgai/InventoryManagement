import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../../shared/models/Employee';
import { ToastService } from '../../../../shared/services/toast.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-employees',
  imports: [RouterLink, CommonModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.scss'
})
export class EmployeesComponent {
  private _empServ = inject(EmployeeService);
  private toastService = inject(ToastService);
  employees = signal<Employee[]>([]);
  selectedEmployee = signal<any>(null);
  serverUrl = environment.serverUrl;
  async ngOnInit() {
    try {
      const result = await firstValueFrom(this._empServ.getAllEmployees());

      if (result.success && result.data) {
        this.employees.set(result.data);
      }
      else {
        this.toastService.show('error', result.message || 'Failed to load employees');
        this.employees.set([]);
      }
    }
    catch (error) {
      this.toastService.show('error', 'A critical error occured while feteching data');
    }
  }
  selectEmployee(employee: any) {
    this.selectedEmployee.set(employee);
  }
  async seedTestEmployees() {
    try {
      var result = await firstValueFrom(this._empServ.seedTestEmployees());
      if (result.success) {
        this.toastService.show('success', result.message);
      }
      else {
        this.toastService.show('error', result.message);
      }
      this.loadEmployees();
    }
    catch (error) {
      this.toastService.show('error', result.message);
    }
  }
  onEmployeeDetailsClick(employee: Employee) {
    this.selectEmployee(employee);
  }
  onEmployeeDeleteClick(employee: Employee) {
    this.selectEmployee(employee);
  }

  async onDeleteConfirmation(id: number) {
    try {
      var result = await firstValueFrom(this._empServ.deleteEmployee(id));
      if (result.success) {
        
        this.loadEmployees();
        this.toastService.show('success', result.message);
      }
      else{
        console.log("Delete Failed");
        
         this.toastService.show('error', result.message);
      }

    }
    catch {
      this.toastService.show('error', 'A critical error occured while communicating with the server. Refresh the page and try again.');
    }
  }
  async loadEmployees() {
    const result = await firstValueFrom(this._empServ.getAllEmployees());
    if (result.success && result.data) {
      console.log("Inside load employees");
      
      this.employees.set(result.data);
    }
  }
}