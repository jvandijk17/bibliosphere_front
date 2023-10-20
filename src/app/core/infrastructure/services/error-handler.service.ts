import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IErrorHandler } from '../../domain/interfaces/error-handler.interface';

@Injectable({
    providedIn: 'root'
})
export class ErrorHandlerService implements IErrorHandler {

    public handleError(error: any): Observable<never> {
        return throwError(() => error);
    }
}
