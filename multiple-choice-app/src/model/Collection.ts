import {Question} from "./Question";

export class Collection {

  private _id: String;
  private _name: String;
  private _description: String;
  private _questions: Question[] = [];
  private _passed: Boolean = false;

  constructor(name: String, description: String) {
    this._name = name;
    this._description = description;
  }

  get id(): String {
    return this._id;
  }

  set id(value: String) {
    this._id = value;
  }

  get name(): String {
    return this._name;
  }

  set name(value: String) {
    this._name = value;
  }

  get description(): String {
    return this._description;
  }

  set description(value: String) {
    this._description = value;
  }

  get questions(): Question[] {
    return this._questions;
  }

  set questions(value: Question[]) {
    this._questions = value;
  }

  get passed(): Boolean {
    return this._passed;
  }

  set passed(value: Boolean) {
    this._passed = value;
  }
}
