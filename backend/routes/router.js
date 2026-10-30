import { jsonResponse, errorResponse, parseRequestBody } from '../utils/api-helpers.js';
import * as apiCtrl from '../controllers/apiController.js';
import * as cityCtrl from '../controllers/cityController.js';
import * as enquiryCtrl from '../controllers/enquiryController.js';
import * as careerFormCtrl from '../controllers/careerFormController.js';
import * as seoFormCtrl from '../controllers/seoFormController.js';
import * as crudCtrl from '../controllers/crudController.js';
import * as authCtrl from '../controllers/authController.js';
import { AdminController } from '../controllers/AdminController.js';
import { UserController } from '../controllers/UserController.js';
import { RoleController } from '../controllers/RoleController.js';
import { PermissionController } from '../controllers/PermissionController.js';
import { ProfileController } from '../controllers/ProfileController.js';
import { RevokePermissionController } from '../controllers/RevokePermissionController.js';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/role.js';

export function handleOptions() {
  return jsonResponse({ status: true });
}

export async function handleGet(request, pathParts = []) {
  try {
    const path = pathParts.join('/').toLowerCase();
    const { searchParams } = new URL(request.url);

    // Root / Healthcheck / test
    if (!path || path === '' || path === 'health') {
      return jsonResponse({
        status: true,
        message: 'Digital Nawab Backend API is active',
        timestamp: new Date().toISOString(),
      });
    }
    if (path === 'test') {
      return jsonResponse({ message: 'API working' });
    }

    // Auth & Users
    if (path === 'user') {
      return authCtrl.getCurrentUser(request);
    }
    if (path === 'admin' || path === 'admin/dashboard') {
      return AdminController.index();
    }
    if (path === 'users') {
      return UserController.index();
    }
    if (path.startsWith('users/') && pathParts[1]) {
      return UserController.show(pathParts[1]);
    }
    if (path === 'roles') {
      return RoleController.index();
    }
    if (path.startsWith('roles/') && pathParts[1]) {
      return RoleController.show(pathParts[1]);
    }
    if (path === 'permissions') {
      return PermissionController.index();
    }
    if (path.startsWith('permissions/') && pathParts[1]) {
      return PermissionController.show(pathParts[1]);
    }
    if (path === 'profile') {
      return ProfileController.edit(1);
    }

    // Core Frontend APIs
    if (path === 'getlogo' || path === 'logo') {
      return apiCtrl.getLogo();
    }
    if (path === 'get_service' || path === 'services') {
      return apiCtrl.getService();
    }
    if (path === 'getsubservice' || path === 'get_subservice' || path === 'subservices') {
      return apiCtrl.getSubservice();
    }
    if (path.startsWith('get_subserviceid/')) {
      const serviceId = pathParts[1];
      return apiCtrl.getSubserviceByServiceId(serviceId);
    }
    if (path === 'getblog' || path === 'get_blog' || path === 'blogs') {
      return apiCtrl.getBlog();
    }
    if (path === 'blogdetail' || path === 'getblogdetail') {
      const url = searchParams.get('url');
      return apiCtrl.getBlogDetail(url);
    }
    if (path === 'getcareer' || path === 'get_career' || path === 'career') {
      return apiCtrl.getCareer();
    }
    if (path.startsWith('careerdetail/')) {
      const id = pathParts[1];
      return apiCtrl.getCareerDetail(id);
    }
    if (path === 'careerdetail') {
      const id = searchParams.get('id');
      return apiCtrl.getCareerDetail(id);
    }
    if (path === 'getcontactdetail' || path === 'get_contact' || path === 'contact-details') {
      return apiCtrl.getContactDetail();
    }
    if (path === 'getcreatives' || path === 'get_creatives' || path === 'creatives') {
      return apiCtrl.getCreatives();
    }
    if (path === 'getourteam' || path === 'show_ourteam' || path === 'our-team') {
      return apiCtrl.getOurTeam();
    }
    if (path === 'getpackage' || path === 'get_package' || path === 'packages') {
      return apiCtrl.getPackage();
    }
    if (path.startsWith('show_package/') || path.startsWith('package/')) {
      const identifier = pathParts[1];
      return apiCtrl.getPackage(identifier);
    }
    if (path === 'get_packagefeature' || path === 'getpackagefeature' || path === 'package-features') {
      return apiCtrl.getPackageFeatures();
    }
    if (path.startsWith('show_packagefeature/')) {
      return apiCtrl.getPackageFeatures();
    }
    if (path === 'getfaq' || path === 'get_faq' || path === 'faqs') {
      return apiCtrl.getFaq();
    }
    if (path === 'gethero' || path === 'get_hero' || path === 'hero-videos') {
      return apiCtrl.getHero();
    }
    if (path === 'getproject' || path === 'get_project' || path === 'projects') {
      return apiCtrl.getProject();
    }
    if (path === 'get_index' || path === 'index') {
      return apiCtrl.getIndexProjects();
    }
    if (path === 'gettag' || path === 'get_tag' || path === 'tags') {
      return apiCtrl.getTag();
    }
    if (path === 'gettechnlogies' || path === 'get_technology' || path === 'technologies') {
      return apiCtrl.getTechnologies();
    }
    if (path === 'getvision_mission' || path === 'show-vision' || path === 'vision-mission') {
      return apiCtrl.getVisionMission();
    }
    if (path === 'gethomeabout' || path === 'get_home_about' || path === 'home-about') {
      return apiCtrl.getHomeAbout();
    }

    // SEO Modules
    if (path === 'getseohighlight' || path === 'get_seo' || path === 'seo-highlights') {
      return apiCtrl.getSeoHighlight();
    }
    if (path === 'getseoform' || path === 'get_seoform' || path === 'seo-forms') {
      return apiCtrl.getSeoForm();
    }
    if (path === 'getseoservice' || path === 'get_seoservice' || path === 'seo-services') {
      return apiCtrl.getSeoService();
    }
    if (path === 'getseoprocess' || path === 'get_seoprocess' || path === 'seo-processes') {
      return apiCtrl.getSeoProcess();
    }
    if (path === 'getseo_optimization' || path === 'get_seo_optimization' || path === 'seo-optimization') {
      return apiCtrl.getSeoOptimization();
    }
    if (path === 'getseostrategy' || path === 'get_seostrategy' || path === 'seo-strategy') {
      return apiCtrl.getSeoStrategy();
    }
    if (path === 'getseodigital' || path === 'get_seodigital' || path === 'seo-digital') {
      return apiCtrl.getSeoDigital();
    }

    // Dev Modules
    if (path === 'getdev_cornerstone' || path === 'get_devcornerstone' || path === 'dev-cornerstone') {
      return apiCtrl.getDevCornerstone();
    }
    if (path === 'getdevstep' || path === 'get_devstep' || path === 'dev-step') {
      return apiCtrl.getDevStep();
    }
    if (path === 'getdev_commerce' || path === 'get_devcommerce' || path === 'dev-commerce') {
      return apiCtrl.getDevCommerce();
    }
    if (path === 'getdev_maintain' || path === 'get_devmaintain' || path === 'dev-maintain') {
      return apiCtrl.getDevMaintain();
    }
    if (path === 'getdev_innovation' || path === 'get_devinnovation' || path === 'dev-innovation') {
      return apiCtrl.getDevInnovation();
    }

    // SMM Modules
    if (path === 'getsmmbenefit' || path === 'get_smmbenefit' || path === 'smm-benefit') {
      return apiCtrl.getSmmBenefit();
    }
    if (path === 'getsmmfacebook' || path === 'get_smmfacebook' || path === 'smm-facebook') {
      return apiCtrl.getSmmFacebook();
    }
    if (path === 'getsmmyoutube' || path === 'get_smmyoutube' || path === 'smm-youtube') {
      return apiCtrl.getSmmYoutube();
    }
    if (path === 'getsmmservice' || path === 'social-service') {
      return apiCtrl.getSmmServices();
    }

    // Google Modules
    if (path === 'googlecampaigns' || path === 'google-campaigns') {
      return apiCtrl.getGoogleCampaigns();
    }
    if (path === 'googlemedia' || path === 'google-media') {
      return apiCtrl.getGoogleMedia();
    }
    if (path === 'googleppc' || path === 'google-ppc') {
      return apiCtrl.getGooglePpc();
    }
    if (path === 'graphicslogo' || path === 'graphics-logo') {
      return apiCtrl.getLogo();
    }

    // City & Regional Endpoints
    const citySlug = searchParams.get('city_slug') || searchParams.get('slug');

    if (path === 'cities' || path === 'city') {
      return cityCtrl.getCities();
    }
    if (path === 'approaches' || path === 'approach') {
      return cityCtrl.getApproaches(citySlug);
    }
    if (path === 'strategic-approaches' || path === 'strategic-approach') {
      return cityCtrl.getStrategicApproaches(citySlug);
    }
    if (path === 'city-services-list' || path === 'city-services') {
      return cityCtrl.getCityServices(citySlug);
    }
    if (path === 'pricing-sections-list' || path === 'pricing-sections') {
      return cityCtrl.getPricingSections(citySlug);
    }
    if (path === 'how-we-works-list' || path === 'how-we-works') {
      return cityCtrl.getHowWeWorks(citySlug);
    }
    if (path === 'city-projects-list' || path === 'city-projects') {
      return cityCtrl.getCityProjects(citySlug);
    }
    if (path === 'why-choose-us-list' || path === 'why-choose-us') {
      return cityCtrl.getWhyChooseUs(citySlug);
    }
    if (path === 'city-faqs-list' || path === 'city-faqs') {
      return cityCtrl.getCityFaqs(citySlug);
    }
    if (path === 'city-testimonials-list' || path === 'city-testimonials') {
      return cityCtrl.getCityTestimonials(citySlug);
    }

    // Forms / Enquiries
    if (path === 'get_enquiry' || path === 'enquiries') {
      return enquiryCtrl.getEnquiries();
    }
    if (path === 'careerforms' || path === 'get_careerforms') {
      return careerFormCtrl.getCareerForms();
    }

    return errorResponse(`Route not found: GET /api/${path}`, 404);
  } catch (err) {
    console.error('API GET error:', err);
    return errorResponse(err.message, 500);
  }
}

export async function handlePost(request, pathParts = []) {
  try {
    const path = pathParts.join('/').toLowerCase();

    // Enquiries
    if (path === 'post_enquiry' || path === 'enquiries') {
      const body = await parseRequestBody(request);
      return enquiryCtrl.postEnquiry(body);
    }
    if (pathParts[0] === 'users' && pathParts[1]) {
      return UserController.update(pathParts[1], request);
    }
    if (pathParts[0] === 'roles' && pathParts[1]) {
      return RoleController.update(pathParts[1], request);
    }
    if (pathParts[0] === 'permissions' && pathParts[1]) {
      return PermissionController.update(pathParts[1], request);
    }
    if (path.startsWith('update_enquirystatus/') || (pathParts[0] === 'enquiries' && pathParts[1])) {
      const id = pathParts[1];
      const body = await parseRequestBody(request);
      return enquiryCtrl.updateEnquiryStatus(id, body.status);
    }

    // Career Form
    if (path === 'career_form' || path === 'careerforms') {
      return careerFormCtrl.storeCareerFormData(request);
    }

    // SEO Form
    if (path === 'post_seoform' || path === 'seo-forms') {
      return seoFormCtrl.storeSeoForm(request);
    }

    // Auth
    if (path === 'login') {
      return authCtrl.login(request);
    }
    if (path === 'register') {
      return authCtrl.register(request);
    }
    if (path === 'logout') {
      return jsonResponse({ status: true, message: 'Logged out successfully' });
    }
    if (path === 'users') {
      return UserController.store(request);
    }
    if (path === 'roles') {
      return RoleController.store(request);
    }
    if (path === 'permissions') {
      return PermissionController.store(request);
    }
    if (path === 'profile') {
      return ProfileController.update(1, request);
    }

    // Service & Subservice
    if (path === 'post_service' || path === 'services') {
      return crudCtrl.postService(request);
    }
    if (path.startsWith('update_service/')) {
      const id = pathParts[1];
      return crudCtrl.updateService(id, request);
    }
    if (path === 'post_subservice' || path === 'subservices') {
      return crudCtrl.postSubservice(request);
    }

    // Blog
    if (path === 'post_blog' || path === 'blogs') {
      return crudCtrl.postBlog(request);
    }
    if (path.startsWith('update_blog/')) {
      const id = pathParts[1];
      return crudCtrl.updateBlog(id, request);
    }

    // Cities
    if (path === 'cities' || path === 'city') {
      const body = await parseRequestBody(request);
      return cityCtrl.createCity(body);
    }
    if (path.startsWith('update_city/')) {
      const id = pathParts[1];
      const body = await parseRequestBody(request);
      return cityCtrl.updateCity(id, body);
    }

    // Generic post routes for various tables
    const genericTableMap = {
      post_faq: 'faqs',
      post_hero: 'home_heros',
      post_career: 'careers',
      post_technology: 'technology',
      post_contact: 'contact_details',
      'contact-details': 'contact_details',
      contact_details: 'contact_details',
      'why-choose-us': 'why_choose_us',
      why_choose_us: 'why_choose_us',
      'city-services': 'city_services',
      city_services: 'city_services',
      'pricing-sections': 'pricing_sections',
      pricing_sections: 'pricing_sections',
      'how-we-works': 'how_we_works',
      how_we_works: 'how_we_works',
      'how-we-work': 'how_we_works',
      how_we_work: 'how_we_works',
      'strategic-approaches': 'strategic_approaches',
      strategic_approaches: 'strategic_approaches',
      'strategic-approach': 'strategic_approaches',
      strategic_approach: 'strategic_approaches',
      'city-projects': 'city_projects',
      city_projects: 'city_projects',
      'city-faqs': 'city_faqs',
      city_faqs: 'city_faqs',
      'city-testimonials': 'city_testimonials',
      city_testimonials: 'city_testimonials',
      approaches: 'approaches',
      approach: 'approaches',
      post_creatives: 'creatives',
      post_home_about: 'home_abouts',
      post_tag: 'tags',
      post_project: 'projects',
      post_seo: 'seo_highlights',
      post_seoservice: 'seo_services',
      post_seoprocess: 'seo_processes',
      post_seo_optimization: 'seo_optimizations',
      post_seostrategy: 'seo_strategies',
      post_seodigital: 'seo_digital',
      post_devcornerstone: 'dev_cornerstones',
      post_devstep: 'dev_steps',
      post_devcommerce: 'dev_commerces',
      post_devmaintain: 'dev_maintains',
      post_devinnovation: 'dev_innovations',
      post_smmbenefit: 'sm_benefits',
      post_smmfacebook: 'sm_facebook',
      post_smmyoutube: 'sm_youtube',
      post_package: 'packages',
      post_packagefeature: 'package_features',
      'add-vision': 'vision_mission',
    };

    if (genericTableMap[path]) {
      const { body } = await crudCtrl.parseRequest(request);
      return crudCtrl.genericInsert(genericTableMap[path], body);
    }

    // Generic updates
    if (pathParts.length === 2 && pathParts[0].startsWith('update_')) {
      const prefix = pathParts[0].replace('update_', '');
      const id = pathParts[1];
      const { body } = await crudCtrl.parseRequest(request);
      const tableName = genericTableMap[`post_${prefix}`] || prefix;
      return crudCtrl.genericUpdate(tableName, id, body);
    }

    return errorResponse(`Route not found: POST /api/${path}`, 404);
  } catch (err) {
    console.error('API POST error:', err);
    return errorResponse(err.message, 500);
  }
}

export async function handlePut(request, pathParts = []) {
  try {
    const path = pathParts.join('/').toLowerCase();
    const body = await parseRequestBody(request);

    if (pathParts[0] === 'users' && pathParts[1]) {
      return UserController.update(pathParts[1], request);
    }
    if (pathParts[0] === 'roles' && pathParts[1]) {
      return RoleController.update(pathParts[1], request);
    }
    if (pathParts[0] === 'permissions' && pathParts[1]) {
      return PermissionController.update(pathParts[1], request);
    }
    if (path.startsWith('update_enquirystatus/') || (pathParts[0] === 'enquiries' && pathParts[1])) {
      const id = pathParts[1];
      return enquiryCtrl.updateEnquiryStatus(id, body.status);
    }
    if (path.startsWith('update_service/')) {
      const id = pathParts[1];
      return crudCtrl.updateService(id, request);
    }
    if (path.startsWith('update_blog/')) {
      const id = pathParts[1];
      return crudCtrl.updateBlog(id, request);
    }
    if (path.startsWith('update_faq/') || (pathParts[0] === 'faqs' && pathParts[1])) {
      const id = pathParts[1];
      return crudCtrl.genericUpdate('faqs', id, body);
    }
    if (path.startsWith('update_hero/') || (pathParts[0] === 'hero-videos' && pathParts[1])) {
      const id = pathParts[1];
      return crudCtrl.genericUpdate('home_heros', id, body);
    }
    if (path.startsWith('update_career/') || (pathParts[0] === 'career' && pathParts[1])) {
      const id = pathParts[1];
      return crudCtrl.genericUpdate('careers', id, body);
    }
    if (path.startsWith('update_technology/') || (pathParts[0] === 'technologies' && pathParts[1])) {
      const id = pathParts[1];
      return crudCtrl.genericUpdate('technology', id, body);
    }
    if ((pathParts[0] === 'contact-details' || pathParts[0] === 'contact_details') && pathParts[1]) {
      const id = pathParts[1];
      return crudCtrl.genericUpdate('contact_details', id, body);
    }

    if ((pathParts[0] === 'city' || pathParts[0] === 'cities') && pathParts[1]) {
      const id = pathParts[1];
      return cityCtrl.updateCity(id, body);
    }

    const tableAliasMap = {
      'contact-details': 'contact_details',
      contact_details: 'contact_details',
      city: 'cities',
      cities: 'cities',
      'why-choose-us': 'why_choose_us',
      why_choose_us: 'why_choose_us',
      'how-we-work': 'how_we_works',
      'how-we-works': 'how_we_works',
      how_we_works: 'how_we_works',
      'pricing-sections': 'pricing_sections',
      pricing_sections: 'pricing_sections',
      'city-services': 'city_services',
      city_services: 'city_services',
      'strategic-approach': 'strategic_approaches',
      'strategic-approaches': 'strategic_approaches',
      strategic_approaches: 'strategic_approaches',
      'city-projects': 'city_projects',
      city_projects: 'city_projects',
      'city-faqs': 'city_faqs',
      city_faqs: 'city_faqs',
      'city-testimonials': 'city_testimonials',
      city_testimonials: 'city_testimonials',
      approach: 'approaches',
      approaches: 'approaches',
    };

    if (pathParts.length === 2) {
      const id = pathParts[1];
      const table = tableAliasMap[pathParts[0]] || pathParts[0].replace(/-/g, '_');
      return crudCtrl.genericUpdate(table, id, body);
    }

    return errorResponse(`Route not found: PUT /api/${path}`, 404);
  } catch (err) {
    console.error('API PUT error:', err);
    return errorResponse(err.message, 500);
  }
}

export async function handleDelete(request, pathParts = []) {
  try {
    const path = pathParts.join('/').toLowerCase();

    if (pathParts[0] === 'users' && pathParts[1]) {
      return UserController.destroy(pathParts[1]);
    }
    if (pathParts[0] === 'roles' && pathParts[1] && pathParts[2] === 'permissions' && pathParts[3]) {
      return RevokePermissionController.revoke(pathParts[1], pathParts[3]);
    }
    if (pathParts[0] === 'roles' && pathParts[1]) {
      return RoleController.destroy(pathParts[1]);
    }
    if (pathParts[0] === 'permissions' && pathParts[1]) {
      return PermissionController.destroy(pathParts[1]);
    }
    if (path.startsWith('delete_enquiry/') || (pathParts[0] === 'enquiries' && pathParts[1])) {
      const id = pathParts[1];
      return enquiryCtrl.deleteEnquiry(id);
    }
    if (path.startsWith('delete_service/')) {
      const id = pathParts[1];
      return crudCtrl.deleteService(id);
    }
    if (path.startsWith('delete_subservice/')) {
      const id = pathParts[1];
      return crudCtrl.deleteSubservice(id);
    }
    if (path.startsWith('delete_blog/')) {
      const id = pathParts[1];
      return crudCtrl.deleteBlog(id);
    }
    if (path.startsWith('delete_career/')) {
      const id = pathParts[1];
      return crudCtrl.genericDelete('careers', id);
    }
    if (path.startsWith('delete_technology/')) {
      const id = pathParts[1];
      return crudCtrl.genericDelete('technology', id);
    }
    if (path.startsWith('delete_creatives/')) {
      const id = pathParts[1];
      return crudCtrl.genericDelete('creatives', id);
    }
    if (path.startsWith('delete_faq/')) {
      const id = pathParts[1];
      return crudCtrl.genericDelete('faqs', id);
    }
    if (path.startsWith('delete_hero/')) {
      const id = pathParts[1];
      return crudCtrl.genericDelete('home_heros', id);
    }
    if (path.startsWith('delete_seo/')) {
      const id = pathParts[1];
      return crudCtrl.genericDelete('seo_highlights', id);
    }
    if (path.startsWith('delete_package/')) {
      const id = pathParts[1];
      return crudCtrl.genericDelete('packages', id);
    }
    if (path.startsWith('delete_packagefeature/')) {
      const id = pathParts[1];
      return crudCtrl.genericDelete('package_features', id);
    }
    if ((pathParts[0] === 'contact-details' || pathParts[0] === 'contact_details' || path.startsWith('delete_contact/')) && (pathParts[1] || pathParts[0].split('/')[1])) {
      const id = pathParts[1] || pathParts[0].split('/')[1];
      return crudCtrl.genericDelete('contact_details', id);
    }

    const tableAliasMap = {
      'contact-details': 'contact_details',
      contact_details: 'contact_details',
      city: 'cities',
      cities: 'cities',
      'why-choose-us': 'why_choose_us',
      why_choose_us: 'why_choose_us',
      'how-we-work': 'how_we_works',
      'how-we-works': 'how_we_works',
      how_we_works: 'how_we_works',
      'pricing-sections': 'pricing_sections',
      pricing_sections: 'pricing_sections',
      'city-services': 'city_services',
      city_services: 'city_services',
      'strategic-approach': 'strategic_approaches',
      'strategic-approaches': 'strategic_approaches',
      strategic_approaches: 'strategic_approaches',
      'city-projects': 'city_projects',
      city_projects: 'city_projects',
      'city-faqs': 'city_faqs',
      city_faqs: 'city_faqs',
      'city-testimonials': 'city_testimonials',
      city_testimonials: 'city_testimonials',
      approach: 'approaches',
      approaches: 'approaches',
    };

    if (pathParts.length === 2 && pathParts[0].startsWith('delete_')) {
      const prefix = pathParts[0].replace('delete_', '');
      const id = pathParts[1];
      const table = tableAliasMap[prefix] || prefix;
      return crudCtrl.genericDelete(table, id);
    }
    if (pathParts.length === 2) {
      const table = tableAliasMap[pathParts[0]] || pathParts[0].replace(/-/g, '_');
      return crudCtrl.genericDelete(table, pathParts[1]);
    }

    return errorResponse(`Route not found: DELETE /api/${path}`, 404);
  } catch (err) {
    console.error('API DELETE error:', err);
    return errorResponse(err.message, 500);
  }
}

// Master dispatch function
export async function dispatchRoute(request, pathParts = []) {
  const method = request.method.toUpperCase();
  switch (method) {
    case 'OPTIONS':
      return handleOptions();
    case 'GET':
      return handleGet(request, pathParts);
    case 'POST':
      return handlePost(request, pathParts);
    case 'PUT':
    case 'PATCH':
      return handlePut(request, pathParts);
    case 'DELETE':
      return handleDelete(request, pathParts);
    default:
      return errorResponse(`Method ${method} not allowed`, 405);
  }
}

