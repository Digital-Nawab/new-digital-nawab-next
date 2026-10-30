import { BaseModel } from './BaseModel.js';

export class Dev_Cornerstone extends BaseModel {
  static table = 'dev_cornerstones';
  static fillable = [
  "icon",
  "heading",
  "description"
];
  static casts = {};
}

export default Dev_Cornerstone;
