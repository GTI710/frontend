import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

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

  createNewSale(formData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('http://localhost:8080/api/sale', formData, httpOptions)
      .pipe(
        catchError(this.handleError)
    );
  }

  getSale(saleId) {
    return this.http.get('http://localhost:8080/api/sale/' + saleId);
  }

  createNewRatingReview(formData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('http://localhost:8080/api/rating', formData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  createNewCommentReview(formData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post('http://localhost:8080/api/comment', formData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
