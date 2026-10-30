import { BaseModel } from './BaseModel.js';

export class Sm_Benefit extends BaseModel {
  static table = 'sm_benefits';
  static fillable = [
  "heading",
  "description",
  "image"
];
  static casts = {};
}

export default Sm_Benefit;
