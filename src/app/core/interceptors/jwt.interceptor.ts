import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (this.authService.isAuthorized) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.authService.authorizationHeaderValue
                }
            })
        } else {
            this.authService.logout(false);
            this.router.navigate(['/account/login']);
        }
        return next.handle(request);
    }

}