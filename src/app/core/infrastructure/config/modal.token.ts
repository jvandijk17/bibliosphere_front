import { InjectionToken } from '@angular/core';
import { IModalService } from '../../domain/interfaces/modal.interface';

export const MODAL_SERVICE_TOKEN = new InjectionToken<IModalService>('MODAL_SERVICE_TOKEN');
