import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserDetailsModalComponent } from "src/app/features/user/user-details-modal/user-details-modal.component";
import { User } from "../../domain/models/user.model";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { IModalService } from "../../domain/interfaces/modal.interface";
import { BookDetailsModalComponent } from 'src/app/features/book/book-details-modal/book-details-modal.component';
import { Book } from '../../domain/models/book.model';

@Injectable({
    providedIn: 'root'
})
export class ModalService implements IModalService {

    constructor(private dialog: MatDialog) { }

    openUserDetailsModal(user: User): MatDialogRef<UserDetailsModalComponent> {
        return this.dialog.open(UserDetailsModalComponent, {
            data: { user },
            width: '400px',
        });
    }

    openBookDetailsModal(book: Book): MatDialogRef<BookDetailsModalComponent> {
        return this.dialog.open(BookDetailsModalComponent, {
            data: { book },
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
