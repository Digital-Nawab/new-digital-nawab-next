import { BaseModel } from './BaseModel.js';

export class Dev_Innovation extends BaseModel {
  static table = 'dev_innovations';
  static fillable = [
  "icon",
  "heading",
  "sub_heading",
  "description",
  "features"
];
  static casts = {
  "features": "array"
};
}

export default Dev_Innovation;
