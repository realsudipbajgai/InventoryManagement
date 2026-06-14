import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/User';
import { ToastService } from '../../../../shared/services/toast.service';
import { BaseComponent } from '../../../../shared/base/base.component';

@Component({
  selector: 'app-user-edit',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent extends BaseComponent {
  userId!: number;
  editForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    address: new FormControl(''),
    age: new FormControl(null),
    role: new FormControl(''),
    photoPath: new FormControl(''),
  });
  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toast: ToastService) { super()}
    
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.userId)) {
      this.toast.show('warning', 'User not found. Select from the list below');
      this.router.navigate(['users']);
      return;
    }
    this.userService.getUserById(this.userId).subscribe({
      next: (result) => {
        if (result.success && result.data) {
          this.editForm.patchValue(result.data);
          console.log(result.data.photoPath);
          this.editForm.get('photoPath')?.updateValueAndValidity();
          // this.photoUrl=this.serverUrl+'/'+result.data.photoPath;
        }
      },
      error: (err) => {
        this.toast.show('error', err||'Failed to load user');
        this.router.navigate(['users']);
      }
    });
  }
  onSubmit() {
    this.userService.updateUser(this.userId, this.editForm.value).subscribe({
      next: (result) => {
        if (result.success) {
          this.toast.show('success', result.message)
          this.router.navigate(['users']);
        }
      },
      error: (err) => {
        this.toast.show('error', err||'Unable to update the record');
        this.router.navigate(['users']);
      }
    });
  }
}
