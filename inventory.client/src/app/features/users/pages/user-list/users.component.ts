import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/User';

@Component({
  selector: 'app-users',
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) { }
  selectedUser: any = null;
  private usersObj=new BehaviorSubject<User[]>([]);
  users$=this.usersObj.asObservable();
  ngOnInit(): void {
    this.loadUsers();
  }
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(data=>{
      this.usersObj.next(data);
    })
  }

  onUserDetailsClick(user: User) {
    this.selectedUser = user;
  }
  onUserDeleteClick(user: User) {
    this.selectedUser = user;
  }
  onDeleteConfirmation(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      alert(data.message);
      this.selectedUser = null;
      this.loadUsers();
    });
  }
  seedTestUsers() {
    this.userService.seedTestUsers().subscribe(data => {
      if (data.success) {
        alert("Insert Successfull");
        this.loadUsers();
      }
      else {
        alert("Insert Failed");
      }
    });
  }
}