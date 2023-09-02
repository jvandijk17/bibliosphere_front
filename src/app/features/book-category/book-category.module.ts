import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookCategoryRoutingModule } from './book-category-routing.module';
import { BookCategoryComponent } from './book-category.component';


@NgModule({
  declarations: [
    BookCategoryComponent
  ],
  imports: [
    CommonModule,
    BookCategoryRoutingModule
  ]
})
export class BookCategoryModule { }
