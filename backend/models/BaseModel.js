import { query, execute } from '../database/db.js';

export class BaseModel {
  static table = '';
  static primaryKey = 'id';
  static fillable = [];
  static casts = {};

  static formatRow(row) {
    if (!row || typeof row !== 'object') return row;
    const formatted = { ...row };
    for (const [key, castType] of Object.entries(this.casts)) {
      if (formatted[key] !== undefined && formatted[key] !== null) {
        if (castType === 'array' || castType === 'json') {
          if (typeof formatted[key] === 'string') {
            try {
              formatted[key] = JSON.parse(formatted[key]);
            } catch {
              formatted[key] = [];
            }
          }
        } else if (castType === 'boolean') {
          formatted[key] = Boolean(formatted[key]);
        } else if (castType === 'int' || castType === 'integer') {
          formatted[key] = Number(formatted[key]);
        }
      }
    }
    return formatted;
  }

  static formatRows(rows) {
    if (!Array.isArray(rows)) return [];
    return rows.map((r) => this.formatRow(r));
  }

  static async all() {
    const rows = await query(`SELECT * FROM ${this.table}`);
    return this.formatRows(rows);
  }

  static async find(id) {
    const rows = await query(`SELECT * FROM ${this.table} WHERE ${this.primaryKey} = ? LIMIT 1`, [id]);
    return rows.length ? this.formatRow(rows[0]) : null;
  }

  static async findOrFail(id) {
    const record = await this.find(id);
    if (!record) {
      throw new Error(`Record with ${this.primaryKey} ${id} not found in ${this.table}`);
    }
    return record;
  }

  static async where(col, operatorOrVal, val = undefined) {
    let operator = '=';
    let value = operatorOrVal;
    if (val !== undefined) {
      operator = operatorOrVal;
      value = val;
    }
    const rows = await query(`SELECT * FROM ${this.table} WHERE ${col} ${operator} ?`, [value]);
    return this.formatRows(rows);
  }

  static async firstWhere(col, operatorOrVal, val = undefined) {
    const rows = await this.where(col, operatorOrVal, val);
    return rows.length ? rows[0] : null;
  }

  static async latest(col = 'created_at') {
    const rows = await query(`SELECT * FROM ${this.table} ORDER BY ${col} DESC LIMIT 1`);
    return rows.length ? this.formatRow(rows[0]) : null;
  }

  static async orderBy(col = 'id', direction = 'ASC') {
    const rows = await query(`SELECT * FROM ${this.table} ORDER BY ${col} ${direction}`);
    return this.formatRows(rows);
  }

  static async count(whereCol = null, whereVal = null) {
    if (whereCol !== null) {
      const rows = await query(`SELECT COUNT(*) as c FROM ${this.table} WHERE ${whereCol} = ?`, [whereVal]);
      return Number(rows[0]?.c || 0);
    }
    const rows = await query(`SELECT COUNT(*) as c FROM ${this.table}`);
    return Number(rows[0]?.c || 0);
  }

  static async create(attributes = {}) {
    const keys = [];
    const values = [];
    const placeholders = [];

    for (const [key, val] of Object.entries(attributes)) {
      if (this.fillable.length === 0 || this.fillable.includes(key)) {
        keys.push(key);
        placeholders.push('?');
        let processedVal = val;
        if (this.casts[key] === 'array' || this.casts[key] === 'json' || typeof val === 'object') {
          processedVal = val !== null && val !== undefined ? JSON.stringify(val) : null;
        }
        values.push(processedVal);
      }
    }

    if (keys.length === 0) {
      throw new Error(`No fillable attributes provided for ${this.table}`);
    }

    const hasTimestamps = true; // most tables have created_at/updated_at
    let sql = '';
    try {
      sql = `INSERT INTO ${this.table} (${keys.join(', ')}, created_at, updated_at) VALUES (${placeholders.join(', ')}, NOW(), NOW())`;
      const res = await execute(sql, values);
      return await this.find(res.insertId);
    } catch {
      // If timestamps columns don't exist, fallback to plain insert
      sql = `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders.join(', ')})`;
      const res = await execute(sql, values);
      return await this.find(res.insertId);
    }
  }

  static async update(id, attributes = {}) {
    const setClauses = [];
    const values = [];

    for (const [key, val] of Object.entries(attributes)) {
      if (key !== this.primaryKey && (this.fillable.length === 0 || this.fillable.includes(key))) {
        setClauses.push(`${key} = ?`);
        let processedVal = val;
        if (this.casts[key] === 'array' || this.casts[key] === 'json' || (typeof val === 'object' && val !== null)) {
          processedVal = JSON.stringify(val);
        }
        values.push(processedVal);
      }
    }

    if (setClauses.length === 0) {
      return await this.find(id);
    }

    values.push(id);
    try {
      await execute(
        `UPDATE ${this.table} SET ${setClauses.join(', ')}, updated_at = NOW() WHERE ${this.primaryKey} = ?`,
        values
      );
    } catch {
      await execute(
        `UPDATE ${this.table} SET ${setClauses.join(', ')} WHERE ${this.primaryKey} = ?`,
        values
      );
    }
    return await this.find(id);
  }

  static async delete(id) {
    const res = await execute(`DELETE FROM ${this.table} WHERE ${this.primaryKey} = ?`, [id]);
    return res.affectedRows > 0;
  }
}

