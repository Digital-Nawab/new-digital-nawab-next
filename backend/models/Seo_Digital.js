import { BaseModel } from './BaseModel.js';

export class Seo_Digital extends BaseModel {
  static table = 'seo_digital';
  static fillable = [
  "icon",
  "heading",
  "description"
];
  static casts = {};
}

export default Seo_Digital;
