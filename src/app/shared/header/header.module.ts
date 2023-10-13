import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { CommonUiModule } from '../common-ui.module';


@NgModule({
    declarations: [
        HeaderComponent
    ],
    imports: [
        CommonModule,
        CommonUiModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class HeaderModule { }
