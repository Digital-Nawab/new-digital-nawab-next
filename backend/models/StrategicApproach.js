import { BaseModel } from './BaseModel.js';

export class StrategicApproach extends BaseModel {
  static table = 'strategic_approaches';
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

export default StrategicApproach;
