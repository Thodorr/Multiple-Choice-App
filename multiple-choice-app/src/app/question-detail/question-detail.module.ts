import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionDetailPageRoutingModule } from './question-detail-routing.module';

import { QuestionDetailPage } from './question-detail.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        QuestionDetailPageRoutingModule,
    ],
  declarations: [QuestionDetailPage]
})
export class QuestionDetailPageModule {}
