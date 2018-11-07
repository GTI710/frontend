import { Component, OnInit } from '@angular/core';
import { DataService} from '../data.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category$: Object;
  products$: Object;

  constructor(private data: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.category$ = params.id);
  }

  ngOnInit() {
    this.data.getCategorie(this.category$).subscribe(
      data => this.category$ = data['productCategory']
    );

    this.data.getProductsInCategory(this.category$).subscribe(
      data => this.products$ = data['products']
    );
  }

}
