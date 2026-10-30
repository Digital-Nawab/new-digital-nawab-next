import { BaseModel } from './BaseModel.js';

export class Creative extends BaseModel {
  static table = 'creatives';
  static fillable = [
  "image"
];
  static casts = {};
}

export default Creative;
