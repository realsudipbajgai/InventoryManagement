import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/User';
import { ToastService } from '../../../../shared/services/toast.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-users',
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  users = signal<User[]>([]);
  selectedUser = signal<any>(null);
  serverUrl = environment.serverUrl;
  async ngOnInit() {
    try {
      const result = await firstValueFrom(this.userService.getAllUsers());

      if (result.success && result.data) {
        this.users.set(result.data);
      }
      else {
        this.toastService.show('error', result.message || 'Failed to load users');
        this.users.set([]);
      }
    }
    catch (error) {
      this.toastService.show('error', 'A critical error occured while feteching data');
    }
  }
  selectUser(user: any) {
    this.selectedUser.set(user);
  }
  async seedTestUsers() {
    try {
      var result = await firstValueFrom(this.userService.seedTestUsers());
      if (result.success) {
        this.toastService.show('success', result.message);
      }
      else {
        this.toastService.show('error', result.message);
      }
      this.loadUsers();
    }
    catch (error) {
      this.toastService.show('error', result.message);
    }
  }
  onUserDetailsClick(user: User) {
    this.selectUser(user);
  }
  onUserDeleteClick(user: User) {
    this.selectUser(user);
  }

  async onDeleteConfirmation(id: number) {
    try {
      var result = await firstValueFrom(this.userService.deleteUser(id));
      if (result.success) {
        
        this.loadUsers();
        this.toastService.show('success', result.message);
      }
      else{
        console.log("Delete Failed");
        
         this.toastService.show('error', result.message);
      }

    }
    catch {
      this.toastService.show('error', 'A critical error occured while communicating with the server. Refresh the page and try again.');
    }
  }
  async loadUsers() {
    const result = await firstValueFrom(this.userService.getAllUsers());
    if (result.success && result.data) {
      console.log("Inside load users");
      
      this.users.set(result.data);
    }
  }
}