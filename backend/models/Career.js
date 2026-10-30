import { BaseModel } from './BaseModel.js';

export class Career extends BaseModel {
  static table = 'careers';
  static fillable = [
  "desig",
  "title",
  "city",
  "job_type",
  "work_mode",
  "about_role",
  "responsibilities",
  "requirements",
  "benefits_perks"
];
  static casts = {
  "responsibilities": "array",
  "requirements": "array",
  "benefits_perks": "array"
};
}

export default Career;
