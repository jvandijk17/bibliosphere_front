import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Library } from "src/app/core/domain/models/library.model";
import { LibraryActionStrategy } from "./library-action.strategy";

@Injectable({
    providedIn: 'root'
})
export class EditLibraryAction implements LibraryActionStrategy {

    constructor(private router: Router) { }

    execute(library: Library): void {
        this.router.navigate(['/library/edit', library.id]);
    }

}