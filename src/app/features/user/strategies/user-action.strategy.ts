import { User } from "src/app/core/domain/models/user.model";

export interface UserActionStrategy {
    execute(user: User): void;
}