import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from './common-ui.module';
import { GenericTableComponent } from './generic-table/generic-table.component';
import { GenericFormComponent } from './generic-form/generic-form.component';
import { GenericDetailComponent } from './generic-detail/generic-detail.component';
import { DynamicPipe } from './pipes/dynamic-pipe.pipe';
import { BreadcrumbModule } from './breadcrumb/breadcrumb.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    GenericTableComponent,
    GenericFormComponent,
    GenericDetailComponent,
    GenericDetailComponent,
    DynamicPipe,
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    BreadcrumbModule
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    GenericTableComponent,
    GenericFormComponent,
    GenericDetailComponent,
    DynamicPipe,
    BreadcrumbModule
  ]
})
export class SharedModule { }
