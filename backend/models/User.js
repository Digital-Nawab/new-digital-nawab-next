import { BaseModel } from './BaseModel.js';

export class User extends BaseModel {
  static table = 'users';
  static fillable = [
  "name",
  "email",
  "password"
];
  static casts = {};
}

export default User;
