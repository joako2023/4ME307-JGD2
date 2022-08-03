import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmaePageRoutingModule } from './smae-routing.module';

import { SmaePage } from './smae.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SmaePageRoutingModule
  ],
  declarations: [SmaePage]
})
export class SmaePageModule {}
