import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products$: Array<Object>;
  partialTotal$: number;

  constructor(private data: DataService) { }

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
