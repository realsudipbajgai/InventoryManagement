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
  selectedFile:File|null=null;
  constructor(private router: Router, 
    private userService: UserService,
  private toastService:ToastService) { }
  createEmptyUser(): User {
    return {
      name: 'test',
      email: 'test@gmail.com',
      address: 'testaddress',
      age:29,
      phone: '32253235',
      role: 'Admin',
      photoPath:null,
      photo:null
    };
  };

  onFileSelected(event:any){
    const file:File=event.target.files[0];
    if(file)
    {
      this.selectedFile=file;
    }
  }
  onSubmit() {
    this.userService.addUser(this.user,this.selectedFile).subscribe(data =>{
    this.toastService.show('success', data.name+' added to database');
    this.router.navigate(['/users']);
    });
  }

  onCancel() {
    this.user = this.createEmptyUser();
    this.router.navigate(['/users']);
  }
}
