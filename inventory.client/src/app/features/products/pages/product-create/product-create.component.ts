import { Component, inject } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../../../shared/models/Category';
import { Product } from '../../../../shared/models/Product';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-product-create',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent {
  _prodServ = inject(ProductService);
  _catServ = inject(CategoryService);
  _toast = inject(ToastService);
  _router = inject(Router);

  //load categories
  categories$ = this._catServ.getAllCategories().pipe(
    map(resp => resp.data)
  );
  selectedCatId: number = -1;

  product: Product = {
    name: 'test',
    description: 'test description',
    serialNumber: 'test-t-1',
    purchaseCost: '0',
    status: 'In Stock',
    purchaseDate: new Date(),
    categoryId: this.selectedCatId,
    updatedAt: new Date()
  };

  productForm = new FormGroup({
    name: new FormControl(this.product.name, Validators.required),
    description: new FormControl(this.product.description, Validators.required),
    serialNumber: new FormControl(this.product.serialNumber),
    purchaseCost: new FormControl(this.product.purchaseCost, Validators.required),
    purchaseDate: new FormControl(this.product.purchaseDate, Validators.required),
    status: new FormControl(this.product.status, Validators.required),
    categoryId: new FormControl(this.product.categoryId, [Validators.required, Validators.min(0)]) //if less than 0, category isn't selected yet
  });

  onSubmit() {
    if (this.productForm.invalid) return;
    this._prodServ.addProduct(this.productForm.value).subscribe(resp => {
      if (resp.success) {
        this._toast.show('success', resp.message);
        this._router.navigate(['/products']);
      }
      else {
        this._toast.show('error', resp.message);
        this._router.navigate(['/products']);
      }
    }
    );
  }
}
