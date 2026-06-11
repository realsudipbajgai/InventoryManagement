import { Injectable, signal} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // 1. Create the state holder (hidden from outside components)
  private toastState = signal<{ toastType: string; message: string } | null>(null);
  
  // 2. Expose it as a read-only signal that components can listen to
  readonly toast = this.toastState.asReadonly();

  show(toastType: string, message: string) {
    // 3. Set the data (this instantly shows the toast)
    this.toastState.set({ toastType, message });

    // 4. Automatically clear it after 3 seconds
    setTimeout(() => {
      this.toastState.set(null);
    }, 3000);
  }
}
