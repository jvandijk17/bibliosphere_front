import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IErrorHandler } from '../../domain/interfaces/error-handler.interface';
import { IAuthRepository } from '../../domain/interfaces/auth-repository.interface';
import { AUTH_ENDPOINTS_TOKEN } from '../config/auth-endpoints.token';

@Injectable({
    providedIn: 'root'
})
export class AuthRepository implements IAuthRepository {

    constructor(
        private http: HttpClient,
        @Inject('ErrorHandlerToken') private errorHandler: IErrorHandler,
        @Inject(AUTH_ENDPOINTS_TOKEN) private endpoints: Record<string, string>
    ) { }


    getRoles(apiDomain: string): Observable<any> {
        return this.http.get(apiDomain + this.endpoints['roles']).pipe(
            catchError(this.handleError)
        );
    }

    login(apiDomain: string, email: string, password: string): Observable<{ token: string }> {
        return this.http.post<{ token: string }>(apiDomain + this.endpoints['login'], { email, password }).pipe(
            catchError(this.handleError)
        );
    }

    register(apiDomain: string, user: any): Observable<any> {
        return this.http.post(apiDomain + this.endpoints['register'], user).pipe(
            catchError(this.handleError)
        );
    }

    private handleError(error: any): Observable<never> {
        return this.errorHandler.handleError(error);
    }
}
