import mysql from 'mysql2/promise';

let pool;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || '127.0.0.1',
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_DATABASE || process.env.DB_NAME || 'dndatabase',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    });
  }
  return pool;
}

export async function query(sql, params = []) {
  const p = getPool();
  const [rows] = await p.execute(sql, params);
  return rows;
}

export async function queryOne(sql, params = []) {
  const rows = await query(sql, params);
  return rows && rows.length > 0 ? rows[0] : null;
}

export async function insert(table, data) {
  const keys = Object.keys(data);
  if (keys.length === 0) return null;
  const columns = keys.map((k) => `\`${k}\``).join(', ');
  const placeholders = keys.map(() => '?').join(', ');
  const values = keys.map((k) => data[k]);

  const sql = `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`;
  const p = getPool();
  const [result] = await p.execute(sql, values);
  return result.insertId;
}

export async function update(table, data, whereClause, whereParams = []) {
  const keys = Object.keys(data);
  if (keys.length === 0) return 0;
  const setClauses = keys.map((k) => `\`${k}\` = ?`).join(', ');
  const values = [...keys.map((k) => data[k]), ...whereParams];

  const sql = `UPDATE \`${table}\` SET ${setClauses} WHERE ${whereClause}`;
  const p = getPool();
  const [result] = await p.execute(sql, values);
  return result.affectedRows;
}

export async function deleteById(table, id, idCol = 'id') {
  const sql = `DELETE FROM \`${table}\` WHERE \`${idCol}\` = ?`;
  const p = getPool();
  const [result] = await p.execute(sql, [id]);
  return result.affectedRows;
}

export default {
  getPool,
  query,
  queryOne,
  insert,
  update,
  deleteById,
};
