import { BaseModel } from './BaseModel.js';

export class Package_Feature extends BaseModel {
  static table = 'package_features';
  static fillable = [
  "package_id",
  "feature_key",
  "feature_value"
];
  static casts = {};
}

export default Package_Feature;
