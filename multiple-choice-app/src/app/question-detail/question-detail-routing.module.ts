import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionDetailPage } from './question-detail.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionDetailPageRoutingModule {}
