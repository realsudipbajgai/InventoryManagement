import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ApplicationUser } from '../../../../shared/models/ApplicationUser';
import { ToastService } from '../../../../shared/services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  _authServ=inject(AuthService);
  _toast=inject(ToastService);
  _router=inject(Router);
  showPassword:boolean=false;
  user:ApplicationUser={
    email:'',
    password:'',
  };
  emailError:boolean=false;

  togglePassword(){
    this.showPassword=!this.showPassword;
  }
  login(form:NgForm){
    // const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if(!emailRegex.test(email)){
    //   this.emailError=true;
    // }
    // else{
    //   this.emailError=false;
    // }

    // const pwRegex=new RegExp("(?=.*[A-Z])(?=.*\\d)(?=.*[#$_@%]).{10,}");
    // if(!pwRegex.test(password)){
    //   return;
    // }
    console.log(form.value);
    if(form.invalid) return;
    this._authServ.login(this.user).subscribe({
      next:resp=>{
        if(resp.success){
          this._toast.show('success','Login Successful');
          const token=resp?.data?.token;
          if(token){
            this._authServ.setLogin(token);
          }
          else{
            console.error('Login didn\'t work');
          }
          this._router.navigate(['/']);
        }
      },
      error:err=>{
        console.error(err);
        
      }
    })
  }
}
