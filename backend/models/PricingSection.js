import { BaseModel } from './BaseModel.js';

export class PricingSection extends BaseModel {
  static table = 'pricing_sections';
  static fillable = [
  "city_id",
  "badge_text",
  "heading",
  "subheading",
  "packages"
];
  static casts = {
  "packages": "array"
};
}

export default PricingSection;
