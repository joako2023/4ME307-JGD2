import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ControlPagosPage } from './control-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: ControlPagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ControlPagosPageRoutingModule {}
