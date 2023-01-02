import { Component } from '@angular/core';
import {DataService} from "../services/data.service";
import {AlertController, RefresherCustomEvent} from "@ionic/angular";
import {Collection} from "../../model/Collection";
import {Router} from "@angular/router";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.page.html',
  styleUrls: ['./collections.page.scss'],
})
export class CollectionsPage {
  constructor(private data: DataService,
              private alertController: AlertController,
              private router: Router,
              ) { }


  refresh(ev: any) {
    setTimeout(() => {
      (ev as RefresherCustomEvent).detail.complete();
    }, 3000);
  }

  getCollections(): Collection[] {
    return this.data.collections
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
              let targetCollection = this.data.collections.find(c => c === collection);
              if (targetCollection !== undefined) {
                targetCollection.name = alertData.nameInput
                targetCollection.description = alertData.descriptionInput
              }
            }
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let targetCollectionIndex = this.data.collections.findIndex(c => c === collection);
            if (targetCollectionIndex !== -1) {
              this.data.collections.splice(targetCollectionIndex, 1)
            }
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
              this.data.addCollection(alertData.nameInput, alertData.descriptionInput)
            }
          },
        }],
    });

    await alert.present();
  }

  openOptions(collection: Collection) {
    this.router.navigate(['/collection-options', this.data.getIdByCollection(collection)]);
  }
}
