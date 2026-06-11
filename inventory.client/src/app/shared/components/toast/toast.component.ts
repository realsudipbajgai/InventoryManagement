import { Component, ChangeDetectorRef, signal} from '@angular/core';
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
  toastType = '';
  showToast = false;
  constructor(private toastService: ToastService, private cd: ChangeDetectorRef) { }
  ngOnInit() {
    this.toastService.toast$.subscribe(data => {
      if (!data) return;
      this.message = data.message;
      this.toastType = data.toastType;
      this.showToast = true;
      setTimeout(() => {
        this.message = '';
        this.toastType = '';
        this.showToast = false;
        this.cd.detectChanges();
      }, 3000)
    });
  }
}
