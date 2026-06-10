import { Component } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  message = '';
  toastType='';
  constructor(private toastService: ToastService) { }
  ngOnInit() {
    this.toastService.toast$.subscribe(data => {
      if(!data) return;
      this.message = data.message;
      this.toastType=data.toastType;
      setTimeout(() => {
        this.message = '';
        this.toastType='';
      }, 3000)
    });

  }
}
