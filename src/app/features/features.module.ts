import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { JwtInterceptor } from '../core/interceptors/jwt.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControlPanelModule } from './control-panel/control-panel.module';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule
    ],
    exports: [
        AccountModule,
        UserModule,
        ControlPanelModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
    ]
})
export class FeaturesModule { }
