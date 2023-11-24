import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserDetailsComponent } from "src/app/features/user/user-details/user-details.component";
import { User } from "../../domain/models/user.model";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { IModalService } from "../../domain/interfaces/modal.interface";
import { BookDetailsComponent } from 'src/app/features/book/book-details/book-details.component';
import { Book } from '../../domain/models/book.model';
import { LibraryDetailsComponent } from 'src/app/features/library/library-details/library-details.component';
import { Library } from '../../domain/models/library.model';

@Injectable({
    providedIn: 'root'
})
export class ModalService implements IModalService {

    constructor(private dialog: MatDialog) { }

    openUserDetailsModal(user: User): MatDialogRef<UserDetailsComponent> {
        return this.dialog.open(UserDetailsComponent, {
            data: { user },
            width: '500px',
        });
    }

    openBookDetailsModal(book: Book): MatDialogRef<BookDetailsComponent> {
        return this.dialog.open(BookDetailsComponent, {
            data: { book },
            width: '400px',
        });
    }

    openLibraryDetailsModal(library: Library): MatDialogRef<LibraryDetailsComponent> {
        return this.dialog.open(LibraryDetailsComponent, {
            data: { library },
            width: '400px',
        });
    }

    confirmAction(message: string): MatDialogRef<AlertComponent> {
        return this.dialog.open(AlertComponent, {
            width: '250px',
            data: { message: message, confirm: true }
        });
    }

    showMessage(message: string): MatDialogRef<AlertComponent> {
        return this.dialog.open(AlertComponent, {
            width: '250px',
            data: { message: message }
        });
    }
}
