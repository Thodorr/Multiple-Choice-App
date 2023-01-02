export class Answer{
  private _text: string;
  private _isCorrect: boolean;

  constructor(text: string, isCorrect: boolean) {
    this._text = text;
    this._isCorrect = isCorrect;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get isCorrect(): boolean {
    return this._isCorrect;
  }

  set isCorrect(value: boolean) {
    this._isCorrect = value;
  }
}
