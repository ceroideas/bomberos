import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParquesPage } from './parques.page';

const routes: Routes = [
  {
    path: '',
    component: ParquesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParquesPageRoutingModule {}
