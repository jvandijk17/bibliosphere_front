import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { ControlPanelComponent } from './control-panel.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { CommonUiModule } from 'src/app/shared/common-ui.module';



@NgModule({
  declarations: [
    ControlPanelComponent
  ],
  imports: [
    CommonModule,
    CommonUiModule,
    ControlPanelRoutingModule,
    MatGridListModule    

  ]
})
export class ControlPanelModule { }
