import { Observable } from "rxjs";

export interface IBookRepository {

    getAllBooks(apiDomain: string): Observable<any>;

}