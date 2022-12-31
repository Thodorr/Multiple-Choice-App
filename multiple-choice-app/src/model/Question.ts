import {Answer} from "./Answer";

export class Question{
  private _questionText: String;
  private _answers: Answer[];
  private _correctlyAnswered: Number;

  constructor(questionText: String, answers: Answer[]) {
    this._questionText = questionText;
    this._answers = answers;
    this._correctlyAnswered = 0;
  }

  get questionText(): String {
    return this._questionText;
  }

  set questionText(value: String) {
    this._questionText = value;
  }

  get answers(): Answer[] {
    return this._answers;
  }

  set answers(value: Answer[]) {
    this._answers = value;
  }

  get correctlyAnswered(): Number {
    return this._correctlyAnswered;
  }

  set correctlyAnswered(value: Number) {
    this._correctlyAnswered = value;
  }
}
