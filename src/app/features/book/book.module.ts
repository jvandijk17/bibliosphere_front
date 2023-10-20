import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookService } from 'src/app/core/application-services/book.service';

import { LayoutModule } from '@angular/cdk/layout';

import { BookListComponent } from './book-list/book-list.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BookListComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    BookRoutingModule,  
    LayoutModule,
    SharedModule
  ],
  providers: [
    BookService
  ]
})
export class BookModule { }
