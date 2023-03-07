import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatalogoClientesPageRoutingModule } from './catalogo-clientes-routing.module';

import { CatalogoClientesPage } from './catalogo-clientes.page';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatalogoClientesPageRoutingModule,
    ReactiveFormsModule,
    NgxDropzoneModule
  ],
  declarations: [CatalogoClientesPage]
})
export class CatalogoClientesPageModule {}
