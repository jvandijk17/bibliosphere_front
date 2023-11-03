import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookService } from 'src/app/core/application-services/book.service';
import { BookListConfig } from './book-list/book-list.config';

import { LayoutModule } from '@angular/cdk/layout';

import { BookListComponent } from './book-list/book-list.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookFormComponent } from './book-form/book-form.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    BookRoutingModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    BookService,
    BookListConfig
  ]
})
export class BookModule { }
