import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionDetailPage } from './collection-detail.page';

const routes: Routes = [
  {
    path: '',
    component: CollectionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionDetailPageRoutingModule {}
