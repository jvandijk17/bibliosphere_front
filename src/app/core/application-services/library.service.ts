import { Inject, Injectable } from "@angular/core";
import { Library } from "../domain/models/library.model";
import { ILibraryRepository } from "../domain/interfaces/library-repository.interface";
import { Observable, tap } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class LibraryService {
    private _libraryList: Library[] = [];
    private _previewLibraryList: Library[] = [];

    constructor(
        @Inject('LibraryRepositoryToken') private readonly libraryRepository: ILibraryRepository,
        @Inject('API_DOMAIN') private readonly apiDomain: string
    ) { }

    get libraries(): Library[] {
        return this._libraryList;
    }

    get previewLibraries(): Library[] {
        return this._previewLibraryList;
    }

    fetchAllLibraries(): Observable<Library[]> {
        return this.libraryRepository.getAllLibraries(this.apiDomain).pipe(
            tap(libraries => {
                this._libraryList = libraries;
            })
        )
    }

    fetchAllLibrariesPreview() {
        return this.libraryRepository.getAllLibrariesPreview(this.apiDomain).pipe(
            tap(libraries => {
                this._previewLibraryList = libraries;
            })
        )
    }

    getLibrary(id: number): Observable<Library> {
        return this.libraryRepository.getLibrary(this.apiDomain, id);
    }

    createLibrary(libraryData: Library): Observable<Library> {
        return new Observable((observer) => {
            this.libraryRepository.createLibrary(this.apiDomain, libraryData).subscribe({
                next: (library) => {
                    console.log('Library created successfully: ', library);
                    observer.next(library);
                    observer.complete();
                },
                error: (error) => {
                    console.error('Error creating Library: ', error);
                    observer.error(error);
                }
            });
        });
    }

}