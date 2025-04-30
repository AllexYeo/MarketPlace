import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushProductPage } from './push-product.page';

const routes: Routes = [
  {
    path: '',
    component: PushProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushProductPageRoutingModule {}
