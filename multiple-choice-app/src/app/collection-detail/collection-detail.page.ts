import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Collection} from "../../model/Collection";
import {AlertController, ItemReorderEventDetail, NavController} from "@ionic/angular";
import {DatabaseService} from "../services/database.service";
import {Question} from "../../model/Question";

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.page.html',
  styleUrls: ['./collection-detail.page.scss'],
})
export class CollectionDetailPage implements OnInit {
  id: any;
  collection: Collection = new Collection('', '')
  questions: Question[] = []
  answers: any

  constructor(private data: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertController: AlertController,
              private navController: NavController,
              private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.getCollectionsFromDBbyId()
      this.getQuestionsFromDB()
    });
  }

  async getCollectionsFromDBbyId() {
    this.collection = await this.databaseService.getCollectionById(this.id) as Collection
  }

  async getQuestionsFromDB() {
    this.questions = await this.databaseService.getQuestionsOfCollection(this.id) as Question[]
    console.log('Questions: ', this.questions)
  }

  async getAnswersFromDB() {
    this.answers = await this.databaseService.getAnswersByQuestionId(this.id)
    console.log('Answers: ', this.answers)
  }

  openQuestionDetail(questionId: any = -1){
    console.log("HERERERER", questionId)
    this.router.navigate(['/question-detail', this.id, questionId]);
  }


  goBack() {
    this.navController.navigateBack('/collections');
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  async deleteQuestion(index: number){
    const alert = await this.alertController.create({
      header: 'Do you want to delete this question?',
      buttons: [{
        text: 'No',
        role: 'cancel',
      },
        {
          text: 'Yes',
          role: 'confirm',
          handler: () => {
            this.collection.questions.splice(index, 1)
          },
        }],
    });
    await alert.present();
  }
}
