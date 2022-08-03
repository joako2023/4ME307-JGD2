import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlimentosSugeridosPageRoutingModule } from './alimentos-sugeridos-routing.module';

import { AlimentosSugeridosPage } from './alimentos-sugeridos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlimentosSugeridosPageRoutingModule
  ],
  declarations: [AlimentosSugeridosPage]
})
export class AlimentosSugeridosPageModule {}
