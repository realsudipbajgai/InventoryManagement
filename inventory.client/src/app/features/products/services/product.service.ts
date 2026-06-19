import { Injectable, inject } from '@angular/core';
import { ConfigService } from '../../../shared/services/config.service';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  _config = inject(ConfigService);
  _http = inject(HttpClient);

  getAllProducts(): Observable<any> {
    return this._http.get(this._config.serverUrl + '/products');
  }

  addProduct(product: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('serialNumber', product.serialNumber);
    formData.append('purchaseCost', product.purchaseCost);
    formData.append('purchaseDate', new Date(product.purchaseDate).toISOString());
    formData.append('status', product.status);
    formData.append('categoryId', product.categoryId.toString());
    return this._http.post(this._config.serverUrl + '/products', formData)
  }

  getProductById(id:number):Observable<any>{
    return this._http.get(this._config.serverUrl+`/products/${id}`);
  }
}
