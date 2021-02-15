import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroCreatePage } from './hero-create.page';

const routes: Routes = [
  {
    path: '',
    component: HeroCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroCreatePageRoutingModule {}
