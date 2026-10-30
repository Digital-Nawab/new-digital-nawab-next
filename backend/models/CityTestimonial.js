import { BaseModel } from './BaseModel.js';

export class CityTestimonial extends BaseModel {
  static table = 'city_testimonials';
  static fillable = [
  "city_id",
  "name",
  "designation",
  "quote",
  "image",
  "sort_order"
];
  static casts = {};
}

export default CityTestimonial;
