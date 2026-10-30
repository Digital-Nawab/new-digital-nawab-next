import { BaseModel } from './BaseModel.js';

export class Dev_Maintain extends BaseModel {
  static table = 'dev_maintains';
  static fillable = [
  "icon",
  "heading",
  "description",
  "priority",
  "availability",
  "features"
];
  static casts = {
  "features": "array"
};
}

export default Dev_Maintain;
