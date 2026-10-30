import { BaseModel } from './BaseModel.js';

export class Package extends BaseModel {
  static table = 'packages';
  static fillable = [
  "icon",
  "package_for",
  "package_name",
  "price",
  "description",
  "label",
  "audience"
];
  static casts = {};
}

export default Package;
