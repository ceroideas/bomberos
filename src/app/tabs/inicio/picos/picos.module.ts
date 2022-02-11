import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PicosPageRoutingModule } from './picos-routing.module';

import { PicosPage } from './picos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PicosPageRoutingModule
  ],
  declarations: [PicosPage]
})
export class PicosPageModule {}
