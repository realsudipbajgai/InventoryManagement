import { Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../../../shared/models/Category';
import { Product } from '../../../../shared/models/Product';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  providers: [DatePipe],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent {
  _router = inject(Router);
  _route = inject(ActivatedRoute);
  _catServ = inject(CategoryService);
  _prodServ = inject(ProductService);
  _toast = inject(ToastService);
  _datePipe = inject(DatePipe);
  id: number = Number((this._route.snapshot.paramMap.get('id')));
  categories$: Observable<Category[]> = this._catServ.getAllCategories().pipe(map(resp => resp.data));
  product$ = new Observable<Product>();
  fb = new FormBuilder();
  productForm!: FormGroup;
  ngOnInit() {
    if (this.id < 0) {
      this._toast.show('error', 'Invalid selection. Please selected data again');
      this._router.navigate(['/products']);
      return;
    }
    this.emptyProductForm();
    this.product$ = this._prodServ.getProductById(this.id).pipe(
      map(resp => resp.data),
      tap(product => {
        const formData = {
          ...product,
          purchaseDate: this._datePipe.transform(product.purchaseDate, 'yyyy-MM-dd')
        };
        this.productForm.patchValue(formData);
      })
    );
  }
  emptyProductForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      serialNumber: [''],
      purchaseDate: ['', Validators.required],
      purchaseCost: ['', Validators.required],
      status: ['', Validators.required],
      description: ['', Validators.required],
      id: ['', Validators.required],
      categoryId: ['', [Validators.required, Validators.min(0)]],
    })
  }
  onSubmit() {
    if (this.productForm.invalid) return;
    console.log(this.productForm);
    console.log(this.productForm.value);
    this._prodServ.updateProduct(this.productForm.value).subscribe({
      next: resp => {
        if (resp.success) {
          this._toast.show('success', `Product with id:${resp.data.id} updated`);
          this._router.navigate(['/products']);
          return;
        }
        else {
          this._toast.show('error', resp.message);
          this._router.navigate(['/products']);
          return;
        }
      },
      error: err => {
        console.error(err);
      }

    });
  }

}
