import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {Collection} from "../../model/Collection";
import {NavController} from "@ionic/angular";
import {DatabaseService} from "../services/database.service";
import {Question} from "../../model/Question";
import {AuthService} from "../services/auth.service";
import {Auth} from "@angular/fire/auth";

@Component({
  selector: 'app-collection-options',
  templateUrl: './collection-options.page.html',
  styleUrls: ['./collection-options.page.scss'],
})
export class CollectionOptionsPage implements OnInit {

  id: string
  collection: Collection = new Collection('', '')
  questions: Question[] = []

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private databaseService: DatabaseService,
              private data: DataService,
              private navController: NavController,
              private auth: Auth) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      this.getCollectionsFromDBbyId()
      this.getQuestionFromDB()
    });
  }

  async getCollectionsFromDBbyId() {
    this.collection = await this.databaseService.getCollectionById(this.id) as Collection
  }

  async getQuestionFromDB() {
    this.questions = await this.databaseService.getQuestionsOfCollection(this.id) as Question[]
  }

  openEdit() {
    if (this.isMyCollection()) {
      this.router.navigate(['/collection-detail', this.collection['id']]);
    }
  }

  openTest() {
    if (this.questions.length >= 1) {
      this.router.navigate(['question-test', this.id, 'Learn']);
    }
  }

  isMyCollection() {
    return this.auth.currentUser?.uid === this.collection.userId;
  }

  openExam() {
    if (this.questions.length >= 1) {
      this.router.navigate(['question-test', this.id, 'Exam']);
    }
  }

  resetCollection() {
    for (let question of this.questions) {
      question.correctlyAnswered = 0
      this.databaseService.editQuestion(question)
    }
  }

  goBack() {
    this.navController.back()
  }

}
