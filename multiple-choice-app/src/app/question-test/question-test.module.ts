import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionTestPageRoutingModule } from './question-test-routing.module';

import { QuestionTestPage } from './question-test.page';
import {SwiperModule} from "swiper/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionTestPageRoutingModule,
    SwiperModule,
  ],
  declarations: [QuestionTestPage]
})
export class QuestionTestPageModule {}
