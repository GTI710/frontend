import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get('http://localhost:8080/api/productcategory');
  }

  getCategorie(categorieId) {
    return this.http.get('http://localhost:8080/api/productcategory/' + categorieId);
  }

  getProductsInCategory(categorieId) {
    return this.http.get('http://localhost:8080/api/product/findall/' + categorieId);
  }
  getProduct(productId) {
    return this.http.get('http://localhost:8080/api/product/' + productId);
  }
}
