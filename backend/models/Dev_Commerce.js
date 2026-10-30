import { BaseModel } from './BaseModel.js';

export class Dev_Commerce extends BaseModel {
  static table = 'dev_commerces';
  static fillable = [
  "tag",
  "image",
  "heading",
  "description",
  "skills",
  "label"
];
  static casts = {
  "skills": "array"
};
}

export default Dev_Commerce;
