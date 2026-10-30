import { BaseModel } from './BaseModel.js';

export class SEO_Form extends BaseModel {
  static table = 'seo_forms';
  static fillable = [
  "image",
  "name",
  "website_url",
  "email",
  "current_traffic",
  "message",
  "button"
];
  static casts = {};
}

export default SEO_Form;
