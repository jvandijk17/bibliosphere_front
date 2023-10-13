import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
})

export class RoleService {

    constructor(private authService: AuthService) { }

    get isAdmin(): boolean {
        return this.authService.userRoles.includes('ROLE_ADMIN');
    }

}
