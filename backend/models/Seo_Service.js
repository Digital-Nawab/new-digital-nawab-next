import { BaseModel } from './BaseModel.js';

export class Seo_Service extends BaseModel {
  static table = 'seo_services';
  static fillable = [
  "image",
  "heading",
  "subheading",
  "description",
  "features"
];
  static casts = {
  "features": "array"
};
}

export default Seo_Service;
