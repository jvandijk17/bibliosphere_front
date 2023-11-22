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
import { BookDetailsModalComponent } from './book-details-modal/book-details-modal.component';
import { BookDetailComponent } from './book-detail/book-detail.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookFormComponent,
    BookDetailsModalComponent,
    BookDetailComponent
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
