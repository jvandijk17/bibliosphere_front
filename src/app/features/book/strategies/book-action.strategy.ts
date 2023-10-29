import { Book } from "src/app/core/domain/models/book.model";

export interface BookActionStrategy {
    execute(book: Book): void
}