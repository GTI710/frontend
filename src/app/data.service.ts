import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getCategorie(categorieId) {
    return this.http.get('https://jsonplaceholder.typicode.com/users/' + categorieId);
  }

  getProductsInCategory(categorieId) {
    return this.http.get('https://jsonplaceholder.typicode.com/posts?userId=' + categorieId);
  }
}
