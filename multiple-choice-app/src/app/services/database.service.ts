import { Injectable } from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {NotFoundError} from "rxjs";
import {addDoc, collection, doc, Firestore, getDoc, getDocs, query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  public collections = null;

  constructor(private firestore: Firestore, private auth: Auth) {}

  async createCollection(name: string, description: string) {
    let userId = await this.auth.currentUser?.uid;

    if (!userId) {
      throw new NotFoundError('User not logged in!');
    }

    await addDoc(collection(this.firestore, 'collections'), {name, description, userId});
  }

  async getCollections() {
    let userId = this.auth.currentUser?.uid;

    if (!userId) {
      throw new NotFoundError('User not logged in!');
    }

    const q = await query(collection(this.firestore, 'collections'), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      let data = doc.data();
      data['id'] = doc.id;

      console.log(data);

      return data;
    })
  }

  async getCollectionById(id: string) {
    const docRef = doc(this.firestore, 'collections', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      data['id'] = docSnap.id;

      return data;
    } else {
      throw new NotFoundError('No such document!');
    }
  }
}
