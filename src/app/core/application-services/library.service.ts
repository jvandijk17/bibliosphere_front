import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Library } from "../domain/models/library.model";
import { LIBRARY_ENDPOINTS } from "../infrastructure/config/LIBRARY-endpoints.config";

@Injectable({
    providedIn: 'root'
})

export class LibraryService {

    constructor(private http: HttpClient, @Inject('API_DOMAIN') private apiDomain: string) { }

    getAllLibraries() {
        return this.http.get<Library[]>(this.apiDomain + LIBRARY_ENDPOINTS.getAll)
    }

    getLibrary(id: number) {
        return this.http.get<Library>(this.apiDomain + LIBRARY_ENDPOINTS.getAll);
    }

    getAllLibrariesPreview() {
        return this.http.get<Library[]>(this.apiDomain + LIBRARY_ENDPOINTS.preview)
    }

}