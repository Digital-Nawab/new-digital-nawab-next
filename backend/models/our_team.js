import { BaseModel } from './BaseModel.js';

export class our_team extends BaseModel {
  static table = 'our_team';
  static fillable = [
  "name",
  "designation",
  "img",
  "joining_date"
];
  static casts = {};
}

export default our_team;
