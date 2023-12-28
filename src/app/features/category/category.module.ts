import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoryService } from 'src/app/core/application-services/category.service';
import { CategoryListConfig } from './category-list/category-list.config';
import { CategoryFormComponent } from './category-form/category-form.component';


@NgModule({
  declarations: [
    CategoryComponent,
    CategoryListComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    CategoryRoutingModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    CategoryService,
    CategoryListConfig
  ]
})
export class CategoryModule { }
