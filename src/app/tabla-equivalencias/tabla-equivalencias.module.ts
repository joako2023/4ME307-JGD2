import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablaEquivalenciasPageRoutingModule } from './tabla-equivalencias-routing.module';

import { TablaEquivalenciasPage } from './tabla-equivalencias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TablaEquivalenciasPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [TablaEquivalenciasPage]
})
export class TablaEquivalenciasPageModule {}
