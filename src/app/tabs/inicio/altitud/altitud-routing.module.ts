import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltitudPage } from './altitud.page';

const routes: Routes = [
  {
    path: '',
    component: AltitudPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltitudPageRoutingModule {}
