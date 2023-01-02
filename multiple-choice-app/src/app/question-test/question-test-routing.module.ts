import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuestionTestPage } from './question-test.page';

const routes: Routes = [
  {
    path: '',
    component: QuestionTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuestionTestPageRoutingModule {}
