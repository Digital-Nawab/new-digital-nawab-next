import { BaseModel } from './BaseModel.js';

export class Dev_Step extends BaseModel {
  static table = 'dev_steps';
  static fillable = [
  "icon",
  "heading",
  "description"
];
  static casts = {};
}

export default Dev_Step;
