import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarreterasPageRoutingModule } from './carreteras-routing.module';

import { CarreterasPage } from './carreteras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarreterasPageRoutingModule
  ],
  declarations: [CarreterasPage]
})
export class CarreterasPageModule {}
