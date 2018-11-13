import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

import { HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderthankyouComponent } from './orderthankyou/orderthankyou.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    CategoriesComponent,
    ProductsComponent,
    CartComponent,
    HomeComponent,
    CheckoutComponent,
    OrderthankyouComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
