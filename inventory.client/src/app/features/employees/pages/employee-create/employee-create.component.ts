import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { Employee } from '../../../../shared/models/Employee';
import { EmployeeService } from '../../services/employee.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-employee-create',
  imports: [FormsModule],
  templateUrl: './employee-create.component.html',
  styleUrl: './employee-create.component.scss',
})
export class EmployeeCreateComponent {
  employee: Employee = this.createEmptyEmployee();
  selectedFile: File | null = null;
  constructor(private router: Router,
    private _empServ: EmployeeService,
    private toastService: ToastService) { }
  createEmptyEmployee(): Employee {
    return {
      name: 'test',
      email: 'test@gmail.com',
      address: 'testaddress',
      age: 29,
      phone: '32253235',
      role: 'Admin',
      photoPath: null,
      photo: null
    };
  };

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  onSubmit() {
    this._empServ.addEmployee(this.employee, this.selectedFile).subscribe(result => {
      if (result.success && result.data) {
        this.toastService.show('success', result.data.name + ' added to database');
        this.router.navigate(['/employees']);
      }
    });
  }

  onCancel() {
    this.employee = this.createEmptyEmployee();
    this.router.navigate(['/employees']);
  }
}
