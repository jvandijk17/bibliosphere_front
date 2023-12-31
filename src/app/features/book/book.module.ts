import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookService } from 'src/app/core/application-services/book.service';
import { BookListConfig } from './book-list/book-list.config';

import { LayoutModule } from '@angular/cdk/layout';

import { BookListComponent } from './book-list/book-list.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookFormComponent } from './book-form/book-form.component';
import { BookDetailsComponent } from './book-details/book-details.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookFormComponent,
    BookDetailsComponent,
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
    BookListConfig,
    DatePipe
  ]
})
export class BookModule { }
