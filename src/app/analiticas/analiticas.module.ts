import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AnaliticasPageRoutingModule } from './analiticas-routing.module';

import { AnaliticasPage } from './analiticas.page';
import { BarComponent } from '../bar/bar.component';
import { LineComponent } from '../line/line.component';
import { DoughnutComponent } from '../doughnut/doughnut.component';

import { NgChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AnaliticasPageRoutingModule,
    ReactiveFormsModule,
    NgChartsModule
  ],
  declarations: [AnaliticasPage,BarComponent,LineComponent,DoughnutComponent]
})
export class AnaliticasPageModule {}
