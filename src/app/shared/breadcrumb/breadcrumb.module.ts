import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonUiModule } from '../common-ui.module';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from './breadcrumb.component';

@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    CommonUiModule,
    RouterModule
  ],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }
