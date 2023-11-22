import { Component, ChangeDetectorRef, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/core/application-services/book.service';
import { Book } from 'src/app/core/domain/models/book.model';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent {

  @Input() book: Book | null = null;

  constructor(private bookService: BookService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.bookService.getBook(+id).subscribe(book => {
        this.book = book;
        this.cdr.detectChanges();
      });
    }

  }

}
