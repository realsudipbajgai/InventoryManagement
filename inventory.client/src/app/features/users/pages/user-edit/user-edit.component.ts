import { Component, inject } from '@angular/core';
import { RouterLink, ActivatedRoute, Router } from '@angular/router'
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, map,tap } from 'rxjs';
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
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toast = inject(ToastService);
  userId!: number;
  user$!: Observable<any>;
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
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (isNaN(this.userId)) {
      this.toast.show('warning', 'User not found. Select from the list below');
      this.router.navigate(['users']);
      return;
    }
    this.user$ = this.userService.getUserById(this.userId).pipe(
      map(resp => resp.data),
      tap(data=>{
        if(data){
          this.editForm.patchValue(data);
        }
      })
    );
  }
  onSubmit() {
    this.userService.updateUser(this.userId, this.editForm.value,this.selectedPhoto).subscribe({
      next: (result) => {
        if (result.success) {
          this.toast.show('success', result.message)
          this.router.navigate(['users']);
        }
      },
      error: (err) => {
        this.toast.show('error', err || 'Unable to update the record');
        this.router.navigate(['users']);
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
