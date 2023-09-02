import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        CommonModule,
        AccountModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    exports: [
        AccountModule
    ]
})
export class FeaturesModule { }
