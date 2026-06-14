import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable,map } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../shared/models/Category';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  catServ = inject(CategoryService);
  categories$=new Observable<any>;
  ngOnInit() {
    this.categories$=this.catServ.getAllCategories().pipe(
      map(resp=>resp.data)
    );
  }
}
