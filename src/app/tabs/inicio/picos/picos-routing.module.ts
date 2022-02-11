import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PicosPage } from './picos.page';

const routes: Routes = [
  {
    path: '',
    component: PicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PicosPageRoutingModule {}
