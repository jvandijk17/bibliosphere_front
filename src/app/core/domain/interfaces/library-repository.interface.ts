import { Observable } from "rxjs";
import { Library } from "../models/library.model";

export interface ILibraryRepository {

    getAllLibraries(apiDomain: string): Observable<any>;
    getAllLibrariesPreview(apiDomain: string): Observable<any>;
    getLibrary(apiDomain: string, id: number): Observable<Library>;
    createLibrary(apiDomain: string, libraryData: any): Observable<Library>;

}