import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlimentosSugeridosPage } from './alimentos-sugeridos.page';

const routes: Routes = [
  {
    path: '',
    component: AlimentosSugeridosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlimentosSugeridosPageRoutingModule {}
