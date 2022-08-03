import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ControlPagosPageRoutingModule } from './control-pagos-routing.module';

import { ControlPagosPage } from './control-pagos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ControlPagosPageRoutingModule
  ],
  declarations: [ControlPagosPage]
})
export class ControlPagosPageModule {}
