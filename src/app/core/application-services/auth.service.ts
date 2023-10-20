import { Injectable, Inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { IJwtHandler } from '../domain/interfaces/jwt-handler.interface';
import { IStorageService } from '../domain/interfaces/storage.interface';
import { IAuthRepository } from '../domain/interfaces/auth-repository.interface';
import { STORAGE_SERVICE_TOKEN } from '../infrastructure/config/storage.token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public entityRoles: any = {};

    constructor(
        @Inject('AuthRepositoryToken') private authRepository: IAuthRepository,
        @Inject('JwtHandlerToken') private jwtHandler: IJwtHandler,
        @Inject(STORAGE_SERVICE_TOKEN) private storageService: IStorageService,
        @Inject('API_DOMAIN') private apiDomain: string
    ) { }
    get isAuthorized(): boolean {
        return !this.jwtHandler.isTokenExpired(this.storageService.getItem('access_token'));
    }

    get userRoles(): string[] {
        const token = this.storageService.getItem('access_token');
        if (!token) return [];
        const decodedToken = this.jwtHandler.decodeToken(token);
        return decodedToken.roles || [];
    }

    get authorizationHeaderValue(): string {
        return 'Bearer ' + this.storageService.getItem('access_token');
    }

    get fetchEntityRoles() {
        return this.authRepository.getRoles(this.apiDomain).pipe(
            tap(roles => {
                this.entityRoles = roles;
            })
        );
    }

    getCurrentUserEmail(): string {
        const userData = JSON.parse(this.storageService.getItem('currentUser') || '{}');
        return userData.email || '';
    }

    login(email: string, password: string) {
        return this.authRepository.login(this.apiDomain, email, password).pipe(
            tap(res => {
                this.storageService.setItem('access_token', res.token);
                this.storageService.setItem('hasLoggedInBefore', 'true');
                this.storageService.setItem('currentUser', JSON.stringify({ email }));
            })
        );
    }

    logout(expiration: boolean): void {
        if (expiration) {
            this.storageService.removeItem('hasLoggedInBefore');
        }
        this.storageService.removeItem('access_token');
    }

    register(user: any) {
        return this.authRepository.register(this.apiDomain, user);
    }
}
