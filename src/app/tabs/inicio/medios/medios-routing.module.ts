import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MediosPage } from './medios.page';

const routes: Routes = [
  {
    path: '',
    component: MediosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediosPageRoutingModule {}
