export class Answer{
  private _text: string;
  private _isCorrect: Boolean;

  constructor(text: string, isCorrect: Boolean) {
    this._text = text;
    this._isCorrect = isCorrect;
  }

  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get isCorrect(): Boolean {
    return this._isCorrect;
  }

  set isCorrect(value: Boolean) {
    this._isCorrect = value;
  }
}
