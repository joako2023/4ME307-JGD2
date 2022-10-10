import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SmaePageRoutingModule } from './smae-routing.module';

import { SmaePage } from './smae.page';

@NgModule({
  imports: [
    SmaePageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  declarations: [SmaePage]
})
export class SmaePageModule {}
