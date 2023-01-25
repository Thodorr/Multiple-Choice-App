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
import {DatabaseService} from "../services/database.service";
import Swiper from "swiper";

SwiperCore.use([Pagination])
@Component({
  selector: 'app-question-test',
  templateUrl: './question-test.page.html',
  styleUrls: ['./question-test.page.scss'],
})
export class QuestionTestPage implements OnInit {

  collectionId: string;
  collection: Collection = new Collection('', '');
  questions: Question[] = []
  answers: Answer[] = []
  context: string = 'Learn'

  submittedQuestion: Array<Question> = [];
  checkedBoxIndexes: Array<number>;

  constructor(
    private data: DataService,
    private activatedRoute: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    private navController: NavController,
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.collectionId = params['collectionId'];
      this.context = params['context'];
      this.getCollectionFromDB()
      this.getQuestionsFromDB()
      this.getAnswersFromDB()
    });
  }

  async getCollectionFromDB() {
    this.collection = await this.databaseService.getCollectionById(this.collectionId) as Collection
  }

  async getQuestionsFromDB() {
    this.questions = await this.databaseService.getQuestionsOfCollection(this.collectionId) as Question[]
    this.questions = this.questions.filter(question => question.correctlyAnswered < 5)
  }

  async getAnswersFromDB() {
    const answers =  await this.databaseService.getAnswers()
    this.answers = answers as Answer[]
    console.log(this.answers)
  }

  onCancel() {
    this.navController.back();
  }

  getCollectionName() {
    return this.collection.name
  }

  checkAnswer(questionText: string, index: number) {
    const identifier: string = questionText + index
    const checkBox = document.getElementById(identifier) as HTMLIonCheckboxElement;

    checkBox.checked = !checkBox.checked;
  }

  getFilteredAnswers(question: Question) {
    return this.answers.filter(answer => answer.questionId === question.id)
  }

  submitQuestion(question: Question) {
    if (this.submittedQuestion.includes(question)) return
    const correctlyAnswered: boolean = this.checkQuestion(question)
    if (correctlyAnswered) question.correctlyAnswered++
    this.databaseService.editQuestion(question)
    let swiper = new Swiper('.swiper-container')

    this.delay(800).then(() => {
        swiper.slideTo(1)
    })

  }

  submitExam() {
    let correctQuestions = 0
    for (let question of this.questions) {
      if (this.checkQuestion(question)) correctQuestions++
    }

    const percentage =  correctQuestions / this.questions.length * 100
    this.router.navigate(['/evaluation', percentage])
  }

  checkQuestion(question: Question): boolean {
    this.submittedQuestion.push(question)
    const checkBoxes: NodeListOf<HTMLIonCheckboxElement> = document.querySelectorAll('ion-checkbox');
    let filteredBoxes: Array<HTMLIonCheckboxElement> = Array.from(checkBoxes).filter(element => element.id.includes(question.questionText))
    this.checkedBoxIndexes = [];
    let correctlyAnswered = true;

    let filteredAnswers: Answer[] = this.answers.filter(answer => answer.questionId === question.id)

    for (let i = 0; i < filteredBoxes.length; i++) {
      if (filteredBoxes[i].checked) {
        this.checkedBoxIndexes.push(i)
      }
      if (filteredAnswers[i].isCorrect !== filteredBoxes[i].checked && correctlyAnswered) {
        correctlyAnswered = false
      }
    }
    return correctlyAnswered
  }

  delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time))
  }

  correctCondition(answer: Answer, question: Question) {
    return answer.isCorrect && this.submittedQuestion.includes(question)
  }
  incorrectCondition(answer: Answer, question: Question, answerIndex: number) {
    return !answer.isCorrect && this.submittedQuestion.includes(question) && this.checkedBoxIndexes.includes(answerIndex)
  }

}
