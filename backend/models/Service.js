import { BaseModel } from './BaseModel.js';

export class Service extends BaseModel {
  static table = 'services';
  static fillable = [
  "name",
  "description",
  "image",
  "is_deleted"
];
  static casts = {};
}

export default Service;
