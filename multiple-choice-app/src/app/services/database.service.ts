import { Injectable } from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {NotFoundError} from "rxjs";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  query,
  setDoc,
  where
} from "@angular/fire/firestore";
import {Collection} from "../../model/Collection";
import {Question} from "../../model/Question";
import {Answer} from "../../model/Answer";

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

    await addDoc(collection(this.firestore, 'collections'), {name, description, userId, questions: []});
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

  async deleteCollection(collection: Collection) {
    let userId = await this.auth.currentUser?.uid;

    if (!userId) {
      throw new NotFoundError('User not logged in!');
    }
    await deleteDoc(doc(this.firestore, 'collections', collection.id.toString()));
  }

  async editCollection(collection: Collection) {
    let userId = await this.auth.currentUser?.uid;

    if (!userId) {
      throw new NotFoundError('User not logged in!');
    }
    await setDoc(doc(this.firestore, 'collections', collection.id.toString()), collection);
  }

  async createQuestion(question: Question, collection2: Collection) {
    let userId = await this.auth.currentUser?.uid;

    if (!userId) {
      throw new NotFoundError('User not logged in!');
    }

    await addDoc(collection(this.firestore, 'questions'), {questionText: question.questionText, collectionId: collection2.id});
  }

  async editQuestion(question: Question) {
    let userId = await this.auth.currentUser?.uid;

    if (!userId) {
      throw new NotFoundError('User not logged in!');
    }
    await setDoc(doc(this.firestore, 'collections', question.id.toString()), question);
  }

  async getQuestionById(id: string) {
    const docRef = doc(this.firestore, 'questions', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      data['id'] = docSnap.id;

      return data;
    } else {
      throw new NotFoundError('No such document!');
    }
  }

  async getQuestionsOfCollection(id: any) {
    console.log(id)

    const q = await query(collection(this.firestore, 'questions'), where("collectionId", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      let data = doc.data();
      data['id'] = doc.id;

      console.log(data);

      return data;
    })
  }

  async getAnswersByQuestionId(id: any) {
    const q = await query(collection(this.firestore, 'answers'), where("questionId", "==", id));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      let data = doc.data();
      data['id'] = doc.id;

      console.log(data);

      return data;
    })
  }

  async createAnswer(answer: Answer, question: Question) {
    await addDoc(collection(this.firestore, 'answers'), {answerText: answer.answerText, questionId: question.id, isCorrect: answer.isCorrect});
  }

  async createAnswers(answers: Answer[], question: Question) {
    for (const answer of answers) {
      await this.createAnswer(answer, question);
    }
  }


  async getAnswerById(id: string) {
    const docRef = doc(this.firestore, 'answers', id);
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
