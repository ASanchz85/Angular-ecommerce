import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagementMainComponent } from './management-main.component';

const routes: Routes = [
  {
    path: '',
    component: ManagementMainComponent,
    children: [
      {
        path: 'list',
        component: ListProductComponent,
      },
      {
        path: 'create',
        component: CreateProductComponent,
      },
      {
        path: 'edit/:id',
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
