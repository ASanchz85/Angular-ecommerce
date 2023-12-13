import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../Shop/components/home/home.component';
import { CartComponent } from '../Shop/components/cart/cart.component';
import { ShopComponent } from '../Shop/shop.component';
import { ManagementMainComponent } from '../Management/management-main.component';
import { ListProductComponent } from '../Management/components/list-product/list-product.component';
import { CreateProductComponent } from '../Management/components/create-product/create-product.component';
import { ProductService } from '../services/product.service';

const routes: Routes = [
  {
    path: '',
    component: ManagementMainComponent,
    children: [
      {
        path: 'list',
        component: ListProductComponent,
        resolve: {
          productList: () => inject(ProductService).getAllProducts(),
        },
      },
      {
        path: 'create',
        component: CreateProductComponent,
      },
      {
        path: 'edit/:product',
        component: CreateProductComponent,
      },
    ],
  },
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: 'catalogue',
        component: HomeComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GlobalRoutingModule {}
