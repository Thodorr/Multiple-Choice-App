import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../model/Question";
import {AlertController} from "@ionic/angular";
import {Answer} from "../../model/Answer";

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.page.html',
  styleUrls: ['./question-detail.page.scss'],
})
export class QuestionDetailPage implements OnInit {

  questionId: number;
  collectionId: number;

  question: Question;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.questionId = params['questionId'];
      this.collectionId = params['collectionId'];
      if (this.questionId != -1) {
        this.question = this.data.getQuestionByIds(this.collectionId, this.questionId)
      } else {
        this.question = new Question('', [])
      }
    });
  }

  removeAnswer(answer: Answer) {
    let index = this.question.answers.indexOf(answer)
    this.question.answers.splice(index, 1)
  }

  async openAddPopup() {
    const alert = await this.alertController.create({
      header: 'Add Answer',
      inputs: [
        {
          name: 'answerInput',
          placeholder: 'Answer',
          attributes: {
            maxlength: 80,
          },
        },
        {
          type: 'checkbox',
          name: 'correct',
          label: 'Correct:'
        }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      },
        {
          text: 'Confirm',
          role: 'confirm',
          handler: (alertData) => {
            if ( alertData.answerInput.length >= 1 ) {
              this.question.answers.push( new Answer(alertData.answerInput, alertData.correct) )
            }
          },
        }],
    });
    await alert.present();
  }

  onCancel() {
    this.router.navigate(['/collection-detail', this.collectionId]);
  }
  onSave() {
    if (this.questionId == -1) {
      this.data.getCollectionById(this.collectionId).questions.push(this.question)
    }
    this.router.navigate(['/collection-detail', this.collectionId]);
  }
}
