import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { User } from '../../../../shared/models/User';
import { UserService } from '../../services/user.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-user-create',
  imports: [FormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  user: User = this.createEmptyUser();

  constructor(private router: Router, 
    private userService: UserService,
  private toastService:ToastService) { }
  createEmptyUser(): User {
    return {
      name: '',
      email: '',
      address: null,
      age:null,
      phone: '',
      role: '',
      photoPath:null
    };
  };
  onSubmit() {
    this.userService.addUser(this.user).subscribe(data =>{
    this.toastService.show('success', data.name+' added to database');
    this.router.navigate(['/users']);
    });
  }

  onCancel() {
    this.user = this.createEmptyUser();
    this.router.navigate(['/users']);
  }
}
