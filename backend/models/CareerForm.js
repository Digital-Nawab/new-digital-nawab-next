import { BaseModel } from './BaseModel.js';

export class CareerForm extends BaseModel {
  static table = 'careerform';
  static fillable = [
  "name",
  "email",
  "address",
  "year_of_experience",
  "career_id",
  "resume",
  "contact_number",
  "skills",
  "project_link",
  "message"
];
  static casts = {
  "skills": "array"
};
}

export default CareerForm;
