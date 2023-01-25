import { Component } from '@angular/core';
import {DataService} from "../services/data.service";
import {AlertController, RefresherCustomEvent} from "@ionic/angular";
import {Collection} from "../../model/Collection";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {DatabaseService} from "../services/database.service";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.page.html',
  styleUrls: ['./collections.page.scss'],
})
export class CollectionsPage {
  collections: any[]

  constructor(private data: DataService,
              private databaseService: DatabaseService,
              private alertController: AlertController,
              private router: Router,
              private authService: AuthService
  ) {
    //this.getCollections();
    this.getCollectionsFromDB()
  }

  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  async getCollectionsFromDB() {
    this.collections = await this.databaseService.getCollections()
  }

  async getCollectionsAllFromDB() {
    this.collections = await this.databaseService.getAllCollections()
  }

  async openEditPopup(collection: Collection) {
    const alert = await this.alertController.create({
      header: 'Edit Collection',
      inputs: [
        {
          name: 'nameInput',
          placeholder: 'Name',
          value: collection.name,
          attributes: {
            maxlength: 33,
          },
        },
        {
          name: 'descriptionInput',
          type: 'textarea',
          placeholder: 'Description',
          value: collection.description,
          attributes: {
            maxlength: 80,
          },
        }
      ],
      buttons: [
        {
          text: 'Change',
          role: 'confirm',
          handler: (alertData) => {
            if ( alertData.nameInput.length >= 1 && alertData.descriptionInput.length >= 1) {
              collection.name = alertData.nameInput
              collection.description = alertData.descriptionInput
              this.databaseService.editCollection(collection)
              this.getCollectionsFromDB()
            }
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.databaseService.deleteCollection(collection)
            this.getCollectionsFromDB()
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
        }
        ],
    });
    await alert.present();
  }

  async openCreatePopup() {
    const alert = await this.alertController.create({
      header: 'Create Collection',
      inputs: [
        {
          name: 'nameInput',
          placeholder: 'Name',
          attributes: {
            maxlength: 30,
          },
        },
        {
          name: 'descriptionInput',
          type: 'textarea',
          placeholder: 'Description',
          attributes: {
            maxlength: 80,
          },
        }
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
      },
        {
          text: 'Create',
          role: 'confirm',
          handler: (alertData) => {
            if ( alertData.nameInput.length >= 1 && alertData.descriptionInput.length >= 1) {
              this.databaseService.createCollection(alertData.nameInput, alertData.descriptionInput)
              this.getCollectionsFromDB()
            }
          },
        }],
    });

    await alert.present();
  }

  openOptions(collection: Collection) {
    this.router.navigate(['/collection-options', collection.id]);
  }

  logOut() {
    this.authService.logout()
      .then(() => {
        this.router.navigateByUrl('/login');
      }).catch((error) => {
      window.alert(error.message);
    })
  }
}
