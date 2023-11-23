import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/core/domain/models/book.model';
import { BookListConfig } from '../book-list/book-list.config';
import { DetailConfig } from 'src/app/shared/models/detail-config.model';
import { RoleService } from 'src/app/core/application-services/role.service';

@Component({
  selector: 'app-book-details-modal',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {

  bookConfig: DetailConfig[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { book: Book },
    private bookListConfig: BookListConfig,
    private roleService: RoleService
  ) {
    const columns = this.bookListConfig.getColumnsByRole(this.roleService, () => { }, () => { });
    this.bookConfig = this.bookListConfig.toDetailConfig(columns, this.data.book);
  }

}
