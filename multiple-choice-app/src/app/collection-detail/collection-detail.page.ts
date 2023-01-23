import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Collection} from "../../model/Collection";
import {AlertController, ItemReorderEventDetail, NavController} from "@ionic/angular";

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.page.html',
  styleUrls: ['./collection-detail.page.scss'],
})
export class CollectionDetailPage implements OnInit {
  id: number;
  collection: Collection;

  constructor(private data: DataService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private alertController: AlertController,
              private navController: NavController
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.collection = this.data.getCollectionById(this.id)
    });
  }

  openQuestionDetail(questionId: number = -1){
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

  deleteCollection() {

  }
}
