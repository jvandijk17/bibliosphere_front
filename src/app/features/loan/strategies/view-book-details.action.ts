import { Injectable } from "@angular/core";
import { LoanActionStrategy } from "./loan-action.strategy";
import { LoadingService } from "src/app/core/infrastructure/services/loading.service";
import { MatDialog } from "@angular/material/dialog";
import { BookService } from "src/app/core/application-services/book.service";
import { BookDetailsComponent } from "../../book/book-details/book-details.component";

@Injectable({
    providedIn: 'root'
})
export class ViewBookDetailsAction implements LoanActionStrategy {

    constructor(
        private bookService: BookService,
        private loadingService: LoadingService,
        private dialog: MatDialog
    ) { }

    execute(bookId?: number | null): void {
        if (typeof bookId === 'undefined') return;

        this.loadingService.setLoading(true);
        if (bookId) {
            this.bookService.getBook(bookId).subscribe(book => {
                if (book) {
                    this.dialog.open(BookDetailsComponent, {
                        data: { book },
                        width: '400px',
                    });
                    this.loadingService.setLoading(false);
                }
            });
        }
    }

}