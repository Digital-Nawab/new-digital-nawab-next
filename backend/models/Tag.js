import { BaseModel } from './BaseModel.js';

export class Tag extends BaseModel {
  static table = 'tags';
  static fillable = [
  "title",
  "description",
  "keyword",
  "page_url",
  "image"
];
  static casts = {};
}

export default Tag;
