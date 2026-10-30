import { BaseModel } from './BaseModel.js';

export class Blog extends BaseModel {
  static table = 'blogs';
  static fillable = [
  "meta_key",
  "meta_desc",
  "title",
  "url",
  "keyword",
  "description",
  "author",
  "published",
  "card_img",
  "banner_img"
];
  static casts = {
  "keyword": "array"
};
}

export default Blog;
