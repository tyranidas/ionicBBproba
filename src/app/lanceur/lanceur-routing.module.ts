import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LanceurPage } from './lanceur.page';

const routes: Routes = [
  {
    path: '',
    component: LanceurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LanceurPageRoutingModule {}
