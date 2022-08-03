import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LibreriaAlimentosPage } from './libreria-alimentos.page';

const routes: Routes = [
  {
    path: '',
    component: LibreriaAlimentosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LibreriaAlimentosPageRoutingModule {}
