import { InjectionToken } from '@angular/core';
import { IStorageService } from '../../domain/interfaces/storage.interface';

export const STORAGE_SERVICE_TOKEN = new InjectionToken<IStorageService>('STORAGE_SERVICE_TOKEN');
