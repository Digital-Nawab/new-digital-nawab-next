import { query } from '../database/db.js';
import { jsonResponse, errorResponse, formatRow, formatRows } from '../utils/api-helpers.js';

export async function getLogo() {
  const logos = await query('SELECT * FROM graphic_logo ORDER BY created_at DESC');
  return jsonResponse({
    msg: 'Get data successfully',
    data: formatRows(logos),
  });
}

export async function getService() {
  const services = await query('SELECT * FROM services WHERE is_deleted = 0 OR is_deleted IS NULL ORDER BY id ASC');
  const subservices = await query('SELECT * FROM subservices WHERE is_deleted = 0 OR is_deleted IS NULL ORDER BY id ASC');

  const result = services.map((service) => ({
    id: service.id,
    name: service.name,
    description: service.description,
    image: service.image,
    subservices: subservices
      .filter((sub) => sub.service_id === service.id)
      .map((sub) => ({
        id: sub.id,
        name: sub.name,
        description: sub.description,
        image: sub.image,
      })),
  }));

  return jsonResponse(result);
}

export async function getSubservice() {
  const subservices = await query('SELECT * FROM subservices WHERE is_deleted = 0 OR is_deleted IS NULL ORDER BY id ASC');
  return jsonResponse({
    data: formatRows(subservices),
    msg: 'Getting data successfully',
  });
}

export async function getSubserviceByServiceId(serviceId) {
  const subservices = await query(
    'SELECT * FROM subservices WHERE service_id = ? AND (is_deleted = 0 OR is_deleted IS NULL) ORDER BY id ASC',
    [serviceId]
  );
  return jsonResponse({
    data: formatRows(subservices),
    msg: 'Getting data successfully',
  });
}

export async function getBlog() {
  const blogs = await query('SELECT * FROM blogs ORDER BY created_at DESC');
  return jsonResponse(formatRows(blogs));
}

export async function getBlogDetail(url) {
  if (!url) {
    return errorResponse('URL parameter is required', 400);
  }
  const blogs = await query('SELECT * FROM blogs WHERE url = ? LIMIT 1', [url]);
  return jsonResponse({
    data: blogs.length ? formatRow(blogs[0]) : null,
    msg: 'Getting data successfully',
  });
}

export async function getCareer() {
  const careers = await query('SELECT * FROM careers ORDER BY id DESC');
  return jsonResponse({
    data: formatRows(careers),
    msg: 'Data get successfully',
  });
}

export async function getCareerDetail(id) {
  const careers = await query('SELECT * FROM careers WHERE id = ? LIMIT 1', [id]);
  return jsonResponse({
    data: careers.length ? formatRow(careers[0]) : null,
    msg: 'Getting data successfully',
  });
}

export async function getContactDetail() {
  const details = await query('SELECT * FROM contact_details');
  return jsonResponse({
    data: formatRows(details),
    msg: 'Getting data successfully',
  });
}

export async function getCreatives() {
  const creatives = await query('SELECT * FROM creatives ORDER BY id DESC');
  return jsonResponse({
    data: formatRows(creatives),
    msg: 'getting data successfully',
  });
}

export async function getOurTeam() {
  const team = await query('SELECT * FROM our_team ORDER BY id ASC');
  return jsonResponse({
    data: formatRows(team),
    msg: 'getting data successfully',
  });
}

export async function getPackage(identifier = null) {
  if (identifier) {
    const packages = await query('SELECT * FROM packages WHERE package_for = ?', [identifier]);
    if (!packages.length) {
      return errorResponse('No package found.', 404);
    }
    const features = await query('SELECT * FROM package_features');
    const result = packages.map((p) => ({
      ...formatRow(p),
      features: formatRows(features.filter((f) => f.package_id === p.id)),
    }));
    return jsonResponse({
      message: 'Packages fetched successfully',
      data: result,
    });
  }

  const packages = await query('SELECT * FROM packages ORDER BY id ASC');
  return jsonResponse({
    data: formatRows(packages),
    msg: 'getting  data successfully',
  });
}

export async function getPackageFeatures() {
  const features = await query('SELECT * FROM package_features ORDER BY id ASC');
  return jsonResponse({
    data: formatRows(features),
    msg: 'getting features successfully',
  });
}

export async function getFaq() {
  const faqs = await query('SELECT * FROM faqs ORDER BY id ASC');
  return jsonResponse({
    data: formatRows(faqs),
    msg: 'getting data successfully',
  });
}

export async function getHero() {
  const heroes = await query('SELECT * FROM home_heros ORDER BY id ASC');
  return jsonResponse({
    data: formatRows(heroes),
    msg: 'getting data successfully',
  });
}

export async function getProject() {
  const projects = await query('SELECT * FROM projects ORDER BY id DESC');
  return jsonResponse({
    data: formatRows(projects),
    msg: 'getting  data successfully',
  });
}

export async function getIndexProjects() {
  const creatives = await query("SELECT * FROM projects WHERE type = 'creatives'");
  const reels = await query("SELECT * FROM projects WHERE type = 'reel'");
  const websites = await query("SELECT * FROM projects WHERE type = 'website'");

  return jsonResponse({
    message: 'Getting data successfully',
    creatives: formatRows(creatives),
    reels: formatRows(reels),
    websites: formatRows(websites),
  });
}

export async function getTag() {
  const tags = await query('SELECT * FROM tags');
  return jsonResponse({
    data: formatRows(tags),
    msg: 'getting data successfully',
  });
}

export async function getTechnologies() {
  const technologies = await query('SELECT * FROM technology ORDER BY id ASC');
  return jsonResponse({
    data: formatRows(technologies),
    msg: 'Getting data successfully',
  });
}

export async function getVisionMission() {
  const visions = await query('SELECT * FROM vision_mission');
  return jsonResponse({
    data: formatRows(visions),
    msg: 'Getting data successfully',
  });
}

export async function getHomeAbout() {
  const homeAbouts = await query('SELECT * FROM home_abouts');
  return jsonResponse({
    data: formatRows(homeAbouts),
    msg: 'Getting data successfully',
  });
}

// SEO Modules
export async function getSeoHighlight() {
  const seo = await query('SELECT * FROM seo_highlights ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data successfully.',
    data: formatRows(seo),
  });
}

export async function getSeoForm() {
  const forms = await query('SELECT * FROM seo_forms ORDER BY id DESC');
  return jsonResponse({
    message: 'Getting data successfully.',
    data: formatRows(forms),
  });
}

export async function getSeoService() {
  const services = await query('SELECT * FROM seo_services ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data successfully.',
    data: formatRows(services),
  });
}

export async function getSeoProcess() {
  const processes = await query('SELECT * FROM seo_processes ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data successfully.',
    data: formatRows(processes),
  });
}

export async function getSeoOptimization() {
  const optimizations = await query('SELECT * FROM seo_optimizations ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data successfully.',
    data: formatRows(optimizations),
  });
}

export async function getSeoStrategy() {
  const strategies = await query('SELECT * FROM seo_strategies ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data successfully.',
    data: formatRows(strategies),
  });
}

export async function getSeoDigital() {
  const digitals = await query('SELECT * FROM seo_digital ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data successfully.',
    data: formatRows(digitals),
  });
}

// Development Modules
export async function getDevCornerstone() {
  const dev = await query('SELECT * FROM dev_cornerstones ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(dev),
  });
}

export async function getDevStep() {
  const steps = await query('SELECT * FROM dev_steps ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(steps),
  });
}

export async function getDevCommerce() {
  const commerce = await query('SELECT * FROM dev_commerces ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(commerce),
  });
}

export async function getDevMaintain() {
  const maintain = await query('SELECT * FROM dev_maintains ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(maintain),
  });
}

export async function getDevInnovation() {
  const innovation = await query('SELECT * FROM dev_innovations ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(innovation),
  });
}

// SMM Modules
export async function getSmmBenefit() {
  const benefits = await query('SELECT * FROM sm_benefits ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(benefits),
  });
}

export async function getSmmFacebook() {
  const fb = await query('SELECT * FROM sm_facebook ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(fb),
  });
}

export async function getSmmYoutube() {
  const yt = await query('SELECT * FROM sm_youtube ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(yt),
  });
}

export async function getSmmServices() {
  const services = await query('SELECT * FROM social_our_service ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(services),
  });
}

// Google Modules
export async function getGoogleCampaigns() {
  const campaigns = await query('SELECT * FROM google_compaigns ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(campaigns),
  });
}

export async function getGoogleMedia() {
  const media = await query('SELECT * FROM google_media ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(media),
  });
}

export async function getGooglePpc() {
  const ppc = await query('SELECT * FROM google_ppc ORDER BY id ASC');
  return jsonResponse({
    message: 'Getting data sucessfully',
    data: formatRows(ppc),
  });
}
