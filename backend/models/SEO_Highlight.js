import { BaseModel } from './BaseModel.js';

export class SEO_Highlight extends BaseModel {
  static table = 'seo_highlights';
  static fillable = [
  "image",
  "heading",
  "description"
];
  static casts = {};
}

export default SEO_Highlight;
