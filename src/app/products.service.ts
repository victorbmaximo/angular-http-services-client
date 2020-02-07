import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  readonly url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  getProductsErr(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productserr`);
  }

  getProductsDelay(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/productsdelay`);
  }

  getProductsIds(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/products_ids`);
  }

  getProductName(id: string): Observable<string> {
    return this.http.get(`${this.url}/products/name/${id}`, {responseType: "text"});
  }
}
