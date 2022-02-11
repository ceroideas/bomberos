import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediosPageRoutingModule } from './medios-routing.module';

import { MediosPage } from './medios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediosPageRoutingModule
  ],
  declarations: [MediosPage]
})
export class MediosPageModule {}
