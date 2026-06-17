import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../shared/models/Category';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  _catServ = inject(CategoryService);
  _toast = inject(ToastService);
  _router = inject(Router)
  categories = signal<any>(null);
  selectedCat: Category = { name: '' };
  ngOnInit() {
    this.loadCategories();
  }
  onDetailsClick(category: any) {
    this.selectedCat = category;
  }

  //Normal Approach
/*
  onDeleteClick(cat: Category) {
    if (!cat.id) return;
    this._catServ.deleteCategory(cat.id).subscribe({
      next: resp => {
        if (resp.success) this._toast.show('success', resp.message);
        else this._toast.show('error', resp.message);
        this.loadCategories();
      },
      error: err => console.error(err)
    });
  }
*/

//Signal Approach
onDeleteClick(cat:Category){
  if(!cat.id) return;
  this._catServ.deleteCategory(cat.id).subscribe({
    next:resp=>{
      if(resp.success){
        this._toast.show('success',resp.message)
        //no need to fetch from db again, 
        //update signal directly if delete worked
        this.categories.update(currentCat=>currentCat.filter((c:Category)=>c.id!=cat.id));
      }
      else{this._toast.show('error',resp.message);}
    }
  })
}

  loadCategories() {
    this._catServ.getAllCategories().subscribe(resp => {
      this.categories.set(resp.data);
    })
  }
}
