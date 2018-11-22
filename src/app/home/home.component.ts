import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  categories$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getCategories().subscribe(
      data => {
        this.categories$ = data['productCategories'];
        // @ts-ignore
        this.categories$.forEach( (item, index) => {
          if (item.idProductCategory === 1) {
            // @ts-ignore
            this.categories$.splice(index, 1); }
        });
      }
    );
  }

}
