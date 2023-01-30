import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionGuard } from './servics/FAST-TRACK-FRONTEND/guards/session.guard';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [SessionGuard],
  },
  {
    path: 'catalogo-clientes',
    loadChildren: () => import('./catalogo-clientes/catalogo-clientes.module').then( m => m.CatalogoClientesPageModule),
    canActivate: [SessionGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  {
    path: 'analiticas',
    loadChildren: () => import('./analiticas/analiticas.module').then( m => m.AnaliticasPageModule)
  },
  {
    path: 'smae',
    loadChildren: () => import('./smae/smae.module').then( m => m.SmaePageModule)
  },
 {
  path: 'control-pagos',
  loadChildren: () => import('./control-pagos/control-pagos.module').then( m => m.ControlPagosPageModule)
},
  {
    path: 'libreria-alimentos',
    loadChildren: () => import('./libreria-alimentos/libreria-alimentos.module').then( m => m.LibreriaAlimentosPageModule)
  },
  {
    path: 'alimentos-sugeridos',
    loadChildren: () => import('./alimentos-sugeridos/alimentos-sugeridos.module').then( m => m.AlimentosSugeridosPageModule)
  },
  {
    path: 'tabla-equivalencias',
    loadChildren: () => import('./tabla-equivalencias/tabla-equivalencias.module').then( m => m.TablaEquivalenciasPageModule)
  },
  {
    path: 'pago-planes',
    loadChildren: () => import('./pago-planes/pago-planes.module').then( m => m.PagoPlanesPageModule)
  },  {
    path: 'suscripciones',
    loadChildren: () => import('./suscripciones/suscripciones.module').then( m => m.SuscripcionesPageModule)
  },
  {
    path: 'bar',
    loadChildren: () => import('./bar/bar.module').then( m => m.BarPageModule)
  },
  {
    path: 'doughnut',
    loadChildren: () => import('./doughnut/doughnut.module').then( m => m.DoughnutPageModule)
  },
  {
    path: 'line',
    loadChildren: () => import('./line/line.module').then( m => m.LinePageModule)
  },
  {
    path: 'time-series',
    loadChildren: () => import('./time-series/time-series.module').then( m => m.TimeSeriesPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
