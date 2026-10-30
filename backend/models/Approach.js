import { BaseModel } from './BaseModel.js';

export class Approach extends BaseModel {
  static table = 'approaches';
  static fillable = [
  "city_id",
  "heading",
  "items"
];
  static casts = {
  "items": "array"
};
}

export default Approach;
