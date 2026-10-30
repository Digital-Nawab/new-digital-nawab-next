import * as apiMethods from './apiController.js';

export class ApiController {
  static getLogo = apiMethods.getLogo;
  static get_service = apiMethods.getService;
  static getblog = apiMethods.getBlog;
  static getblogbyid = (req) => {
    const url = typeof req === 'string' ? req : new URL(req.url).searchParams.get('url');
    return apiMethods.getBlogDetail(url);
  };
  static getcareer = apiMethods.getCareer;
  static getcontactdetail = apiMethods.getContactDetail;
  static getcreatives = apiMethods.getCreatives;
  static getourteam = apiMethods.getOurTeam;
  static getpackage = apiMethods.getPackage;
  static getfaq = apiMethods.getFaq;
  static gethero = apiMethods.getHero;
  static getproject = apiMethods.getProject;
  static gettag = apiMethods.getTag;
  static gettechnlogies = apiMethods.getTechnologies;
  static getvision_mission = apiMethods.getVisionMission;
  static gethomeabout = apiMethods.getHomeAbout;
  static getsubservice = apiMethods.getSubservice;
  static careerdetail = apiMethods.getCareerDetail;
  static getblogdetail = (req) => {
    const url = typeof req === 'string' ? req : new URL(req.url).searchParams.get('url');
    return apiMethods.getBlogDetail(url);
  };
  static seohighlight = apiMethods.getSeoHighlight;
  static seoform = apiMethods.getSeoForm;
  static seoservice = apiMethods.getSeoService;
  static seoprocess = apiMethods.getSeoProcess;
  static seo_optimization = apiMethods.getSeoOptimization;
  static seo_strategy = apiMethods.getSeoStrategy;
  static seo_digital = apiMethods.getSeoDigital;
  static index_project = apiMethods.getIndexProjects;
  static dev_cornerstone = apiMethods.getDevCornerstone;
  static dev_step = apiMethods.getDevStep;
  static dev_commerce = apiMethods.getDevCommerce;
  static dev_maintain = apiMethods.getDevMaintain;
  static dev_innovation = apiMethods.getDevInnovation;
  static smm_benefit = apiMethods.getSmmBenefit;
  static smm_facebook = apiMethods.getSmmFacebook;
  static smm_youtube = apiMethods.getSmmYoutube;
  static smm_services = apiMethods.getSmmServices;
  static google_campaigns = apiMethods.getGoogleCampaigns;
  static google_media = apiMethods.getGoogleMedia;
  static google_ppc = apiMethods.getGooglePpc;
  static package = apiMethods.getPackage;
}

export default ApiController;

