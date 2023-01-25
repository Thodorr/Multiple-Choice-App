import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {NavController} from "@ionic/angular";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {

  result: number = 0

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private databaseService: DatabaseService,
              private data: DataService,
              private navController: NavController) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.result = params['result'];
    });
  }

  goBack() {
    this.navController.back()
  }

}
