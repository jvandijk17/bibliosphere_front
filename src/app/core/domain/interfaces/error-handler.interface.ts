import { Observable } from 'rxjs';

export interface IErrorHandler {
    handleError(error: any): Observable<never>;
}