import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable,map } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { Category } from '../../../../shared/models/Category';
import { Product } from '../../../../shared/models/Product';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,RouterLink],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  _router = inject(Router);
  _route = inject(ActivatedRoute);
  _toast = inject(ToastService);
  _prodServ = inject(ProductService);
  id: number = Number(this._route.snapshot.paramMap.get('id'));
  product$=new Observable<any>();
  ngOnInit() {
    if (this.id < 0) {
      this._toast.show('error', 'Invalid Request!! Select Product Again.');
      this._router.navigate(['/products']);
    }
    this.product$= this._prodServ.getProductById(this.id).pipe(
      map(resp=>resp.data)
    );
  }
 
}
