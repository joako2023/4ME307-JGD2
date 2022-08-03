import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SmaePage } from './smae.page';

const routes: Routes = [
  {
    path: '',
    component: SmaePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SmaePageRoutingModule {}
