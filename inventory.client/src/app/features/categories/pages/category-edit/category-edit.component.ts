import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Category } from '../../../../shared/models/Category';
import { CategoryService } from '../../services/category.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-category-edit',
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss',
})
export class CategoryEditComponent {
  _route = inject(ActivatedRoute);
  _catServ = inject(CategoryService);
  _toast = inject(ToastService);
  _router = inject(Router);
  id: any;
  category$!: Observable<Category>;
  ngOnInit() {
    // this.id=this._route.snapshot.paramMap.get('id');
    // this._catServ.getCategoryById(this.id).subscribe(resp=>{
    //   console.log(resp);
    //   this.category=resp.data;
    //   console.log(this.category);
    // // })

    this.category$ = this._route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this._catServ.getCategoryById(Number(id))),
      map(resp => resp.data)
    );
  }

  onUpdate(cat: Category) {
    this._catServ.updateCategory(cat).subscribe({
      next: resp => {
        if (resp.success) {
          this._toast.show('success', resp.message)
        }
        else {
          this._toast.show('error', resp.message);
        }
        this._router.navigate(['categories']);
      },
      error: err => console.error(err)
    });
  }
}
