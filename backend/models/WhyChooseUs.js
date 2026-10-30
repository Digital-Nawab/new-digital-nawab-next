import { BaseModel } from './BaseModel.js';

export class WhyChooseUs extends BaseModel {
  static table = 'why_choose_us';
  static fillable = [
  "city_id",
  "heading",
  "reasons"
];
  static casts = {
  "reasons": "array"
};
}

export default WhyChooseUs;
