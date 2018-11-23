import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product$: Object;
  rating$: Array<number>;
  selectedRating$: number;
  overallRating$: number;

  constructor(private data: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.product$ = params.id);
  }

  addToCart(id: number, quantity: string): boolean {
    if (id !== null && id !== undefined) {
      let itemsInCart = {};
      if (localStorage.getItem('itemsInCart') !== null) {
        itemsInCart = JSON.parse(localStorage.getItem('itemsInCart'));
      }

      itemsInCart[id] = +quantity;
      localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
      document.getElementById('cart-add-alert').classList.remove('d-none');
      setTimeout(function() {
        document.getElementById('cart-add-alert').classList.add('d-none');
      }, 3000);
      return true;
    }

    return false;
  }

  formatDate(tempDate: string): string {
    return moment(tempDate).format('MMMM Do YYYY');
  }

  toFixed(numferToFixed, numberOfDigits: number ): number {
    return numferToFixed.toFixed(numberOfDigits);
  }

  onChangeRating(rating, productId) {
    this.selectedRating$ = rating;
    const input = {
      'score': (+rating * 2),
      'idProductTemplate' : productId
    };

    this.data.createNewRatingReview(input).subscribe(data => {
      document.getElementById('rating-form').innerHTML = '<div class="col-md-12 d-inline-block"><h4>Merci pour votre opinion!</h4></div>';
    });
  }

  addComment(comment, productId) {
    const input = {
      'body': comment,
      'idProductTemplate' : productId
    };

    this.data.createNewCommentReview(input).subscribe(data => {
      document.getElementById('comment-form').innerHTML = '<div class="col-md-12 d-inline-block"><h4>Merci pour votre opinion!</h4></div>';
    });
  }

  ngOnInit() {
    this.data.getProduct(this.product$).subscribe(
      data => {
        this.product$ = data['product'];
        // @ts-ignore
        this.overallRating$ = this.toFixed(this.product$.averageRating, 1);
      }
    );
    this.rating$ = [1, 2, 3, 4, 5];
    this.selectedRating$ = this.rating$[5];
  }

}
