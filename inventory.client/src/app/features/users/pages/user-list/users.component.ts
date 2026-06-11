import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router'
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../../../shared/models/User';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-users',
  imports: [RouterLink, CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  private userService = inject(UserService);
  private toastService = inject(ToastService);
  users = signal<any[]>([]);
  selectedUser = signal<any>(null);
  async ngOnInit() {
    try {
      const data = await firstValueFrom(this.userService.getAllUsers());
      this.users.set(data);
    }
    catch (error) {
      console.error('failed to load users', error);
    }
  }
  selectUser(user: any) {
    this.selectedUser.set(user);
  }
  async seedTestUsers() {
    try {
      await firstValueFrom(this.userService.seedTestUsers());
      this.toastService.show('success', "Test users seeded successfully");
      this.loadUsers();
    }
    catch (error) {
      this.toastService.show('error', "Failed to seed data");
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
      await firstValueFrom(this.userService.deleteUser(id));
      this.loadUsers();
      this.toastService.show('success', 'Delete Successful');
    }
    catch {
      this.toastService.show('error', 'Delete Failed');
    }
  }
  async loadUsers() {
    const updatedUsers = await firstValueFrom(this.userService.getAllUsers());
    this.users.set(updatedUsers);
  }
}