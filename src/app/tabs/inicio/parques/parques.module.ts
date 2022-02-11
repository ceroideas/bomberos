import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ParquesPageRoutingModule } from './parques-routing.module';

import { ParquesPage } from './parques.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ParquesPageRoutingModule
  ],
  declarations: [ParquesPage]
})
export class ParquesPageModule {}
