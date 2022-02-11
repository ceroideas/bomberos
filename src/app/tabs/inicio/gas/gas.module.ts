import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasPageRoutingModule } from './gas-routing.module';

import { GasPage } from './gas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GasPageRoutingModule
  ],
  declarations: [GasPage]
})
export class GasPageModule {}
