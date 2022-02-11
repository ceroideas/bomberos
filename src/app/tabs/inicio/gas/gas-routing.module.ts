import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasPage } from './gas.page';

const routes: Routes = [
  {
    path: '',
    component: GasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasPageRoutingModule {}
