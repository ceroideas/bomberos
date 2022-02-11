import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoblacionPage } from './poblacion.page';

const routes: Routes = [
  {
    path: '',
    component: PoblacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoblacionPageRoutingModule {}
