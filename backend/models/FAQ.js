import { BaseModel } from './BaseModel.js';

export class FAQ extends BaseModel {
  static table = 'faqs';
  static fillable = [
  "question",
  "answer"
];
  static casts = {};
}

export default FAQ;
