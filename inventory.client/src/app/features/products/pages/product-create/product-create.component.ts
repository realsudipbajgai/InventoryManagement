import { Component,inject } from '@angular/core';
import {RouterLink,Router} from '@angular/router';
import {Observable} from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../../categories/services/category.service';
import {Category} from '../../../../shared/models/Category';
import { Product } from '../../../../shared/models/Product';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-product-create',
  imports: [],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.scss',
})
export class ProductCreateComponent {
  _prodServ=inject(ProductService);
  _catServ=inject(CategoryService);
  _toast=inject(ToastService);
  _router=inject(Router);

  categories$=new Observable<Category[]>();
  ngOnInit()
  {
    this._catServ.getAllCategories().subscribe({
      next:resp=>{
        if(resp.success){
          this.categories$=resp.data;
          console.log('cattegories:',this.categories$);
        }
        else{
          this._toast.show('warning','Something went wrong. Please try again later');
          this._router.navigate(['products']);
        }
      },
      error:err=>{
        console.error(err);
      }
    })
  }
}
