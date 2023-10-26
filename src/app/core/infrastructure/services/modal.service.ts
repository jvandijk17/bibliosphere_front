import { Injectable } from '@angular/core'
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { UserDetailsModalComponent } from "src/app/features/user/user-details-modal/user-details-modal.component";
import { User } from "../../domain/models/user.model";
import { AlertComponent } from "src/app/shared/alert/alert.component";
import { IModalService } from "../../domain/interfaces/modal.interface";

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
