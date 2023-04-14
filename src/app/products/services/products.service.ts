import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http : HttpClient) { }

  getAllProducts():Observable<any>{
    return this.http.get("https://fakestoreapi.com/products");

  }

  getAllCategories():Observable<any>{
    return this.http.get("https://fakestoreapi.com/products/categories")
  }

  getProductByCategory(word:string):Observable<any>{
    return this.http.get(`https://fakestoreapi.com/products/category/${word}`)
  }

  getProductById(id:any):Observable<any>{
    return this.http.get(`https://fakestoreapi.com/products/${id}`)
  }
}
