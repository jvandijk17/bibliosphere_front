import { Library } from "src/app/core/domain/models/library.model";

export interface LibraryActionStrategy {
    execute(library: Library): void
}