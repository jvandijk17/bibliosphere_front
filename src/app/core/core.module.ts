import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertModule } from '../shared/alert/alert.module';
import { AuthService } from './application-services/auth.service';
import { StorageService } from './infrastructure/services/storage.service';
import { AuthRepository } from './infrastructure/repositories/auth.repository';
import { environment } from 'src/environments/environment';
import { STORAGE_SERVICE_TOKEN } from './infrastructure/config/storage.token';
import { AUTH_ENDPOINTS_TOKEN } from './infrastructure/config/auth-endpoints.token';
import { AUTH_ENDPOINTS } from './infrastructure/config/auth-endpoints.config';
import { JwtHandlerService } from './infrastructure/services/jwt-handler.service';
import { ErrorHandlerService } from './infrastructure/services/error-handler.service';
import { BookRepository } from './infrastructure/repositories/book.repository';
import { BOOK_ENDPOINTS_TOKEN } from './infrastructure/config/book-endpoints.token';
import { BOOK_ENDPOINTS } from './infrastructure/config/book-endpoints.config';

@NgModule({
  imports: [
    CommonModule,
    AlertModule
  ],
  providers: [
    AuthService,
    AuthRepository,
    { provide: 'API_DOMAIN', useValue: environment.apiDomain },
    { provide: 'AuthRepositoryToken', useClass: AuthRepository },
    { provide: 'BookRepositoryToken', useClass: BookRepository },
    { provide: AUTH_ENDPOINTS_TOKEN, useValue: AUTH_ENDPOINTS },
    { provide: BOOK_ENDPOINTS_TOKEN, useValue: BOOK_ENDPOINTS },
    { provide: STORAGE_SERVICE_TOKEN, useClass: StorageService },
    { provide: 'JwtHandlerToken', useClass: JwtHandlerService },
    { provide: 'ErrorHandlerToken', useClass: ErrorHandlerService },
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
