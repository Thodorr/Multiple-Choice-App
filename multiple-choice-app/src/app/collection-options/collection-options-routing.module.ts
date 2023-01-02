import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionOptionsPage } from './collection-options.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionOptionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionOptionsPageRoutingModule {}
