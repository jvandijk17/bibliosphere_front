import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Library } from "../../domain/models/library.model";
import { ILibraryRepository } from "../../domain/interfaces/library-repository.interface";
import { LIBRARY_ENDPOINTS_TOKEN } from "../config/library-endpoints.token";

@Injectable({
    providedIn: 'root'
})
export class LibraryRepository implements ILibraryRepository {

    constructor(
        private http: HttpClient,
        @Inject(LIBRARY_ENDPOINTS_TOKEN) private endpoints: Record<string, string>
    ) { }

    getAllLibraries(apiDomain: string): Observable<any> {
        return this.http.get(apiDomain + this.endpoints['getAll']);
    }

    getAllLibrariesPreview(apiDomain: string): Observable<any> {
        return this.http.get(apiDomain + this.endpoints['preview']);
    }

    getLibrary(apiDomain: string, id: number): Observable<Library> {
        return this.http.get<Library>(apiDomain + this.endpoints['specific'].replace(':id', id.toString()));
    }

    createLibrary(apiDomain: string, libraryData: any): Observable<Library> {
        return this.http.post<Library>(apiDomain + this.endpoints['create'], libraryData);
    }

    updateLibrary(apiDomain: string, libraryId: number, libraryData: any): Observable<Library> {
        return this.http.put<Library>(apiDomain + this.endpoints['update'].replace(':id', libraryId.toString()), libraryData);
    }

}