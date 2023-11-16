import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibraryRoutingModule } from './library-routing.module';
import { LibraryComponent } from './library.component';
import { LibraryListComponent } from './library-list/library-list.component';
import { CommonUiModule } from 'src/app/shared/common-ui.module';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryService } from 'src/app/core/application-services/library.service';
import { LibraryListConfig } from './library-list/library-list.config';
import { LibraryFormComponent } from './library-form/library-form.component';


@NgModule({
  declarations: [
    LibraryComponent,
    LibraryListComponent,
    LibraryFormComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    LibraryRoutingModule,
    LayoutModule,
    SharedModule
  ],
  providers: [
    LibraryService,
    LibraryListConfig
  ]
})
export class LibraryModule { }
