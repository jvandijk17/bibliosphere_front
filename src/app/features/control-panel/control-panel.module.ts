import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { ControlPanelComponent } from './control-panel.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    ControlPanelComponent
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class ControlPanelModule { }
