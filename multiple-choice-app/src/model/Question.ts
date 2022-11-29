export class Question{
  private _questionText: String;
  private _answers: String[];
  private _correctAnswerIndexes: Number[];
  private _correctlyAnswered: Number;

  constructor(questionText: String, answers: String[], correctAnswerIndexes: Number[], correctlyAnswered: Number) {
    this._questionText = questionText;
    this._answers = answers;
    this._correctAnswerIndexes = correctAnswerIndexes;
    this._correctlyAnswered = correctlyAnswered;
  }

  get questionText(): String {
    return this._questionText;
  }

  set questionText(value: String) {
    this._questionText = value;
  }

  get answers(): String[] {
    return this._answers;
  }

  set answers(value: String[]) {
    this._answers = value;
  }

  get correctAnswerIndexes(): Number[] {
    return this._correctAnswerIndexes;
  }

  set correctAnswerIndexes(value: Number[]) {
    this._correctAnswerIndexes = value;
  }

  get correctlyAnswered(): Number {
    return this._correctlyAnswered;
  }

  set correctlyAnswered(value: Number) {
    this._correctlyAnswered = value;
  }
}
