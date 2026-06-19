import { Component, inject } from '@angular/core';
import { CommonModule,DatePipe } from '@angular/common';
import { Router, ActivatedRoute,RouterLink } from '@angular/router';
import { Observable, map,tap } from 'rxjs';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../categories/services/category.service';
import { Category } from '../../../../shared/models/Category';
import { Product } from '../../../../shared/models/Product';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  providers:[DatePipe],
  templateUrl: './product-edit.component.html',
  styleUrl: './product-edit.component.scss',
})
export class ProductEditComponent {
  _router = inject(Router);
  _route = inject(ActivatedRoute);
  _catServ = inject(CategoryService);
  _prodServ = inject(ProductService);
  _toast = inject(ToastService);
  _datePipe=inject(DatePipe);
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
    this.product$= this._prodServ.getProductById(this.id).pipe(
      map(resp=>resp.data),
      tap(product=>{
        console.log(product);
        const formData={
          ...product,
          purchaseDate:this._datePipe.transform(product.purchaseDate,'yyyy-MM-dd')
        };
        this.productForm.patchValue(formData);
      })
    );
  }
  emptyProductForm() {
    this.productForm = this.fb.group({
      name: [''],
      serialNumber: [''],
      purchaseDate: [''],
      purchaseCost: [''],
      status: [''],
      description: [''],
      id: [''],
      categoryId: [''],
    })
  }

}
