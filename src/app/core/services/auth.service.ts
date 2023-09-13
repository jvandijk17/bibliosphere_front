import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(private http: HttpClient) { }

    get isAuthorized(): boolean {
        return !!localStorage.getItem('access_token');
    }

    get authorizationHeaderValue(): string {
        return 'Bearer ' + localStorage.getItem('access_token');
    }

    login(email: string, password: string) {
        return this.http.post<{ token: string }>(environment.apiDomain + '/login_check', { email, password }).pipe(
            tap(res => {
                localStorage.setItem('access_token', res.token);
            })
        );
    }

    register(user: any) {
        return this.http.post(environment.apiDomain + '/user/', user);
    }
}