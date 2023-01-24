import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {Collection} from "../../model/Collection";
import {NavController} from "@ionic/angular";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-collection-options',
  templateUrl: './collection-options.page.html',
  styleUrls: ['./collection-options.page.scss'],
})
export class CollectionOptionsPage implements OnInit {

  id: string
  collection: Collection

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private databaseService: DatabaseService,
              private data: DataService,
              private navController: NavController) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];

      this.collection = this.databaseService.getCollectionById(this.id)
    });
  }

  openEdit() {
    this.router.navigate(['/collection-detail', this.collection['id']]);
  }

  openTest() {
    if (this.collection.questions.length >= 1) {
      this.router.navigate(['question-test', this.id]);
    }
  }

  goBack() {
    this.navController.back()
  }

}
