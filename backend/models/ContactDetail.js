import { BaseModel } from './BaseModel.js';

export class ContactDetail extends BaseModel {
  static table = 'contact_details';
  static fillable = [
  "email",
  "phone_no",
  "whatsapp_no",
  "location"
];
  static casts = {
  "email": "array",
  "phone_no": "array",
  "whatsapp_no": "array"
};
}

export default ContactDetail;
