import { BaseModel } from './BaseModel.js';

export class Enquiry extends BaseModel {
  static table = 'enquiries';
  static fillable = [
  "name",
  "email",
  "number",
  "city",
  "service_id",
  "subservice_id",
  "message",
  "isDeleted",
  "status",
  "addedBy",
  "source"
];
  static casts = {};
}

export default Enquiry;
