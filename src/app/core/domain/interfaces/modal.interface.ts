import { MatDialogRef } from "@angular/material/dialog";
import { User } from "../models/user.model";
import { Book } from "../models/book.model";
import { UserDetailsComponent } from "src/app/features/user/user-details/user-details.component";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { BookDetailsComponent } from "src/app/features/book/book-details/book-details.component";
import { LibraryDetailsComponent } from "src/app/features/library/library-details/library-details.component";
import { Library } from "../models/library.model";

export interface IModalService {
    openUserDetailsModal(user: User): MatDialogRef<UserDetailsComponent>;
    openBookDetailsModal(book: Book): MatDialogRef<BookDetailsComponent>
    openLibraryDetailsModal(library: Library): MatDialogRef<LibraryDetailsComponent>
    confirmAction(message: string): MatDialogRef<AlertComponent>;
    showMessage(message: string): MatDialogRef<AlertComponent>;
}