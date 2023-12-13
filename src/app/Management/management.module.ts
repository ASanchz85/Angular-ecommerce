import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { ManagementMainComponent } from './management-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GlobalModule } from '../Global/global.module';
import { GlobalRoutingModule } from '../Global/global-routing.module';

@NgModule({
  declarations: [
    ManagementMainComponent,
    CreateProductComponent,
    ListProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GlobalModule,
    GlobalRoutingModule,
  ],
})
export class ManagementModule {}
