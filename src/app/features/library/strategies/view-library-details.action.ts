import { Inject, Injectable } from "@angular/core";
import { Library } from "src/app/core/domain/models/library.model";
import { IModalService } from "src/app/core/domain/interfaces/modal.interface";
import { MODAL_SERVICE_TOKEN } from "src/app/core/infrastructure/config/modal.token";
import { LibraryActionStrategy } from "./library-action.strategy";

@Injectable({
    providedIn: 'root'
})
export class ViewLibraryDetailsAction implements LibraryActionStrategy {

    constructor(@Inject(MODAL_SERVICE_TOKEN) private modalService: IModalService) { }

    execute(library: Library): void {
        this.modalService.openLibraryDetailsModal(library);
    }

}