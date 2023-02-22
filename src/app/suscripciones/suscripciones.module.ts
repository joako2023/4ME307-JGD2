import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuscripcionesPageRoutingModule } from './suscripciones-routing.module';

import { SuscripcionesPage } from './suscripciones.page';
import { NgxTablePaginationModule } from 'ngx-table-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuscripcionesPageRoutingModule,
    ReactiveFormsModule,
    NgxTablePaginationModule
  ],
  declarations: [SuscripcionesPage]
})
export class SuscripcionesPageModule {}
