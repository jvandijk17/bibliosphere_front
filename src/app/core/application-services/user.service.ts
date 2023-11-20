import { Injectable, Inject } from "@angular/core";
import { User } from "../domain/models/user.model";
import { Observable, tap } from "rxjs";
import { USER_ENDPOINTS } from '../infrastructure/config/user-endpoints.config';
import { IUserRepository } from "../domain/interfaces/user-repository.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _userList: User[] = [];

    constructor(
        @Inject('UserRepositoryToken') private readonly userRepository: IUserRepository,
        @Inject('API_DOMAIN') private readonly apiDomain: string
    ) { }

    get users(): User[] {
        return this._userList;
    }

    fetchAllUsers(): Observable<User[]> {
        return this.userRepository.getAllUsers(this.apiDomain).pipe(
            tap(users => {
                this._userList = users;
            })
        )
    }

    getRoles() {
        return this.userRepository.getRoles(this.apiDomain);
    }

    getUser(id: number) {
        return this.userRepository.getUser(this.apiDomain, +id);
    }

    getCurrentUser(email: string) {
        return this.userRepository.getCurrentUser(this.apiDomain, email);
    }

    createUser(user: User) {
        return this.userRepository.createUser(this.apiDomain, user);
    }

    updateUser(id: number, user: User): Observable<User> {
        return this.userRepository.updateUser(this.apiDomain, +id, user);
    }

    deleteUser(id: number) {
        return this.userRepository.deleteUser(this.apiDomain, +id);
    }

}
