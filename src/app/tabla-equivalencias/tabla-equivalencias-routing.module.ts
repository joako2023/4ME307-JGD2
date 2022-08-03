import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablaEquivalenciasPage } from './tabla-equivalencias.page';

const routes: Routes = [
  {
    path: '',
    component: TablaEquivalenciasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablaEquivalenciasPageRoutingModule {}
