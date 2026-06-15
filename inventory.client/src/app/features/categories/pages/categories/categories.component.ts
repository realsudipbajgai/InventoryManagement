import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable,map } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../../../shared/models/Category';

@Component({
  selector: 'app-categories',
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  catServ = inject(CategoryService);
  categories$=new Observable<any>;
  selectedCat:Category={name:''};
  ngOnInit() {
    this.categories$=this.catServ.getAllCategories().pipe(
      map(resp=>resp.data)
    );
  }
  onDetailsClick(id:number){
    this.catServ.getCategoryById(id).subscribe(resp=>{
      if(resp.success){
        this.selectedCat=resp.data;
        console.log(this.selectedCat);
      }
    }) 
  }
}
