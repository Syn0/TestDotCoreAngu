import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) },
  {
    path: 'hero-create',
    loadChildren: () => import('./hero-create/hero-create.module').then( m => m.HeroCreatePageModule)
  },
  {
    path: 'hero-create',
    loadChildren: () => import('./hero-create/hero-create.module').then( m => m.HeroCreatePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
