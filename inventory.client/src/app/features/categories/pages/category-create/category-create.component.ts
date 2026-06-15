import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../../shared/models/Category';
import { CategoryService } from '../../services/category.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-category-create',
  imports: [RouterLink, FormsModule],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss',
})
export class CategoryCreateComponent {
  catServ = inject(CategoryService);
  router = inject(Router);
  toast = inject(ToastService);
  category: Category = { name: '' };
  onSubmit() {
    // this.catServ.addCategory(this.category).subscribe(resp=>{
    //   if(resp.success){
    //     this.toast.show('success',resp.message);
    //     this.router.navigate(['categories']);
    //   }
    // });
    this.catServ.addCategory(this.category).subscribe({
      next: resp => {
        if (resp.success) {
          this.toast.show('success', resp.message);
          this.router.navigate(['categories']);
        }
        else {
          this.toast.show('error', resp.message);
          this.router.navigate(['categories']);
        }
      },
      error: err => {
         this.toast.show('error','Something went wrong. Try again later');
          this.router.navigate(['categories']);
      }
    })
  }
}
