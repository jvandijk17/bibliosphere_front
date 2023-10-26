import { Inject, Injectable } from "@angular/core";
import { User } from "src/app/core/domain/models/user.model";
import { IModalService } from "src/app/core/domain/interfaces/modal.interface";
import { UserService } from "src/app/core/application-services/user.service";
import { LoadingService } from "src/app/core/infrastructure/services/loading.service";
import { UserActionStrategy } from "./user-action.strategy";
import { MODAL_SERVICE_TOKEN } from "src/app/core/infrastructure/config/modal.token";

@Injectable({
    providedIn: 'root'
})
export class ToggleUserStatusAction implements UserActionStrategy {

    constructor(
        @Inject(MODAL_SERVICE_TOKEN) private modalService: IModalService,
        private userService: UserService,
        private loadingService: LoadingService
    ) { }

    execute(user: User): void {
        const message = 'Are you sure you want to ' + (user.blocked ? 'un-block' : 'block') + ' this user account?';
        this.modalService.confirmAction(message).afterClosed().subscribe(result => {
            if (result) {
                user.blocked = !user.blocked;
                this.updateUserStatus(user);
            }
        });
    }

    private updateUserStatus(user: User) {
        this.loadingService.setLoading(true);

        this.userService.updateUser(user.id, user).subscribe({
            next: () => {
                const message = 'User successfully ' + (!user.blocked ? 'un-blocked' : 'blocked') + '!';
                this.modalService.showMessage(message);
            },
            error: (error) => {
                console.error('Error updating user status:', error);
                this.loadingService.setLoading(false);
                this.modalService.showMessage('Error updating user status!');
            }
        });
    }

}