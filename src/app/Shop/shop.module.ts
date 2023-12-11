import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './shop.component';
import { CartComponent } from './components/cart/cart.component';
import { GlobalModule } from '../Global/global.module';

@NgModule({
  declarations: [
    ShopComponent,
    HomeComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    GlobalModule
  ]
})
export class ShopModule { }
