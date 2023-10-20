import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountModule } from './account/account.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserModule } from './user/user.module';
import { JwtInterceptor } from '../core/infrastructure/interceptors/jwt.interceptor';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ControlPanelModule } from './control-panel/control-panel.module';
import { ForbiddenInterceptor } from '../core/infrastructure/interceptors/forbidden.interceptor';
import { UnauthorizedInterceptor } from '../core/infrastructure/interceptors/unauthorized.interceptor';
import { SharedModule } from '../shared/shared.module';
import { CommonUiModule } from '../shared/common-ui.module';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
    imports: [
        CommonModule,
        CommonUiModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        LayoutModule,
        SharedModule
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
