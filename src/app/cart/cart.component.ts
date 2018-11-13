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
  partialTotal$: number;

  constructor(private data: DataService) { }

  modifyProductQuantity(id: number, quantity: string): boolean {
    if (id !== null && id !== undefined) {
      let itemsInCart = {};
      if (localStorage.getItem('itemsInCart') !== null) {
        itemsInCart = JSON.parse(localStorage.getItem('itemsInCart'));
      }

      itemsInCart[id] = +quantity;
      localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));

      // @ts-ignore
      this.products$.filter(x => x.idProductTemplate === id)[0].countInCart = +quantity;
      this.calculatePartialTotal();
      return true;
    }

    return false;
  }

  removeFromCart(id: number): boolean {
    if (id !== null && id !== undefined) {
      let itemsInCart = {};
      if (localStorage.getItem('itemsInCart') !== null) {
        itemsInCart = JSON.parse(localStorage.getItem('itemsInCart'));
      }
      delete itemsInCart[id];
      localStorage.setItem('itemsInCart', JSON.stringify(itemsInCart));
      this.products$.forEach( (item, index) => {
        // @ts-ignore
        if (item.idProductTemplate === id) { this.products$.splice(index, 1); }
      });
      this.calculatePartialTotal();
      return true;
    }

    return false;
  }

  calculatePartialTotal() {
    this.partialTotal$ = 0;
    // @ts-ignore
    this.products$.forEach(x => this.partialTotal$ += Number(x.listPrice * x.countInCart));
  }

  ngOnInit() {
    let itemsInCart = {};
    this.products$ = [];
    this.partialTotal$ = 0;

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
          this.partialTotal$ += Number(modifiedItem.listPrice * modifiedItem.countInCart);
        }
      );
    }
  }

}
