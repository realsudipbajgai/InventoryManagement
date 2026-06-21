import { Component, signal,inject } from '@angular/core';
import {RouterOutlet,RouterLink,RouterModule} from '@angular/router'
import { CommonModule } from '@angular/common';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AuthService } from './features/auth/services/auth.service';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink,ToastComponent,RouterModule,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('inventory.client');

  _auth=inject(AuthService);
  logout(){
    this._auth.logout();
  }
}
