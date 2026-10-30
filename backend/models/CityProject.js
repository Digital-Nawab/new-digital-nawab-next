import { BaseModel } from './BaseModel.js';

export class CityProject extends BaseModel {
  static table = 'city_projects';
  static fillable = [
  "city_id",
  "tag",
  "heading",
  "sub_heading",
  "image",
  "button_text",
  "button_url",
  "color",
  "sort_order"
];
  static casts = {};
}

export default CityProject;
