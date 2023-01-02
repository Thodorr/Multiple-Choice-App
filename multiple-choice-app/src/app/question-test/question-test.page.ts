import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertController, NavController} from "@ionic/angular";
import {Collection} from "../../model/Collection";
import SwiperCore, {
  Pagination
} from "swiper";
import {Question} from "../../model/Question";
import {Answer} from "../../model/Answer";

SwiperCore.use([Pagination])
@Component({
  selector: 'app-question-test',
  templateUrl: './question-test.page.html',
  styleUrls: ['./question-test.page.scss'],
})
export class QuestionTestPage implements OnInit {

  collectionId: number;
  collection: Collection;

  submittedQuestion: Array<Question> = [];
  checkedBoxIndexes: Array<number>;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private navController: NavController,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.collectionId = params['collectionId'];
        this.collection = this.data.getCollectionById(this.collectionId)
    });
  }

  onCancel() {
    this.navController.back();
  }

  getCollectionName() {
    return this.data.getCollectionById(this.collectionId).name
  }

  checkAnswer(questionText: string, index: number) {
    const identifier: string = questionText + index
    const checkBox = document.getElementById(identifier) as HTMLIonCheckboxElement;

    checkBox.checked = !checkBox.checked;
  }

  submitQuestion(question: Question) {
    if (this.submittedQuestion.includes(question)) return
    this.submittedQuestion.push(question)
    const checkBoxes: NodeListOf<HTMLIonCheckboxElement> = document.querySelectorAll('ion-checkbox');
    let filteredBoxes: Array<HTMLIonCheckboxElement> = Array.from(checkBoxes).filter(element => element.id.includes(question.questionText))
    this.checkedBoxIndexes = [];
    let correctlyAnswered = true;

    for (let i = 0; i < filteredBoxes.length; i++) {
      if (filteredBoxes[i].checked) {
        this.checkedBoxIndexes.push(i)
      }
      if (question.answers[i].isCorrect !== filteredBoxes[i].checked && correctlyAnswered) {
        correctlyAnswered = false
      }
    }

    if (correctlyAnswered) question.correctlyAnswered++
    if (question.correctlyAnswered >= 5) console.log()
  }

  correctCondition(answer: Answer, question: Question) {
    return answer.isCorrect && this.submittedQuestion.includes(question)
  }
  incorrectCondition(answer: Answer, question: Question, answerIndex: number) {
    return !answer.isCorrect && this.submittedQuestion.includes(question) && this.checkedBoxIndexes.includes(answerIndex)
  }

}
