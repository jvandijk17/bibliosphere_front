import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../../application-services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (this.authService.isAuthorized) {
            request = request.clone({
                setHeaders: {
                    Authorization: this.authService.authorizationHeaderValue
                }
            });
        }
        return next.handle(request);
    }

}