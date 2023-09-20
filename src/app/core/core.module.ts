import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from './components/header/header.module';
import { AlertModule } from './components/alert/alert.module';

@NgModule({
  imports: [
    CommonModule,
    HeaderModule,
    AlertModule
  ],
  exports: [
    HeaderModule,
    AlertModule
  ]
})
export class CoreModule { }
