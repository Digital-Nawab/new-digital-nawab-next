import { BaseModel } from './BaseModel.js';

export class City extends BaseModel {
  static table = 'cities';
  static fillable = [
  "name",
  "slug",
  "badge_text",
  "heading_prefix",
  "heading_suffix",
  "description",
  "phone_number",
  "whatsapp_number",
  "meta_title",
  "meta_description",
  "is_active",
  "stat_years_value",
  "stat_campaigns_value",
  "stat_clients_value",
  "stat_retention_value",
  "stat_support_value",
  "stat_reporting_value",
  "market_description",
  "market_areas"
];
  static casts = {
  "is_active": "boolean",
  "market_areas": "array"
};
}

export default City;
