import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router'
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/User';

@Component({
  selector: 'app-users',
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  constructor(private userService: UserService, private changedtr: ChangeDetectorRef) { }
  //data isnt loading on 1st page load using 1st method
  //2nd method solves it
  //----------1st method-----------------------------------------------
  // users: User[] = [];
  // ngOnInit(): void {
  //   this.getAllUsers();
  // }
  // getAllUsers(): void {
  //   this.userService.getAllUsers().subscribe(data => {
  //     this.users = data;
  //   });
  // }
  //---------------------------------------------------------
  //2nd method
  //---------------------------------------------------------
  // users$!: Observable<User[]>;
  // ngOnInit(): void {
  //   this.users$ = this.userService.getAllUsers();
  // }


  //---------------------------------------------------------
  //3rd method
  //---------------------------------------------------------
  users: User[] = [];
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      this.changedtr.detectChanges();
    });
  }
//---------------------------------------------------------

}
