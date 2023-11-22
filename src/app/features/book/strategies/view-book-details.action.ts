import { Inject, Injectable } from "@angular/core";
import { Book } from "src/app/core/domain/models/book.model";
import { IModalService } from "src/app/core/domain/interfaces/modal.interface";
import { MODAL_SERVICE_TOKEN } from "src/app/core/infrastructure/config/modal.token";
import { BookActionStrategy } from "./book-action.strategy";

@Injectable({
    providedIn: 'root'
})
export class ViewBookDetailsAction implements BookActionStrategy {

    constructor(@Inject(MODAL_SERVICE_TOKEN) private modalService: IModalService) { }

    execute(book: Book): void {
        this.modalService.openBookDetailsModal(book);
    }

}