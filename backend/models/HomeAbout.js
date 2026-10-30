import { BaseModel } from './BaseModel.js';

export class HomeAbout extends BaseModel {
  static table = 'home_abouts';
  static fillable = [
  "tag",
  "heading",
  "sub_heading",
  "image",
  "content",
  "button_text",
  "button_url"
];
  static casts = {};
}

export default HomeAbout;
