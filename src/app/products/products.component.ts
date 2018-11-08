import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  product$: Object;

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
      return true;
    }

    return false;
  }

  ngOnInit() {
    this.data.getProduct(this.product$).subscribe(
      data => this.product$ = data['product']
    );
  }

}
