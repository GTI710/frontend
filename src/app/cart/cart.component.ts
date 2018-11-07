import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products$: Array<Object>;

  constructor(private data: DataService) { }

  ngOnInit() {
    let itemsInCart = {};
    this.products$ = [];

    if (localStorage.getItem('itemsInCart') !== null && localStorage.getItem('itemsInCart') !== undefined) {
      itemsInCart = JSON.parse(localStorage.getItem('itemsInCart'));
    }

    const keysItemsInCart = Object.keys(itemsInCart);

    for (const item of keysItemsInCart) {
      this.data.getProduct(item).subscribe(
        data => {
          const modifiedItem = data['product'];
          modifiedItem.countInCart = itemsInCart[item];
          this.products$.push(modifiedItem);
        }
      );
    }

  }

}
