import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoblacionPageRoutingModule } from './poblacion-routing.module';

import { PoblacionPage } from './poblacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoblacionPageRoutingModule
  ],
  declarations: [PoblacionPage]
})
export class PoblacionPageModule {}
