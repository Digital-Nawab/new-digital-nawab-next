import { BaseModel } from './BaseModel.js';

export class CityService extends BaseModel {
  static table = 'city_services';
  static fillable = [
  "city_id",
  "badge_text",
  "heading",
  "subheading",
  "items"
];
  static casts = {
  "items": "array"
};
}

export default CityService;
