import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './common-ui.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,    
    CommonUiModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
