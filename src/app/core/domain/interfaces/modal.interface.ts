import { MatDialogRef } from "@angular/material/dialog";
import { User } from "../models/user.model";
import { Book } from "../models/book.model";
import { UserDetailsModalComponent } from "src/app/features/user/user-details-modal/user-details-modal.component";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { BookDetailsModalComponent } from "src/app/features/book/book-details-modal/book-details-modal.component";

export interface IModalService {
    openUserDetailsModal(user: User): MatDialogRef<UserDetailsModalComponent>;
    openBookDetailsModal(book: Book): MatDialogRef<BookDetailsModalComponent>
    confirmAction(message: string): MatDialogRef<AlertComponent>;
    showMessage(message: string): MatDialogRef<AlertComponent>;
}