import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagementRoutingModule } from './management-routing.module';
import { ManagementMainComponent } from './management-main.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManagementMainComponent,
    CreateProductComponent,
    ListProductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ManagementRoutingModule,
  ],
})
export class ManagementModule {}
