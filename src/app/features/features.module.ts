import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { JwtInterceptor } from '../core/interceptors/jwt.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { ForbiddenInterceptor } from '../core/interceptors/forbidden.interceptor';
import { UnauthorizedInterceptor } from '../core/interceptors/unauthorized.interceptor';

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
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: UnauthorizedInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ForbiddenInterceptor, multi: true }
    ]
})
export class FeaturesModule { }
