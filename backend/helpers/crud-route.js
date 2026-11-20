import { NextResponse } from 'next/server';
import { query, queryOne, insert, update, deleteById } from '../database/db.js';
import { getAuthUser } from '../middleware/auth.js';
import { saveUploadFile, deleteUploadedFile } from './upload.js';

/**
 * Creates standardized Next.js route handlers for CRUD on a table.
 */
export function createCrudHandlers(options) {
  const {
    table,
    primaryKey = 'id',
    orderBy = 'id DESC',
    jsonFields = [],
    fileFields = [], // [{ name: 'image', dir: 'assets/images/...' }]
    allowedRoles = ['admin'],
    transformItem = (item) => item,
    beforeSave = async (data, isUpdate) => data,
    afterDelete = async (item) => {},
  } = options;

  async function checkPermission(req) {
    const user = await getAuthUser(req);
    if (!user) {
      return { allowed: false, response: NextResponse.json({ status: false, message: 'Unauthenticated' }, { status: 401 }) };
    }
    const isAdmin = user.roles.includes('admin') || user.roles.includes('Super Admin');
    if (!isAdmin && allowedRoles.length > 0) {
      const hasRole = allowedRoles.some((r) => user.roles.includes(r));
      if (!hasRole) {
        return { allowed: false, response: NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 }) };
      }
    }
    return { allowed: true, user };
  }

  function parseItem(item) {
    if (!item) return null;
    const cloned = { ...item };
    for (const f of jsonFields) {
      if (cloned[f]) {
        try {
          cloned[f] = typeof cloned[f] === 'string' ? JSON.parse(cloned[f]) : cloned[f];
        } catch (e) {
          cloned[f] = [];
        }
      } else {
        cloned[f] = [];
      }
    }
    return transformItem(cloned);
  }

  // GET collection
  const GET = async (req) => {
    try {
      const auth = await checkPermission(req);
      if (!auth.allowed) return auth.response;

      const items = await query(`SELECT * FROM \`${table}\` ORDER BY ${orderBy}`);
      return NextResponse.json({
        status: true,
        data: items.map(parseItem),
      });
    } catch (error) {
      console.error(`GET ${table} error:`, error);
      return NextResponse.json({ status: false, message: error.message }, { status: 500 });
    }
  };

  // POST create
  const POST = async (req) => {
    try {
      const auth = await checkPermission(req);
      if (!auth.allowed) return auth.response;

      let data = {};
      const contentType = req.headers.get('content-type') || '';

      if (contentType.includes('multipart/form-data')) {
        const formData = await req.formData();
        for (const [key, val] of formData.entries()) {
          // If this key is one of the fileFields and is a file
          const fileConfig = fileFields.find((f) => f.name === key);
          if (fileConfig && val && typeof val !== 'string' && val.size > 0) {
            data[key] = await saveUploadFile(val, fileConfig.dir || 'assets/images/uploads');
          } else if (!fileConfig) {
            data[key] = val;
          }
        }
      } else {
        data = await req.json();
      }

      // Serialize JSON fields
      for (const f of jsonFields) {
        if (data[f] !== undefined) {
          data[f] = typeof data[f] === 'string' ? data[f] : JSON.stringify(data[f]);
        }
      }

      data.created_at = new Date();
      data.updated_at = new Date();

      data = await beforeSave(data, false);

      const newId = await insert(table, data);
      const createdItem = await queryOne(`SELECT * FROM \`${table}\` WHERE \`${primaryKey}\` = ?`, [newId]);

      return NextResponse.json({
        status: true,
        message: `${table} created successfully`,
        data: parseItem(createdItem),
      });
    } catch (error) {
      console.error(`POST ${table} error:`, error);
      return NextResponse.json({ status: false, message: error.message }, { status: 500 });
    }
  };

  return { GET, POST, parseItem, checkPermission };
}

/**
 * Creates standardized Next.js route handlers for single item CRUD (GET, PUT, DELETE).
 */
export function createCrudItemHandlers(options) {
  const {
    table,
    primaryKey = 'id',
    jsonFields = [],
    fileFields = [],
    allowedRoles = ['admin'],
    transformItem = (item) => item,
    beforeSave = async (data, isUpdate) => data,
    afterDelete = async (item) => {},
  } = options;

  async function checkPermission(req) {
    const user = await getAuthUser(req);
    if (!user) {
      return { allowed: false, response: NextResponse.json({ status: false, message: 'Unauthenticated' }, { status: 401 }) };
    }
    const isAdmin = user.roles.includes('admin') || user.roles.includes('Super Admin');
    if (!isAdmin && allowedRoles.length > 0) {
      const hasRole = allowedRoles.some((r) => user.roles.includes(r));
      if (!hasRole) {
        return { allowed: false, response: NextResponse.json({ status: false, message: 'Forbidden' }, { status: 403 }) };
      }
    }
    return { allowed: true, user };
  }

  function parseItem(item) {
    if (!item) return null;
    const cloned = { ...item };
    for (const f of jsonFields) {
      if (cloned[f]) {
        try {
          cloned[f] = typeof cloned[f] === 'string' ? JSON.parse(cloned[f]) : cloned[f];
        } catch (e) {
          cloned[f] = [];
        }
      } else {
        cloned[f] = [];
      }
    }
    return transformItem(cloned);
  }

  // GET single
  const GET = async (req, { params }) => {
    try {
      const auth = await checkPermission(req);
      if (!auth.allowed) return auth.response;

      const p = await params;
      const id = p[primaryKey] || p.id;

      const item = await queryOne(`SELECT * FROM \`${table}\` WHERE \`${primaryKey}\` = ?`, [id]);
      if (!item) {
        return NextResponse.json({ status: false, message: 'Not found' }, { status: 404 });
      }

      return NextResponse.json({ status: true, data: parseItem(item) });
    } catch (error) {
      console.error(`GET single ${table} error:`, error);
      return NextResponse.json({ status: false, message: error.message }, { status: 500 });
    }
  };

  // PUT / POST update
  const PUT = async (req, { params }) => {
    try {
      const auth = await checkPermission(req);
      if (!auth.allowed) return auth.response;

      const p = await params;
      const id = p[primaryKey] || p.id;

      const existing = await queryOne(`SELECT * FROM \`${table}\` WHERE \`${primaryKey}\` = ?`, [id]);
      if (!existing) {
        return NextResponse.json({ status: false, message: 'Not found' }, { status: 404 });
      }

      let data = {};
      const contentType = req.headers.get('content-type') || '';

      if (contentType.includes('multipart/form-data')) {
        const formData = await req.formData();
        for (const [key, val] of formData.entries()) {
          const fileConfig = fileFields.find((f) => f.name === key);
          if (fileConfig && val && typeof val !== 'string' && val.size > 0) {
            data[key] = await saveUploadFile(val, fileConfig.dir || 'assets/images/uploads');
            // Delete old file if exists
            if (existing[key]) {
              await deleteUploadedFile(existing[key]);
            }
          } else if (!fileConfig) {
            data[key] = val;
          }
        }
      } else {
        data = await req.json();
      }

      // Serialize JSON fields
      for (const f of jsonFields) {
        if (data[f] !== undefined) {
          data[f] = typeof data[f] === 'string' ? data[f] : JSON.stringify(data[f]);
        }
      }

      data.updated_at = new Date();
      // Don't update primaryKey
      delete data[primaryKey];

      data = await beforeSave(data, true);

      await update(table, data, `\`${primaryKey}\` = ?`, [id]);
      const updatedItem = await queryOne(`SELECT * FROM \`${table}\` WHERE \`${primaryKey}\` = ?`, [id]);

      return NextResponse.json({
        status: true,
        message: `${table} updated successfully`,
        data: parseItem(updatedItem),
      });
    } catch (error) {
      console.error(`PUT ${table} error:`, error);
      return NextResponse.json({ status: false, message: error.message }, { status: 500 });
    }
  };

  // DELETE
  const DELETE = async (req, { params }) => {
    try {
      const auth = await checkPermission(req);
      if (!auth.allowed) return auth.response;

      const p = await params;
      const id = p[primaryKey] || p.id;

      const existing = await queryOne(`SELECT * FROM \`${table}\` WHERE \`${primaryKey}\` = ?`, [id]);
      if (!existing) {
        return NextResponse.json({ status: false, message: 'Not found' }, { status: 404 });
      }

      // Clean up files
      for (const fileConfig of fileFields) {
        if (existing[fileConfig.name]) {
          await deleteUploadedFile(existing[fileConfig.name]);
        }
      }

      await deleteById(table, id, primaryKey);
      await afterDelete(existing);

      return NextResponse.json({
        status: true,
        message: `${table} deleted successfully`,
      });
    } catch (error) {
      console.error(`DELETE ${table} error:`, error);
      return NextResponse.json({ status: false, message: error.message }, { status: 500 });
    }
  };

  return { GET, PUT, POST: PUT, DELETE };
}
