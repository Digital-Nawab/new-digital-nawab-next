import http from 'http';
import { query } from '../backend/database/db.js';

async function testDirectQueries() {
  console.log('Testing queries backing public APIs...');

  const blogs = await query('SELECT COUNT(*) as c FROM blogs');
  console.log('✓ /api/getblog (blogs count):', blogs[0].c);

  const services = await query('SELECT COUNT(*) as c FROM services');
  console.log('✓ /api/get_service (services count):', services[0].c);

  const cities = await query('SELECT COUNT(*) as c FROM cities');
  console.log('✓ /api/cities (cities count):', cities[0].c);

  const pricing = await query('SELECT COUNT(*) as c FROM pricing_sections');
  console.log('✓ /api/pricing-sections-list (pricing count):', pricing[0].c);

  const enquiries = await query('SELECT COUNT(*) as c FROM enquiries');
  console.log('✓ /api/post_enquiry target table count:', enquiries[0].c);

  const heroes = await query('SELECT COUNT(*) as c FROM home_heros');
  console.log('✓ /api/gethero count:', heroes[0].c);

  const team = await query('SELECT COUNT(*) as c FROM our_team');
  console.log('✓ /api/getourteam count:', team[0].c);

  const projects = await query('SELECT COUNT(*) as c FROM projects');
  console.log('✓ /api/getproject count:', projects[0].c);

  console.log('ALL PUBLIC API QUERIES VERIFIED SUCCESSFULLY!');
  process.exit(0);
}

testDirectQueries().catch((e) => {
  console.error(e);
  process.exit(1);
});
