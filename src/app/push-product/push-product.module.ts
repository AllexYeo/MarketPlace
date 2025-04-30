import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushProductPageRoutingModule } from './push-product-routing.module';

import { PushProductPage } from './push-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushProductPageRoutingModule
  ],
  declarations: [PushProductPage]
})
export class PushProductPageModule {}
