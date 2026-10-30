import { BaseModel } from './BaseModel.js';

export class Seo_Process extends BaseModel {
  static table = 'seo_processes';
  static fillable = [
  "icon",
  "heading",
  "description"
];
  static casts = {};
}

export default Seo_Process;
