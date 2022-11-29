import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CollectionsPageRoutingModule } from './collections-routing.module';

import { CollectionsPage } from './collections.page';
import { CollectionComponentModule } from "../collection/collection.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CollectionsPageRoutingModule,
    CollectionComponentModule
  ],
  declarations: [CollectionsPage]
})
export class CollectionsPageModule {}
