import fs from 'fs';
import path from 'path';

const files = [
  'src/components/About/AboutVisionMission.jsx',
  'src/components/About/Ourteam.jsx',
  'src/components/AutoPopup.jsx',
  'src/components/Blog/BlogCards.jsx',
  'src/components/Blog/BlogDetail.jsx',
  'src/components/BrandPerformance/MediaBuying.jsx',
  'src/components/BrandPerformance/PPC.jsx',
  'src/components/BrandPerformance/PPcSection.jsx',
  'src/components/BrandPerformance/WhyPaidCampaigns.jsx',
  'src/components/carrer/Career.jsx',
  'src/components/carrer/CarrerDetail.jsx',
  'src/components/carrer/OpenPositionsSection.jsx',
  'src/components/ContactPopup.jsx',
  'src/components/Design/LogoDesignSection .jsx',
  'src/components/DigitalMarketing/DigialMarketing.jsx',
  'src/components/FAQSec.jsx',
  'src/components/Home/ContactUS.jsx',
  'src/components/Home/Hero.jsx',
  'src/components/Home/ThreeDMarqueeDemoSecond.jsx',
  'src/components/Home/Timeline.jsx',
  'src/components/Home/VIsion&Mission.jsx',
  'src/components/mobile/TechServicesSection .jsx',
  'src/components/packages/PackagesPage.jsx',
  'src/components/portfolio/PortfolioShowcase.jsx',
  'src/components/portfolio/PortfolioWebsite.jsx',
  'src/components/portfolio/ReelsSection.jsx',
  'src/components/portfolio/SocialMediaShowcase.jsx',
  'src/components/SEO/AuditForm.jsx',
  'src/components/SEO/BacklinkBuilding.jsx',
  'src/components/SEO/Cro.jsx',
  'src/components/SEO/EcomSeo.jsx',
  'src/components/SEO/SeoService.jsx',
  'src/components/SEO/WhySeoUs.jsx',
  'src/components/SocialMarketing/FacebookMarketingSection .jsx',
  'src/components/SocialMarketing/SocialMediaMarketingSection.jsx',
  'src/components/SocialMarketing/YouTubeProcessSection.jsx',
  'src/components/SocialMarketing/Ytsection.jsx',
  'src/components/Technology/EcommerceTimeline .jsx',
  'src/components/Technology/HowThisDone.jsx',
  'src/components/Technology/MaintenanceSupport .jsx',
  'src/components/Technology/TechServicesSection .jsx',
  'src/components/Technology/WebsiteConsultationSection.jsx',
  'src/components/Technology/WebsiteDesignCornerstones.jsx',
  'src/components/Technology/WebsitePortfolioCaseStudies.jsx',
  'src/components/TechWeUse.jsx',
];

let updatedCount = 0;

for (const relPath of files) {
  const fullPath = path.join(process.cwd(), relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf-8');
    const original = content;

    // 1. Replace API URLs
    content = content.replace(/https:\/\/dashboard\.digitalnawab\.com\/api\//g, '/api/');
    content = content.replace(/https:\/\/dashboard\.digitalnawab\.com\/api/g, '/api');

    if (content !== original) {
      fs.writeFileSync(fullPath, content, 'utf-8');
      updatedCount++;
      console.log(`Updated API URLs in: ${relPath}`);
    }
  }
}

console.log(`Successfully migrated ${updatedCount} frontend components to internal /api!`);
