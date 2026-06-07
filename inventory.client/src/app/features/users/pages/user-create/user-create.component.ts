import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router'
import { FormsModule } from '@angular/forms';
import { User } from '../../../../shared/models/User';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-create',
  imports: [RouterLink, FormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
})
export class UserCreateComponent {
  user: User = this.createEmptyUser();

  constructor(private router: Router, private userService: UserService) { }
  createEmptyUser(): User {
    return {
      name: '',
      id: 0,
      address: '',
      age: 0,
      email: '',
      phone: '',
      role: '',
      photoPath: ''
    };
  };
  onSubmit() {
    this.userService.addUser(this.user).subscribe(data =>
      alert(data.name + "successfully added to database")
    );
    this.router.navigate(['/users']);
  }

  onCancel() {
    this.user = this.createEmptyUser();
    this.router.navigate(['/users']);
  }
}
