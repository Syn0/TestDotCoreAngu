import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeroCreatePageRoutingModule } from './hero-create-routing.module';

import { HeroCreatePage } from './hero-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeroCreatePageRoutingModule
  ],
  declarations: [HeroCreatePage]
})
export class HeroCreatePageModule {}
