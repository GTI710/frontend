import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  products$: Array<Object>;
  partialTotal$: number;
  response: any;

  constructor(private data: DataService, private router: Router) { }

  onSubmit(name, street, city, country, zipcode, total) {
    const input = {
      'nameClient': name,
      'street': street,
      'city': city,
      'country': country,
      'zipcode': zipcode,
      'amount': total
    };

    this.data.createNewSale(input).subscribe(data => {
      this.response = data;
      // console.log(this.response);
      this.router.navigateByUrl('/thankyou/' + this.response['sale']['idSaleTable']);
    });
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
