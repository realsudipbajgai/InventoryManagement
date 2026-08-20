import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../../../shared/models/Category';
import { Product } from '../../../../shared/models/Product';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProductFilterComponent } from "./product-filter/product-filter.component";
import { ProductFilter } from '../../../../shared/models/ProductFilter';

@Component({
  selector: 'app-product-list',
  imports: [RouterLink, CommonModule, ProductFilterComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  _prodServ = inject(ProductService);
  _catServ = inject(CategoryService);
  _toast = inject(ToastService);
  _router = inject(Router);

  showFilter = false;
  categories$ = this._catServ.getAllCategories().pipe(
    map(resp => resp.data)
  );
  products$ = this._prodServ.getAllProducts().pipe(
    map(resp => resp.data)
  );

  displayFilterBlock() {
    this.showFilter = !this.showFilter;
  }
  onFilterChanged(filter: ProductFilter) {
    console.log(filter);
    
    this.products$ = this._prodServ.filterProducts(filter).pipe(
      map(resp => resp.data)
    );
  }
  filterCleared(){
    this.products$ = this._prodServ.getAllProducts().pipe(map(
      resp => resp.data
    ))
  }
}
