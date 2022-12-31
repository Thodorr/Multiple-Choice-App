import { Injectable } from '@angular/core';
import {Collection} from "../../model/Collection";
import {Question} from "../../model/Question";

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _collections: Collection[] = [
    new Collection("Philosophy", "Philosophy is the systematized study of general and fundamental questions."),
    new Collection("Math", "Math is an area of knowledge that includes topics as numbers, formulas" +
      " and related structures"),
    new Collection("EMA", "An array of questions to help learn for the EMA Test")
  ];

  constructor() { }

  get collections(): Collection[] {
    return this._collections;
  }

  getCollectionById(index: number): Collection {
    return this._collections[index]
  }

  getIdByCollection(collection: Collection): number {
    return this._collections.indexOf(collection)
  }

  getQuestionByIds(collectionId: number, questionId: number): Question {
    return this.getCollectionById(collectionId).questions[questionId]
  }

  addCollection(name: String, description: String) {
    let collection: Collection = new Collection(name, description)
    this.collections.push(collection)
  }
}
