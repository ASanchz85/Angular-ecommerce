import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementMainComponent } from './management-main.component';

@NgModule({
  declarations: [
    ManagementMainComponent,
    CreateProductComponent,
    ListProductComponent,
  ],
  imports: [CommonModule, ManagementRoutingModule],
})
export class ManagementModule {}
