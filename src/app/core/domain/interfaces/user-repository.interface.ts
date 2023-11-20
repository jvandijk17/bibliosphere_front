import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface IUserRepository {

    getAllUsers(apiDomain: string): Observable<any>;
    getUser(apiDomain: string, userId: number): Observable<User>;
    getRoles(apiDomain: string): Observable<User>;
    getCurrentUser(apiDomain: string, email: string): Observable<User>;
    createUser(apiDomain: string, userData: any): Observable<User>;
    updateUser(apiDomain: string, userId: number, userData: any): Observable<User>;
    deleteUser(apiDomain: string, userId: number): Observable<User>;

}