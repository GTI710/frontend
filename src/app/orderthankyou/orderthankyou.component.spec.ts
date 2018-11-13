import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderthankyouComponent } from './orderthankyou.component';

describe('OrderthankyouComponent', () => {
  let component: OrderthankyouComponent;
  let fixture: ComponentFixture<OrderthankyouComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderthankyouComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderthankyouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
