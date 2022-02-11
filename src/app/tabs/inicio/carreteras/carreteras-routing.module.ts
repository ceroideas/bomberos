import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarreterasPage } from './carreteras.page';

const routes: Routes = [
  {
    path: '',
    component: CarreterasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarreterasPageRoutingModule {}
