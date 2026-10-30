import { BaseModel } from './BaseModel.js';

export class Project extends BaseModel {
  static table = 'projects';
  static fillable = [
  "type",
  "title",
  "image",
  "video",
  "description",
  "duration",
  "tech_used",
  "url",
  "starting_date",
  "ending_date"
];
  static casts = {
  "tech_used": "array",
  "starting_date": "date",
  "ending_date": "date"
};
}

export default Project;
