import { HttpClient } from "@angular/common/http";
import { Injectable, Inject } from "@angular/core";
import { User } from "../domain/models/user.model";
import { Observable } from "rxjs";
import { USER_ENDPOINTS } from '../infrastructure/config/user-endpoints.config';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient, @Inject('API_DOMAIN') private apiDomain: string) { }

    getAllUsers() {
        return this.http.get<User[]>(this.apiDomain + USER_ENDPOINTS.getAll);
    }

    getUserRoles() {
        return this.http.get<User>(`${this.apiDomain}${USER_ENDPOINTS.roles}`);
    }

    getUser(id: number) {
        return this.http.get<User>(`${this.apiDomain}${USER_ENDPOINTS.specific.replace(':id', id.toString())}`);
    }

    getCurrentUser(email: string) {
        return this.http.get<User>(`${this.apiDomain}${USER_ENDPOINTS.byEmail.replace(':email', email)}`);
    }

    createUser(user: User) {
        return this.http.post(this.apiDomain + USER_ENDPOINTS.create, user);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${this.apiDomain}${USER_ENDPOINTS.update.replace(':id', id.toString())}`, user);
    }

    deleteUser(id: number) {
        return this.http.delete(`${this.apiDomain}${USER_ENDPOINTS.delete.replace(':id', id.toString())}`);
    }

}
