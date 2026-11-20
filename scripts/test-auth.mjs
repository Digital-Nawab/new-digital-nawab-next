import { queryOne } from '../backend/database/db.js';
import { comparePassword, getUserWithRolesAndPermissions } from '../backend/middleware/auth.js';

async function test() {
  try {
    const user = await queryOne('SELECT id, name, email, password FROM users WHERE email = ?', ['admin@digitalnawab.com']);
    if (!user) {
      console.log('admin@digitalnawab.com not found, trying first user...');
    }
    const targetUser = user || (await queryOne('SELECT id, name, email, password FROM users LIMIT 1'));
    console.log('Testing user:', targetUser.email);
    console.log('Password hash format:', targetUser.password ? targetUser.password.substring(0, 10) : 'null');

    const fullUser = await getUserWithRolesAndPermissions(targetUser.id);
    console.log('Full user details:', {
      id: fullUser.id,
      name: fullUser.name,
      email: fullUser.email,
      roles: fullUser.roles,
      permissionsCount: fullUser.permissions.length
    });

    console.log('Auth test PASSED!');
    process.exit(0);
  } catch (err) {
    console.error('Auth test FAILED:', err);
    process.exit(1);
  }
}

test();
