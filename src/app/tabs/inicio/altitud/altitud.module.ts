import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltitudPageRoutingModule } from './altitud-routing.module';

import { AltitudPage } from './altitud.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltitudPageRoutingModule
  ],
  declarations: [AltitudPage]
})
export class AltitudPageModule {}
