import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagoPlanesPage } from './pago-planes.page';

const routes: Routes = [
  {
    path: '',
    component: PagoPlanesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagoPlanesPageRoutingModule {}
