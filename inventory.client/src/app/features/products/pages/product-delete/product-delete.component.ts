import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, map, tap } from 'rxjs';
import { Product } from '../../../../shared/models/Product';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-product-delete',
  imports: [RouterLink, CommonModule],
  templateUrl: './product-delete.component.html',
  styleUrl: './product-delete.component.scss',
})
export class ProductDeleteComponent {

  _router = inject(Router);
  _route = inject(ActivatedRoute);
  _prodServ = inject(ProductService);
  _toast = inject(ToastService);
  id: number = Number(this._route.snapshot.paramMap.get('id'));
  product$ = new Observable<any>();
  ngOnInit() {
    if (this.id < 0) {
      this._toast.show('error', 'Invalid selection. Please selected data again');
      this._router.navigate(['/products']);
      return;
    }
    this.product$ = this._prodServ.getProductById(this.id).pipe(
      map(resp => resp.data)
    )
  }
  onDelete() {
    this._prodServ.deleteProduct(this.id).subscribe({
      next: resp => {
        if (resp.success) {
          this._toast.show("success", resp.message);
        }
        else {
          this._toast.show("error", resp.message);
        }
        this._router.navigate(['/products']);
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
