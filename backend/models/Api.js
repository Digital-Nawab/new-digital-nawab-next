import { BaseModel } from './BaseModel.js';

export class Api extends BaseModel {
  static table = 'apis';
  static fillable = [];
  static casts = {};
}

export default Api;
