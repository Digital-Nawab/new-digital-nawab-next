import { BaseModel } from './BaseModel.js';

export class CityFaq extends BaseModel {
  static table = 'city_faqs';
  static fillable = [
  "city_id",
  "heading",
  "faqs"
];
  static casts = {
  "faqs": "array"
};
}

export default CityFaq;
