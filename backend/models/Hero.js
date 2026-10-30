import { BaseModel } from './BaseModel.js';

export class Hero extends BaseModel {
  static table = 'home_heros';
  static fillable = [
  "video_type",
  "video"
];
  static casts = {};
}

export default Hero;
