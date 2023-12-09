import { Injectable, Inject } from "@angular/core";
import { BookActionStrategy } from "./book-action.strategy";
import { Book } from "src/app/core/domain/models/book.model";
import { IModalService } from "src/app/core/domain/interfaces/modal.interface";
import { MODAL_SERVICE_TOKEN } from "src/app/core/infrastructure/config/modal.token";
import { NotificationService } from "src/app/core/application-services/notification.service";
import { BookService } from "src/app/core/application-services/book.service";
import { LoadingService } from "src/app/core/infrastructure/services/loading.service";
import { BookUpdateService } from "src/app/core/application-services/book-update.service";

@Injectable({
    providedIn: 'root'
})
export class DeleteBookAction implements BookActionStrategy {

    constructor(
        @Inject(MODAL_SERVICE_TOKEN) private modalService: IModalService,
        private bookService: BookService,
        private notificationService: NotificationService,
        private loadingService: LoadingService,
        private bookUpdateService: BookUpdateService
    ) { }

    execute(book: Book): void {
        if (book.activeLoanId) {
            this.notificationService.showAlert('Book is currently loaned. Return the book before deletion.');
        } else {
            const dialogRef = this.modalService.confirmAction('Are you sure you want to delete this book?');
            dialogRef.afterClosed().subscribe(result => {
                if (result) {
                    this.loadingService.setLoading(true);
                    this.bookService.deleteBook(book.id).subscribe({
                        next: () => {
                            this.loadingService.setLoading(false);
                            this.bookUpdateService.updateBookOnDeletion(this.books, book.id, message => {
                                this.notificationService.showAlert(message);
                            });
                        },
                        error: (error) => {
                            this.loadingService.setLoading(false);
                            this.notificationService.showAlert('Error deleting book: ' + error.message);
                        }
                    });
                }
            });
        }
    }
}
