import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../domain/models/user.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private http: HttpClient) { }

    getAllUsers() {
        return this.http.get<User[]>(environment.apiDomain + '/user');
    }

    getUserRoles() {
        return this.http.get<User>(`${environment.apiDomain}/user/roles`);
    }

    getUser(id: number) {
        return this.http.get<User>(`${environment.apiDomain}/user/${id}`);
    }

    getCurrentUser(email: string) {
        return this.http.get<User>(`${environment.apiDomain}/user/${email}`);
    }

    createUser(user: User) {
        return this.http.post(environment.apiDomain + '/user/', user);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.http.put<User>(`${environment.apiDomain}/user/${id}`, user);
    }

    deleteUser(id: number) {
        return this.http.delete(`${environment.apiDomain}/user/${id}`);
    }

}