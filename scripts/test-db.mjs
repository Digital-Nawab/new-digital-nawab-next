import { query, queryOne } from '../backend/database/db.js';

async function test() {
  try {
    const userCount = await queryOne('SELECT COUNT(*) as count FROM users');
    console.log('User count:', userCount);

    const adminUser = await queryOne('SELECT id, name, email, password FROM users LIMIT 1');
    console.log('Sample user:', { id: adminUser.id, name: adminUser.name, email: adminUser.email });

    const blogCount = await queryOne('SELECT COUNT(*) as count FROM blogs');
    console.log('Blog count:', blogCount);

    const servicesCount = await queryOne('SELECT COUNT(*) as count FROM services');
    console.log('Services count:', servicesCount);

    const citiesCount = await queryOne('SELECT COUNT(*) as count FROM cities');
    console.log('Cities count:', citiesCount);

    const enquiriesCount = await queryOne('SELECT COUNT(*) as count FROM enquiries');
    console.log('Enquiries count:', enquiriesCount);

    console.log('Database test PASSED!');
    process.exit(0);
  } catch (err) {
    console.error('Database test FAILED:', err);
    process.exit(1);
  }
}

test();
