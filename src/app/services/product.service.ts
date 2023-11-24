import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private _URL = 'http://localhost:3000/api/products/';

  constructor(private _http: HttpClient) {}

  saveProduct(product: Product): Observable<Product> {
    return this._http.post<Product>(this._URL, product);
  }

  getAllProducts(): Observable<Product> {
    return this._http.get<Product>(this._URL);
  }

  updateProduct(_id: any, product: Product): Observable<Product> {
    return this._http.put<Product>(this._URL + _id, product);
  }

  deleteProduct(_id: any): Observable<Product> {
    return this._http.delete<Product>(this._URL + _id)
  }
}
