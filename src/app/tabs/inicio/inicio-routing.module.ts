import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: InicioPage
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule),
  },
  {
    path: 'municipios',
    loadChildren: () => import('./municipios/municipios.module').then( m => m.MunicipiosPageModule)
  },
  {
    path: 'rios',
    loadChildren: () => import('./rios/rios.module').then( m => m.RiosPageModule)
  },
  {
    path: 'embalses',
    loadChildren: () => import('./embalses/embalses.module').then( m => m.EmbalsesPageModule)
  },
  {
    path: 'parques',
    loadChildren: () => import('./parques/parques.module').then( m => m.ParquesPageModule)
  },
  {
    path: 'altitud',
    loadChildren: () => import('./altitud/altitud.module').then( m => m.AltitudPageModule)
  },
  {
    path: 'poblacion',
    loadChildren: () => import('./poblacion/poblacion.module').then( m => m.PoblacionPageModule)
  },
  {
    path: 'espacios',
    loadChildren: () => import('./espacios/espacios.module').then( m => m.EspaciosPageModule)
  },
  {
    path: 'medios',
    loadChildren: () => import('./medios/medios.module').then( m => m.MediosPageModule)
  },
  {
    path: 'carreteras',
    loadChildren: () => import('./carreteras/carreteras.module').then( m => m.CarreterasPageModule)
  },
  {
    path: 'metro',
    loadChildren: () => import('./metro/metro.module').then( m => m.MetroPageModule)
  },
  {
    path: 'gas',
    loadChildren: () => import('./gas/gas.module').then( m => m.GasPageModule)
  },
  {
    path: 'picos',
    loadChildren: () => import('./picos/picos.module').then( m => m.PicosPageModule)
  },
  {
    path: 'map2',
    loadChildren: () => import('./map2/map2.module').then( m => m.Map2PageModule)
  },
  {
    path: 'numbers',
    loadChildren: () => import('./numbers/numbers.module').then( m => m.NumbersPageModule)
  },
  {
    path: 'municipal',
    loadChildren: () => import('./municipal/municipal.module').then( m => m.MunicipalPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InicioPageRoutingModule {}
