import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './common-ui.module';
import { GenericTableComponent } from './generic-table/generic-table.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    GenericTableComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    GenericTableComponent
  ]
})
export class SharedModule { }
