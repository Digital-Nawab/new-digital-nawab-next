import { BaseModel } from './BaseModel.js';

export class Seo_Strategy extends BaseModel {
  static table = 'seo_strategies';
  static fillable = [
  "image",
  "heading",
  "description"
];
  static casts = {};
}

export default Seo_Strategy;
