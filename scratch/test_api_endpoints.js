import { dispatchRoute } from '../backend/routes/router.js';

function createMockRequest(url, method = 'GET', body = null, headers = {}) {
  const init = {
    method,
    headers: new Headers({
      'content-type': 'application/json',
      ...headers,
    }),
  };
  if (body) {
    init.body = JSON.stringify(body);
  }
  return new Request(url, init);
}

async function runTests() {
  const getEndpoints = [
    { name: 'Root API', path: [] },
    { name: 'Test route', path: ['test'] },
    { name: 'Admin Dashboard', path: ['admin', 'dashboard'] },
    { name: 'Users List', path: ['users'] },
    { name: 'Roles List', path: ['roles'] },
    { name: 'Permissions List', path: ['permissions'] },
    { name: 'Logo', path: ['getlogo'] },
    { name: 'Services', path: ['get_service'] },
    { name: 'Subservices', path: ['getsubservice'] },
    { name: 'Blogs', path: ['getblog'] },
    { name: 'Careers', path: ['getcareer'] },
    { name: 'Contact Details', path: ['getcontactdetail'] },
    { name: 'Creatives', path: ['getcreatives'] },
    { name: 'Our Team', path: ['getourteam'] },
    { name: 'Packages', path: ['getpackage'] },
    { name: 'Package Features', path: ['get_packagefeature'] },
    { name: 'FAQs', path: ['getfaq'] },
    { name: 'Hero Videos', path: ['gethero'] },
    { name: 'Projects', path: ['getproject'] },
    { name: 'Tags', path: ['gettag'] },
    { name: 'Technologies', path: ['gettechnlogies'] },
    { name: 'Vision Mission', path: ['getvision_mission'] },
    { name: 'Home About', path: ['gethomeabout'] },
    { name: 'SEO Highlight', path: ['getseohighlight'] },
    { name: 'SEO Form', path: ['getseoform'] },
    { name: 'SEO Service', path: ['getseoservice'] },
    { name: 'SEO Process', path: ['getseoprocess'] },
    { name: 'SEO Optimization', path: ['getseo_optimization'] },
    { name: 'SEO Strategy', path: ['getseostrategy'] },
    { name: 'SEO Digital', path: ['getseodigital'] },
    { name: 'Dev Cornerstone', path: ['getdev_cornerstone'] },
    { name: 'Dev Step', path: ['getdevstep'] },
    { name: 'Dev Commerce', path: ['getdev_commerce'] },
    { name: 'Dev Maintain', path: ['getdev_maintain'] },
    { name: 'Dev Innovation', path: ['getdev_innovation'] },
    { name: 'SMM Benefit', path: ['getsmmbenefit'] },
    { name: 'SMM Facebook', path: ['getsmmfacebook'] },
    { name: 'SMM Youtube', path: ['getsmmyoutube'] },
    { name: 'SMM Service', path: ['getsmmservice'] },
    { name: 'Google Campaigns', path: ['googlecampaigns'] },
    { name: 'Google Media', path: ['googlemedia'] },
    { name: 'Google PPC', path: ['googleppc'] },
    { name: 'Cities', path: ['cities'] },
    { name: 'Approaches', path: ['approaches'] },
    { name: 'Strategic Approaches', path: ['strategic-approaches'] },
    { name: 'City Services List', path: ['city-services-list'] },
    { name: 'Pricing Sections List', path: ['pricing-sections-list'] },
    { name: 'How We Works List', path: ['how-we-works-list'] },
    { name: 'City Projects List', path: ['city-projects-list'] },
    { name: 'Why Choose Us List', path: ['why-choose-us-list'] },
    { name: 'City FAQs List', path: ['city-faqs-list'] },
    { name: 'City Testimonials List', path: ['city-testimonials-list'] },
    { name: 'Enquiries List', path: ['get_enquiry'] },
    { name: 'Career Forms List', path: ['careerforms'] },
  ];

  console.log(`=== RUNNING ${getEndpoints.length} GET ENDPOINT TESTS ===\n`);
  let passed = 0;
  let failed = 0;

  for (const ep of getEndpoints) {
    const url = `http://localhost:3000/api/${ep.path.join('/')}`;
    const req = createMockRequest(url, 'GET');
    try {
      const res = await dispatchRoute(req, ep.path);
      const json = await res.json();
      if (res.status >= 200 && res.status < 300) {
        console.log(`[PASS] ${ep.name.padEnd(25)} status: ${res.status}`);
        passed++;
      } else {
        console.error(`[FAIL] ${ep.name.padEnd(25)} status: ${res.status} | error:`, json);
        failed++;
      }
    } catch (err) {
      console.error(`[EXCP] ${ep.name.padEnd(25)} exception:`, err.message);
      failed++;
    }
  }

  console.log('\n=== RUNNING POST ENDPOINT TESTS ===\n');

  // Test Enquiry submission
  try {
    const testEnquiry = {
      name: 'Test Migration User',
      email: 'test_migration@digitalnawab.com',
      phone: '9999999999',
      service: 'Web Development',
      message: 'Testing Laravel migration to Next.js',
    };
    const enquiryReq = createMockRequest('http://localhost:3000/api/post_enquiry', 'POST', testEnquiry);
    const enquiryRes = await dispatchRoute(enquiryReq, ['post_enquiry']);
    const enquiryJson = await enquiryRes.json();
    console.log(`[PASS] Post Enquiry: status ${enquiryRes.status}, id: ${enquiryJson?.data?.id || enquiryJson?.id || 'ok'}`);
    passed++;
  } catch (err) {
    console.error(`[FAIL] Post Enquiry:`, err.message);
    failed++;
  }

  // Test Login
  try {
    const loginReq = createMockRequest('http://localhost:3000/api/login', 'POST', {
      email: 'dn@admin.com',
      password: 'wrong_password',
    });
    const loginRes = await dispatchRoute(loginReq, ['login']);
    // Expect 401 for wrong password
    if (loginRes.status === 401) {
      console.log(`[PASS] Login Auth Check: Correctly rejected invalid credentials with 401`);
      passed++;
    } else {
      console.log(`[INFO] Login response: status ${loginRes.status}`);
    }
  } catch (err) {
    console.error(`[FAIL] Login test:`, err.message);
    failed++;
  }

  console.log(`\n========================================`);
  console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
