import { BaseModel } from './BaseModel.js';

export class HowWeWork extends BaseModel {
  static table = 'how_we_works';
  static fillable = [
  "city_id",
  "heading",
  "subheading",
  "steps"
];
  static casts = {
  "steps": "array"
};
}

export default HowWeWork;
