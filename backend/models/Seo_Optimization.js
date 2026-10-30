import { BaseModel } from './BaseModel.js';

export class Seo_Optimization extends BaseModel {
  static table = 'seo_optimizations';
  static fillable = [
  "icon",
  "heading",
  "description"
];
  static casts = {};
}

export default Seo_Optimization;
