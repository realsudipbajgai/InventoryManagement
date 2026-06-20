import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, map,tap } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../../../shared/models/Employee';
import { ToastService } from '../../../../shared/services/toast.service';
import { BaseComponent } from '../../../../shared/base/base.component';

@Component({
  selector: 'app-employee-edit',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './employee-edit.component.html',
  styleUrl: './employee-edit.component.scss',
})
export class EmployeeEditComponent extends BaseComponent {
  private _empServ = inject(EmployeeService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastService);
  employeeId!: number;
  employee$!: Observable<any>;
  selectedPhoto:File|null=null;
  editForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    age: new FormControl(null),
    role: new FormControl(''),
    photoPath: new FormControl(''),
    photo:new FormControl(null)
  });
  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.employeeId)) {
      this.toast.show('warning', 'Employee not found. Select from the list below');
      this.router.navigate(['employees']);
      return;
    }
    this.employee$ = this._empServ.getEmployeeById(this.employeeId).pipe(
      map(resp => resp.data),
      tap(data=>{
        if(data){
          this.editForm.patchValue(data);
        }
      })
    );
  }
  onSubmit() {
    this._empServ.updateEmployee(this.employeeId, this.editForm.value,this.selectedPhoto).subscribe({
      next: (result) => {
        if (result.success) {
          this.toast.show('success', result.message)
          this.router.navigate(['employees']);
        }
      },
      error: (err) => {
        this.toast.show('error', err || 'Unable to update the record');
        this.router.navigate(['employees']);
      }
    });
  }

  onPhotoSelected(event:any){
    const file:File=event.target.files[0];
    if(file){
      this.selectedPhoto=file;
      console.log(this.selectedPhoto);
      
    }
  }
}
