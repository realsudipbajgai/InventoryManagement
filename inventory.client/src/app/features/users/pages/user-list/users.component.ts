import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, Subject, startWith, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/User';

@Component({
  selector: 'app-users',
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  constructor(private userService: UserService, private router: Router) { }
  selectedUser: any = null;
  private refresh$ = new Subject<void>();
  users$ = this.refresh$.pipe(
    startWith(void 0),
    switchMap(() => this.userService.getAllUsers())
  );
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
      this.refresh$.next();
    });
  }
  seedTestUsers() {
    this.userService.seedTestUsers().subscribe(data => {
      if (data.success) {
        alert("Insert Successfull");
        this.refresh$.next();
      }
      else {
        alert("Insert Failed");
      }
    });
  }
}