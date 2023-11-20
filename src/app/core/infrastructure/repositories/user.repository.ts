import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../domain/models/user.model';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { USER_ENDPOINTS_TOKEN } from '../config/user-endpoints.token';

@Injectable({
    providedIn: 'root'
})
export class UserRepository implements IUserRepository {

    constructor(
        private http: HttpClient,
        @Inject(USER_ENDPOINTS_TOKEN) private endpoints: Record<string, string>
    ) { }

    getAllUsers(apiDomain: string): Observable<any> {
        return this.http.get(apiDomain + this.endpoints['getAll']);
    }

    getUser(apiDomain: string, userId: number): Observable<User> {
        return this.http.get<User>(apiDomain + this.endpoints['specific'].replace(':id', userId.toString()));
    }

    getRoles(apiDomain: string): Observable<User> {
        return this.http.get<User>(apiDomain + this.endpoints['roles']);
    }

    getCurrentUser(apiDomain: string, email: string): Observable<User> {
        return this.http.get<User>(apiDomain + this.endpoints['byEmail'].replace(':email', email));
    }

    createUser(apiDomain: string, userData: any): Observable<User> {
        return this.http.post<User>(apiDomain + this.endpoints['create'], userData);
    }

    updateUser(apiDomain: string, userId: number, userData: any): Observable<User> {
        return this.http.put<User>(apiDomain + this.endpoints['update'].replace(':id', userId.toString()), userData);
    }

    deleteUser(apiDomain: string, userId: number): Observable<User> {
        return this.http.delete<User>(apiDomain + this.endpoints['delete'].replace(':id', userId.toString()));
    }

}