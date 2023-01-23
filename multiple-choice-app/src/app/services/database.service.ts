import { Injectable } from '@angular/core';;
import {Auth} from "@angular/fire/auth";
import {NotFoundError} from "rxjs";
import {addDoc, collection, Firestore, getDocs} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public collections = null;

  constructor(private firestore: Firestore, private auth: Auth) {}

  async createCollection(title: string, description: string) {
    let userId = await this.auth.currentUser?.uid;

    if (!userId) {
      throw new NotFoundError('User not logged in!');
    }

    await addDoc(collection(this.firestore, 'collections'), {title, description, userId});
  }

  async getCollections() {
    let userId = this.auth.currentUser?.uid;

    if (!userId) {
      throw new NotFoundError('User not logged in!');
    }

    const query = await getDocs(collection(this.firestore, 'collections'));
    query.forEach((doc) => {
      console.log(doc.data());
    });

    return query;
  }
}
