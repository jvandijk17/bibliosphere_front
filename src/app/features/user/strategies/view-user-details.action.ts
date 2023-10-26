import { Inject, Injectable } from "@angular/core"
import { User } from "src/app/core/domain/models/user.model";
import { IModalService } from "src/app/core/domain/interfaces/modal.interface";
import { MODAL_SERVICE_TOKEN } from "src/app/core/infrastructure/config/modal.token";
import { UserActionStrategy } from "./user-action.strategy";

@Injectable({
    providedIn: 'root'
})
export class ViewUserDetailsAction implements UserActionStrategy {

    constructor(@Inject(MODAL_SERVICE_TOKEN) private modalService: IModalService) { }

    execute(user: User): void {
        this.modalService.openUserDetailsModal(user);
    }

}