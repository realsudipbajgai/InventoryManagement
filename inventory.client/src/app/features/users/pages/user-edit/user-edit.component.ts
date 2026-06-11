import { Component } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/User';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-user-edit',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent {
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
    private toast: ToastService) { }
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.userId)) {
      this.toast.show('warning', 'User not found. Select from the list below');
      this.router.navigate(['users']);
      return;
    }
    this.userService.getUserById(this.userId).subscribe({
      next: (data) => {
        this.editForm.patchValue(data);
      },
      error: () => {
        this.toast.show('error', 'Failed to load user');
        this.router.navigate(['users']);
      }
    });
  }
  onSubmit() {
    console.log(this.editForm.value);
    this.userService.updateUser(this.userId, this.editForm.value).subscribe({
      next: (data) => {
        this.toast.show('success', 'Update Successful')
        this.router.navigate(['users']);

      },
      error: () => {
        this.toast.show('error', 'Unable to update record');
        this.router.navigate(['users']);
      }
    });
  }
}
