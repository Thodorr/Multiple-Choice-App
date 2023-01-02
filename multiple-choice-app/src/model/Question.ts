import {Answer} from "./Answer";

export class Question{
  private _questionText: string;
  private _answers: Answer[];
  private _correctlyAnswered: number;

  constructor(questionText: string, answers: Answer[]) {
    this._questionText = questionText;
    this._answers = answers;
    this._correctlyAnswered = 0;
  }

  get questionText(): string {
    return this._questionText;
  }

  set questionText(value: string) {
    this._questionText = value;
  }

  get answers(): Answer[] {
    return this._answers;
  }

  set answers(value: Answer[]) {
    this._answers = value;
  }

  get correctlyAnswered(): number {
    return this._correctlyAnswered;
  }

  set correctlyAnswered(value: number) {
    this._correctlyAnswered = value;
  }
}
