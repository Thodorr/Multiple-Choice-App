import { Component, OnInit } from '@angular/core';
import {DataService} from "../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Collection} from "../../model/Collection";
import {Question} from "../../model/Question";
import {ItemReorderEventDetail} from "@ionic/angular";

@Component({
  selector: 'app-collection-detail',
  templateUrl: './collection-detail.page.html',
  styleUrls: ['./collection-detail.page.scss'],
})
export class CollectionDetailPage implements OnInit {
  id: number;
  collection: Collection;

  constructor(private data: DataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.collection = this.data.getCollectionById(this.id)
    });
  }

  openQuestionDetail(questionId: number = -1){
    this.router.navigate(['/question-detail', this.id, questionId]);
  }

  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    ev.detail.complete();
  }

  deleteQuestion(index: number){
    this.collection.questions.splice(index, 1)
  }
}
