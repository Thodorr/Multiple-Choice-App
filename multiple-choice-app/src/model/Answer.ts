export class Answer{
  private _answerText: string;
  private _isCorrect: boolean;

  constructor(answerText: string, isCorrect: boolean) {
    this._answerText = answerText;
    this._isCorrect = isCorrect;
  }

  get answerText(): string {
    return this._answerText;
  }

  set answerText(value: string) {
    this._answerText = value;
  }

  get isCorrect(): boolean {
    return this._isCorrect;
  }

  set isCorrect(value: boolean) {
    this._isCorrect = value;
  }
}
