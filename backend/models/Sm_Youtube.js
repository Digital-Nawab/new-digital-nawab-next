import { BaseModel } from './BaseModel.js';

export class Sm_Youtube extends BaseModel {
  static table = 'sm_youtube';
  static fillable = [
  "heading",
  "description",
  "image",
  "features"
];
  static casts = {
  "features": "array"
};
}

export default Sm_Youtube;
