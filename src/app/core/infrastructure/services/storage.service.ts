import { Injectable } from '@angular/core';
import { IStorageService } from '../../domain/interfaces/storage.interface';

@Injectable({
    providedIn: 'root'
})
export class StorageService implements IStorageService {

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    removeItem(key: string): void {
        localStorage.removeItem(key);
    }

}
