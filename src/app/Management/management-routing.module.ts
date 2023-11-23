import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagementMainComponent } from './management-main.component';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagementRoutingModule {}
