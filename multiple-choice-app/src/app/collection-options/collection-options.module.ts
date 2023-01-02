import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionOptionsPageRoutingModule } from './collection-options-routing.module';

import { CollectionOptionsPage } from './collection-options.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionOptionsPageRoutingModule
  ],
  declarations: [CollectionOptionsPage]
})
export class CollectionOptionsPageModule {}
