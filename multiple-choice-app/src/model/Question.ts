
export class Question{
  public id: string;
  public collectionId: string;
  private _questionText: string;
  private _correctlyAnswered: number;

  constructor(questionText: string, correctlyAnswered: number = 0) {
    this._questionText = questionText;
    this._correctlyAnswered = correctlyAnswered;
  }

  get questionText(): string {
    return this._questionText;
  }

  set questionText(value: string) {
    this._questionText = value;
  }

  get correctlyAnswered(): number {
    return this._correctlyAnswered;
  }

  set correctlyAnswered(value: number) {
    this._correctlyAnswered = value;
  }
}
