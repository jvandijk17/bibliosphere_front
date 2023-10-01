import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public entityRoles: any = {};

    constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

    get isAuthorized(): boolean {
        return !this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'));
    }

    get userRoles(): string[] {
        const token = localStorage.getItem('access_token');
        if (!token) return [];
        const decodedToken = this.jwtHelper.decodeToken(token);
        return decodedToken.roles || [];
    }

    get authorizationHeaderValue(): string {
        return 'Bearer ' + localStorage.getItem('access_token');
    }


    get fetchEntityRoles() {
        return this.http.get(environment.apiDomain + '/roles').pipe(
            tap(roles => {
                this.entityRoles = roles;
            })
        );
    }

    getCurrentUserEmail(): string {
        const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
        return userData.email || '';
    }

    login(email: string, password: string) {
        return this.http.post<{ token: string }>(environment.apiDomain + '/login_check', { email, password }).pipe(
            tap(res => {
                localStorage.setItem('access_token', res.token);
                localStorage.setItem('hasLoggedInBefore', 'true');
                localStorage.setItem('currentUser', JSON.stringify({ email }));
            })
        );
    }

    logout(expiration: boolean): void {
        if (expiration) {
            localStorage.removeItem('hasLoggedInBefore');
        }
        localStorage.removeItem('access_token');
    }


    register(user: any) {
        return this.http.post(environment.apiDomain + '/user/', user);
    }
}