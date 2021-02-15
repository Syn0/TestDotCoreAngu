import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HeroListComponent } from './hero-list.component';

@NgModule({
  imports: [ CommonModule, FormsModule,IonicModule ],
  declarations: [HeroListComponent],
  exports: [HeroListComponent]
})
export class HeroListComponentModule {}
