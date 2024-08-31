// api.service.ts
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  // Get all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`);
  }

  // Get a single product by ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}`);
  }

  // Get a limited number of products
  getLimitedProducts(limit: number): Observable<any[]> {
    const params = new HttpParams().set('limit', limit.toString());
    return this.http.get<any[]>(`${this.baseUrl}/products`, { params });
  }

  // Sort products by price or rating
  getSortedProducts(sortBy: 'price' | 'rating'): Observable<any[]> {
    return this.getProducts().pipe(
      map(products => products.sort((a, b) => a[sortBy] - b[sortBy]))
    );
  }

  // Get all categories
  getCategories(): Observable<string[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/categories`);
  }

  // Get products by category
  getProductsByCategory(category: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/category/${category}`);
  }

  // Add a new product
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/products`, product);
  }

  // Update an existing product
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/products/${id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/products/${id}`);
  }
}
