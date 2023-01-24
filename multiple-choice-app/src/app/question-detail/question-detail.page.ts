import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../model/Question";
import {AlertController, NavController, ToastController} from "@ionic/angular";
import {Answer} from "../../model/Answer";
import {DatabaseService} from "../services/database.service";
import {Collection} from "../../model/Collection";

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.page.html',
  styleUrls: ['./question-detail.page.scss'],
})
export class QuestionDetailPage implements OnInit {

  questionId: any;
  collectionId: any;

  collectionName: String = '';
  collection: Collection

  question: Question = new Question('', []);

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private navController: NavController,
    private toastController: ToastController,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.questionId = params['questionId'];
      this.collectionId = params['collectionId'];
      this.getCollectionNameFromDB()
      if (this.questionId != -1) {
        this.getQuestionFromDB()
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
              let isCorrect = false
              if (alertData.correct === 'on') isCorrect = true
              const answerMap = new Map() as Map<any, any>
              answerMap.set(alertData.answerInput, isCorrect)
              this.question.answers.push( answerMap )
              console.log(answerMap.keys())
            }
          },
        }],
    });
    await alert.present();
  }

  onCancel() {
    this.navController.back();
  }

  getAnswerText(answer: Map<string, boolean>): string {
    const array: any[] = Array.from(answer.entries()) as Array<any>
    const stringArray = array.toString()
    const splitArray: string[] = stringArray.split(',')
    const text : string = splitArray[0]

    return text
  }

  getAnswerValue(answer: Map<string, boolean>): boolean {
    const array: any[] = Array.from(answer.entries()) as Array<any>
    const stringArray = array.toString()
    const splitArray: string[] = stringArray.split(',')
    const valueString : string = splitArray[1]
    let value : boolean
    if (valueString == 'true') value = true
    else value = false

    return value
  }

  async getCollectionNameFromDB() {
    const collection = await this.databaseService.getCollectionById(this.collectionId) as Collection
    this.collectionName = collection.name
    this.collection = collection
  }

  async getQuestionFromDB() {
    const question = await this.databaseService.getQuestionById(this.questionId) as Question
    this.question = question
  }

  getCollectionName() {
    return this.data.getCollectionById(this.collectionId).name
  }

  async onSave() {
    if (this.question.questionText.length > 0 && this.question.answers.length > 0) {
      if (this.questionId == -1) {
        await this.databaseService.createQuestion(this.question, this.collection)
      } else {
        await this.databaseService.editQuestion(this.question)
      }
      await this.router.navigate(['/collection-detail', this.collectionId]);
    } else {
      const toast = await this.toastController.create({
        message: 'You need to add a question and at least one answer!',
        duration: 1500,
        position: "bottom"
      });
      await toast.present();
    }
  }
}
