import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PagoPlanesPageRoutingModule } from './pago-planes-routing.module';


import { PagoPlanesPage } from './pago-planes.page';
import { NgxPaginationModule } from 'ngx-pagination';
import {NgxTablePaginationModule} from "ngx-table-pagination";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagoPlanesPageRoutingModule,
    NgxPaginationModule,
    NgxTablePaginationModule
  ],
  declarations: [PagoPlanesPage]
})
export class PagoPlanesPageModule {}
