import { BaseModel } from './BaseModel.js';

export class vision_mission extends BaseModel {
  static table = 'vision_mission';
  static fillable = [
  "heading",
  "para",
  "vision_heading",
  "vision_description",
  "mission_heading",
  "mission_description"
];
  static casts = {};
}

export default vision_mission;
