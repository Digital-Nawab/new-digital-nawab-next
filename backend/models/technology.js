import { BaseModel } from './BaseModel.js';

export class technology extends BaseModel {
  static table = 'technology';
  static fillable = [
  "img",
  "heading"
];
  static casts = {};
}

export default technology;
