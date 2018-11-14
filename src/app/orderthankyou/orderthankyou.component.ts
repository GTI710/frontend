import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderthankyou',
  templateUrl: './orderthankyou.component.html',
  styleUrls: ['./orderthankyou.component.css']
})
export class OrderthankyouComponent implements OnInit {

  sale$: Object;

  constructor(private data: DataService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.sale$ = params.id);
  }

  ngOnInit() {
    this.data.getSale(this.sale$).subscribe(
      data => this.sale$ = data['sale']
    );
  }

}
