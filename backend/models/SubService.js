import { BaseModel } from './BaseModel.js';

export class SubService extends BaseModel {
  static table = 'subservices';
  static fillable = [
  "service_id",
  "name",
  "description",
  "image",
  "is_deleted"
];
  static casts = {};
}

export default SubService;
