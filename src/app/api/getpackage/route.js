import { NextResponse } from 'next/server';
import { query } from '@/../backend/database/db.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const identifier = searchParams.get('type') || searchParams.get('package_for');

    let packages;
    if (identifier) {
      packages = await query('SELECT * FROM packages WHERE package_for = ? ORDER BY id ASC', [identifier]);
    } else {
      packages = await query('SELECT * FROM packages ORDER BY id ASC');
    }

    const packageIds = packages.map((p) => p.id);
    let features = [];
    if (packageIds.length > 0) {
      const placeholders = packageIds.map(() => '?').join(',');
      features = await query(`SELECT * FROM package_features WHERE package_id IN (${placeholders})`, packageIds);
    }

    const result = packages.map((pkg) => ({
      ...pkg,
      features: features.filter((f) => f.package_id === pkg.id),
    }));

    return NextResponse.json({
      message: 'Packages fetched successfully',
      data: result,
    });
  } catch (error) {
    console.error('getpackage error:', error);
    return NextResponse.json({ message: error.message, data: [] }, { status: 500 });
  }
}
