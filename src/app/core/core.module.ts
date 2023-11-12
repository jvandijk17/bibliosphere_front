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
import { ModalService } from './infrastructure/services/modal.service';
import { MODAL_SERVICE_TOKEN } from './infrastructure/config/modal.token';
import { CategoryRepository } from './infrastructure/repositories/category.repository';
import { BookCategoryRepository } from './infrastructure/repositories/book-category.repository';
import { CATEGORY_ENDPOINTS_TOKEN } from './infrastructure/config/category-endpoints.token';
import { BOOK_CATEGORY_ENDPOINTS_TOKEN } from './infrastructure/config/book-category-endpoints.token';
import { BOOK_CATEGORY_ENDPOINTS } from './infrastructure/config/book-category-endpoints.config';
import { CATEGORY_ENDPOINTS } from './infrastructure/config/category-endpoints.config';
import { LOAN_ENDPOINTS_TOKEN } from './infrastructure/config/loan-endpoints.token';
import { LOAN_ENDPOINTS } from './infrastructure/config/loan-endpoints.config';
import { LoanRepository } from './infrastructure/repositories/loan.repository';
import { LIBRARY_ENDPOINTS_TOKEN } from './infrastructure/config/library-endpoints.token';
import { LIBRARY_ENDPOINTS } from './infrastructure/config/library-endpoints.config';
import { LibraryRepository } from './infrastructure/repositories/library.repository';

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
    { provide: 'CategoryRepositoryToken', useClass: CategoryRepository },
    { provide: 'BookRepositoryToken', useClass: BookRepository },
    { provide: 'BookCategoryRepositoryToken', useClass: BookCategoryRepository },
    { provide: 'LoanRepositoryToken', useClass: LoanRepository },
    { provide: 'LibraryRepositoryToken', useClass: LibraryRepository },
    { provide: 'JwtHandlerToken', useClass: JwtHandlerService },
    { provide: 'ErrorHandlerToken', useClass: ErrorHandlerService },
    { provide: AUTH_ENDPOINTS_TOKEN, useValue: AUTH_ENDPOINTS },
    { provide: BOOK_ENDPOINTS_TOKEN, useValue: BOOK_ENDPOINTS },
    { provide: CATEGORY_ENDPOINTS_TOKEN, useValue: CATEGORY_ENDPOINTS },
    { provide: BOOK_CATEGORY_ENDPOINTS_TOKEN, useValue: BOOK_CATEGORY_ENDPOINTS },
    { provide: LIBRARY_ENDPOINTS_TOKEN, useValue: LIBRARY_ENDPOINTS },
    { provide: LOAN_ENDPOINTS_TOKEN, useValue: LOAN_ENDPOINTS },
    { provide: MODAL_SERVICE_TOKEN, useClass: ModalService },
    { provide: STORAGE_SERVICE_TOKEN, useClass: StorageService }
  ],
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
