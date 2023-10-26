import { MatDialogRef } from "@angular/material/dialog";
import { User } from "../models/user.model";
import { UserDetailsModalComponent } from "src/app/features/user/user-details-modal/user-details-modal.component";
import { AlertComponent } from "src/app/shared/alert/alert.component";

export interface IModalService {
    openUserDetailsModal(user: User): MatDialogRef<UserDetailsModalComponent>;
    confirmAction(message: string): MatDialogRef<AlertComponent>;
    showMessage(message: string): MatDialogRef<AlertComponent>;
}