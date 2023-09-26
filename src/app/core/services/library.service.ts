import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Library } from "../models/library.model";

@Injectable({
    providedIn: 'root'
})

export class LibraryService {

    constructor(private http: HttpClient) { }

    getAllLibraries() {
        return this.http.get<Library[]>(environment.apiDomain + '/library')
    }

    getLibrary(id: number) {
        return this.http.get<Library>(`${environment.apiDomain}/library/${id}`);
    }    

    getAllLibrariesPreview() {
        return this.http.get<Library[]>(environment.apiDomain + '/library/preview_libraries')
    }

}