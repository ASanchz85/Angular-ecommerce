import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GlobalRoutingModule } from './global-routing.module';
import { RolesDirective } from './directives/roles.directive';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    RolesDirective
  ],
  imports: [
    CommonModule,
    GlobalRoutingModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    RolesDirective
  ]
})
export class GlobalModule { }
