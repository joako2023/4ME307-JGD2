import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LibreriaAlimentosPageRoutingModule } from './libreria-alimentos-routing.module';

import { LibreriaAlimentosPage } from './libreria-alimentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LibreriaAlimentosPageRoutingModule
  ],
  declarations: [LibreriaAlimentosPage]
})
export class LibreriaAlimentosPageModule {}
