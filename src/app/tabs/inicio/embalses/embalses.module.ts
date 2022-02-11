import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmbalsesPageRoutingModule } from './embalses-routing.module';

import { EmbalsesPage } from './embalses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmbalsesPageRoutingModule
  ],
  declarations: [EmbalsesPage]
})
export class EmbalsesPageModule {}
