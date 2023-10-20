import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IJwtHandler } from '../../domain/interfaces/jwt-handler.interface';

@Injectable({
    providedIn: 'root'
})
export class JwtHandlerService implements IJwtHandler {
    constructor(private jwtHelper: JwtHelperService) { }

    isTokenExpired(token: string | null): boolean {
        if (!token) return true;
        return this.jwtHelper.isTokenExpired(token);
    }

    decodeToken(token: string | null): any {
        if (!token) return null;
        return this.jwtHelper.decodeToken(token);
    }
}
