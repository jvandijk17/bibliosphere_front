import { Observable } from 'rxjs';
import { User } from '../models/user.model';

export interface IAuthRepository {
    getRoles(apiDomain: string): Observable<any>;
    login(apiDomain: string, email: string, password: string): Observable<{ token: string }>;
    register(apiDomain: string, user: User): Observable<any>;
}