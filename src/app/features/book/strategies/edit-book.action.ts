import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from "src/app/core/domain/models/book.model";
import { BookActionStrategy } from "./book-action.strategy";

@Injectable({
    providedIn: 'root'
})
export class EditBookAction implements BookActionStrategy {

    constructor(private router: Router) { }

    execute(book: Book): void {
        this.router.navigate(['/book/edit', book.id]);
    }
}
