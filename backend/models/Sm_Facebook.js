import { BaseModel } from './BaseModel.js';

export class Sm_Facebook extends BaseModel {
  static table = 'sm_facebook';
  static fillable = [
  "icon",
  "heading",
  "description"
];
  static casts = {};
}

export default Sm_Facebook;
