import fs from 'fs';
import path from 'path';

const pages = [
  {
    dir: 'subservices',
    title: 'Sub Services',
    endpoint: '/api/admin/subservices',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { name: 'name', label: 'Sub-Service Name', required: true },
      { name: 'service_id', label: 'Service ID (Numeric)', type: 'number', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Icon/Image', type: 'image' },
    ],
  },
  {
    dir: 'career',
    title: 'Career Positions',
    endpoint: '/api/admin/careers',
    columns: [
      { key: 'title', label: 'Job Title' },
      { key: 'desig', label: 'Designation' },
      { key: 'city', label: 'Location' },
      { key: 'job_type', label: 'Type' },
    ],
    fields: [
      { name: 'title', label: 'Job Title', required: true },
      { name: 'desig', label: 'Designation' },
      { name: 'city', label: 'City' },
      { name: 'job_type', label: 'Job Type (e.g. Full-time)' },
      { name: 'work_mode', label: 'Work Mode (e.g. On-site, Remote)' },
      { name: 'about_role', label: 'About Role', type: 'textarea' },
      { name: 'responsibilities', label: 'Responsibilities', type: 'textarea' },
      { name: 'requirements', label: 'Requirements', type: 'textarea' },
    ],
  },
  {
    dir: 'career-applications',
    title: 'Job Applications',
    endpoint: '/api/admin/career-applications',
    columns: [
      { key: 'name', label: 'Candidate Name' },
      { key: 'email', label: 'Email' },
      { key: 'contact_number', label: 'Phone' },
      { key: 'year_of_experience', label: 'Experience' },
      { key: 'status', label: 'Status', type: 'badge' },
    ],
    fields: [
      { name: 'name', label: 'Candidate Name', required: true },
      { name: 'email', label: 'Email' },
      { name: 'contact_number', label: 'Phone' },
      { name: 'status', label: 'Status' },
      { name: 'skills', label: 'Skills' },
      { name: 'message', label: 'Message', type: 'textarea' },
    ],
  },
  {
    dir: 'our-team',
    title: 'Our Team Members',
    endpoint: '/api/admin/our-team',
    columns: [
      { key: 'name', label: 'Member Name' },
      { key: 'designation', label: 'Designation' },
      { key: 'img', label: 'Photo', type: 'image' },
    ],
    fields: [
      { name: 'name', label: 'Full Name', required: true },
      { name: 'designation', label: 'Designation' },
      { name: 'img', label: 'Profile Photo', type: 'image' },
    ],
  },
  {
    dir: 'packages',
    title: 'Service Packages',
    endpoint: '/api/admin/packages',
    columns: [
      { key: 'package_name', label: 'Package Name' },
      { key: 'package_for', label: 'Category' },
      { key: 'price', label: 'Price' },
    ],
    fields: [
      { name: 'package_name', label: 'Package Name', required: true },
      { name: 'package_for', label: 'Package Category (e.g. SEO, SMM)' },
      { name: 'price', label: 'Price' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'label', label: 'Badge Label' },
    ],
  },
  {
    dir: 'package-features',
    title: 'Package Features',
    endpoint: '/api/admin/package-features',
    columns: [
      { key: 'feature_key', label: 'Feature Name' },
      { key: 'feature_value', label: 'Feature Value' },
      { key: 'package_id', label: 'Package ID' },
    ],
    fields: [
      { name: 'package_id', label: 'Package ID', type: 'number', required: true },
      { name: 'feature_key', label: 'Feature Key/Name', required: true },
      { name: 'feature_value', label: 'Feature Value' },
    ],
  },
  {
    dir: 'projects',
    title: 'Portfolio Projects',
    endpoint: '/api/admin/projects',
    columns: [
      { key: 'title', label: 'Project Title' },
      { key: 'type', label: 'Type' },
      { key: 'image', label: 'Thumbnail', type: 'image' },
      { key: 'duration', label: 'Duration' },
    ],
    fields: [
      { name: 'title', label: 'Project Title', required: true },
      { name: 'type', label: 'Type (creatives, reel, website)', required: true },
      { name: 'url', label: 'Live Link' },
      { name: 'tech_used', label: 'Technologies Used' },
      { name: 'duration', label: 'Duration' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    dir: 'tags',
    title: 'Meta Tags & SEO Header',
    endpoint: '/api/admin/tags',
    columns: [
      { key: 'title', label: 'Meta Title' },
      { key: 'page_url', label: 'Page Route' },
      { key: 'keyword', label: 'Keywords' },
    ],
    fields: [
      { name: 'page_url', label: 'Page URL Route', required: true },
      { name: 'title', label: 'Meta Title', required: true },
      { name: 'keyword', label: 'Meta Keywords' },
      { name: 'description', label: 'Meta Description', type: 'textarea' },
      { name: 'image', label: 'OG Image', type: 'image' },
    ],
  },
  {
    dir: 'contact-details',
    title: 'Contact Details',
    endpoint: '/api/admin/contact-details',
    columns: [
      { key: 'email', label: 'Email' },
      { key: 'phone_no', label: 'Phone' },
      { key: 'whatsapp_no', label: 'WhatsApp' },
      { key: 'location', label: 'Address' },
    ],
    fields: [
      { name: 'email', label: 'Contact Email' },
      { name: 'phone_no', label: 'Phone Number' },
      { name: 'whatsapp_no', label: 'WhatsApp Number' },
      { name: 'location', label: 'Address / Location', type: 'textarea' },
    ],
  },
  {
    dir: 'hero-videos',
    title: 'Hero Videos & Banner',
    endpoint: '/api/admin/hero',
    columns: [
      { key: 'video_type', label: 'Video Type' },
      { key: 'video', label: 'Video Source' },
    ],
    fields: [
      { name: 'video_type', label: 'Type (e.g. mp4, youtube)' },
      { name: 'video', label: 'Video File or URL', type: 'file' },
    ],
  },
  {
    dir: 'home-about',
    title: 'Homepage About Section',
    endpoint: '/api/admin/home-about',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'sub_heading', label: 'Subheading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'tag', label: 'Tag' },
      { name: 'heading', label: 'Heading', required: true },
      { name: 'sub_heading', label: 'Subheading' },
      { name: 'content', label: 'Content', type: 'textarea' },
      { name: 'button_text', label: 'Button Text' },
      { name: 'button_url', label: 'Button Link' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    dir: 'technologies',
    title: 'Tools & Technologies',
    endpoint: '/api/admin/technologies',
    columns: [
      { key: 'heading', label: 'Technology Name' },
      { key: 'img', label: 'Icon', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Technology Name', required: true },
      { name: 'img', label: 'Logo / Icon', type: 'image' },
    ],
  },
  {
    dir: 'faqs',
    title: 'Frequently Asked Questions',
    endpoint: '/api/admin/faqs',
    columns: [
      { key: 'question', label: 'Question' },
      { key: 'answer', label: 'Answer' },
    ],
    fields: [
      { name: 'question', label: 'Question', required: true },
      { name: 'answer', label: 'Answer', type: 'textarea', required: true },
    ],
  },
  {
    dir: 'vision-mission',
    title: 'Vision & Mission',
    endpoint: '/api/admin/vision-mission',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'vision_heading', label: 'Vision Title' },
      { key: 'mission_heading', label: 'Mission Title' },
    ],
    fields: [
      { name: 'heading', label: 'Overview Heading' },
      { name: 'para', label: 'Paragraph', type: 'textarea' },
      { name: 'vision_heading', label: 'Vision Heading' },
      { name: 'vision_description', label: 'Vision Description', type: 'textarea' },
      { name: 'mission_heading', label: 'Mission Heading' },
      { name: 'mission_description', label: 'Mission Description', type: 'textarea' },
    ],
  },
  {
    dir: 'creatives',
    title: 'Our Creatives',
    endpoint: '/api/admin/creatives',
    columns: [
      { key: 'image', label: 'Creative Image', type: 'image' },
    ],
    fields: [
      { name: 'image', label: 'Image File', type: 'image', required: true },
    ],
  },
  {
    dir: 'graphics-logo',
    title: 'Graphics Logos',
    endpoint: '/api/admin/graphics-logo',
    columns: [
      { key: 'image', label: 'Logo Image', type: 'image' },
    ],
    fields: [
      { name: 'image', label: 'Image File', type: 'image', required: true },
    ],
  },
  // City Sub-Modules
  {
    dir: 'approaches',
    title: 'City Approach Sections',
    endpoint: '/api/admin/approaches',
    columns: [
      { key: 'city_id', label: 'City ID' },
      { key: 'heading', label: 'Heading' },
    ],
    fields: [
      { name: 'city_id', label: 'City ID', type: 'number', required: true },
      { name: 'heading', label: 'Section Heading' },
    ],
  },
  {
    dir: 'strategic-approaches',
    title: 'City Strategic Approaches',
    endpoint: '/api/admin/strategic-approaches',
    columns: [
      { key: 'city_id', label: 'City ID' },
      { key: 'badge_text', label: 'Badge' },
      { key: 'heading', label: 'Heading' },
    ],
    fields: [
      { name: 'city_id', label: 'City ID', type: 'number', required: true },
      { name: 'badge_text', label: 'Badge' },
      { name: 'heading', label: 'Heading' },
      { name: 'subheading', label: 'Subheading', type: 'textarea' },
    ],
  },
  {
    dir: 'city-services',
    title: 'City Services Mapping',
    endpoint: '/api/admin/city-services',
    columns: [
      { key: 'city_id', label: 'City ID' },
      { key: 'heading', label: 'Heading' },
    ],
    fields: [
      { name: 'city_id', label: 'City ID', type: 'number', required: true },
      { name: 'heading', label: 'Heading' },
      { name: 'subheading', label: 'Subheading', type: 'textarea' },
    ],
  },
  {
    dir: 'how-we-works',
    title: 'City How We Work',
    endpoint: '/api/admin/how-we-works',
    columns: [
      { key: 'city_id', label: 'City ID' },
      { key: 'heading', label: 'Heading' },
    ],
    fields: [
      { name: 'city_id', label: 'City ID', type: 'number', required: true },
      { name: 'heading', label: 'Heading' },
      { name: 'subheading', label: 'Subheading', type: 'textarea' },
    ],
  },
  {
    dir: 'city-projects',
    title: 'City Projects Showcase',
    endpoint: '/api/admin/city-projects',
    columns: [
      { key: 'heading', label: 'Project Heading' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'tag', label: 'Tag' },
    ],
    fields: [
      { name: 'city_id', label: 'City ID', type: 'number', required: true },
      { name: 'heading', label: 'Heading', required: true },
      { name: 'sub_heading', label: 'Subheading' },
      { name: 'tag', label: 'Tag' },
      { name: 'button_text', label: 'Button Text' },
      { name: 'button_url', label: 'Button Link' },
      { name: 'image', label: 'Project Image', type: 'image' },
    ],
  },
  {
    dir: 'why-choose-us',
    title: 'City Why Choose Us',
    endpoint: '/api/admin/why-choose-us',
    columns: [
      { key: 'city_id', label: 'City ID' },
      { key: 'heading', label: 'Heading' },
    ],
    fields: [
      { name: 'city_id', label: 'City ID', type: 'number', required: true },
      { name: 'heading', label: 'Section Heading' },
    ],
  },
  {
    dir: 'city-faqs',
    title: 'City FAQs',
    endpoint: '/api/admin/city-faqs',
    columns: [
      { key: 'city_id', label: 'City ID' },
      { key: 'heading', label: 'Heading' },
    ],
    fields: [
      { name: 'city_id', label: 'City ID', type: 'number', required: true },
      { name: 'heading', label: 'Section Heading' },
    ],
  },
  {
    dir: 'city-testimonials',
    title: 'City Testimonials',
    endpoint: '/api/admin/city-testimonials',
    columns: [
      { key: 'name', label: 'Client Name' },
      { key: 'designation', label: 'Designation' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'quote', label: 'Quote' },
    ],
    fields: [
      { name: 'city_id', label: 'City ID', type: 'number', required: true },
      { name: 'name', label: 'Name', required: true },
      { name: 'designation', label: 'Designation' },
      { name: 'quote', label: 'Quote', type: 'textarea' },
      { name: 'image', label: 'Client Avatar', type: 'image' },
    ],
  },
  // SEO Modules
  {
    dir: 'seo-services',
    title: 'SEO Services',
    endpoint: '/api/admin/seo-services',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'subheading', label: 'Subheading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'subheading', label: 'Subheading' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    dir: 'seo-highlights',
    title: 'SEO Highlights',
    endpoint: '/api/admin/seo-highlights',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    dir: 'seo-forms',
    title: 'SEO Leads & Submissions',
    endpoint: '/api/admin/seo-forms',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'website_url', label: 'Website' },
      { key: 'current_traffic', label: 'Traffic' },
    ],
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'email', label: 'Email' },
      { name: 'website_url', label: 'Website URL' },
      { name: 'current_traffic', label: 'Current Traffic' },
      { name: 'message', label: 'Message', type: 'textarea' },
    ],
  },
  {
    dir: 'seo-processes',
    title: 'SEO Process Steps',
    endpoint: '/api/admin/seo-processes',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { name: 'heading', label: 'Step Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    dir: 'seo-digital',
    title: 'SEO Digital Solutions',
    endpoint: '/api/admin/seo-digital',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    dir: 'seo-optimization',
    title: 'SEO Optimization Points',
    endpoint: '/api/admin/seo-optimization',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    dir: 'seo-strategy',
    title: 'SEO Strategies',
    endpoint: '/api/admin/seo-strategy',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Strategy Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  // Dev Modules
  {
    dir: 'dev-commerce',
    title: 'Development Commerce',
    endpoint: '/api/admin/dev-commerce',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'tag', label: 'Tag' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'tag', label: 'Tag' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'label', label: 'Label' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    dir: 'dev-cornerstone',
    title: 'Development Cornerstones',
    endpoint: '/api/admin/dev-cornerstone',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    dir: 'dev-innovation',
    title: 'Development Innovations',
    endpoint: '/api/admin/dev-innovation',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'sub_heading', label: 'Subheading' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'sub_heading', label: 'Subheading' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    dir: 'dev-maintain',
    title: 'Development Maintenance',
    endpoint: '/api/admin/dev-maintain',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'priority', label: 'Priority' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'priority', label: 'Priority' },
      { name: 'availability', label: 'Availability' },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    dir: 'dev-step',
    title: 'Development Steps',
    endpoint: '/api/admin/dev-step',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { name: 'heading', label: 'Step Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  // Google Modules
  {
    dir: 'google-campaigns',
    title: 'Google Campaigns',
    endpoint: '/api/admin/google-campaigns',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Campaign Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    dir: 'google-media',
    title: 'Google Media',
    endpoint: '/api/admin/google-media',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    dir: 'google-ppc',
    title: 'Google PPC Ads',
    endpoint: '/api/admin/google-ppc',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'PPC Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  // SMM Modules
  {
    dir: 'smm-facebook',
    title: 'Facebook Marketing',
    endpoint: '/api/admin/smm-facebook',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'description', label: 'Description' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
    ],
  },
  {
    dir: 'smm-benefit',
    title: 'Social Media Benefits',
    endpoint: '/api/admin/smm-benefit',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    dir: 'smm-youtube',
    title: 'Youtube Marketing',
    endpoint: '/api/admin/smm-youtube',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  {
    dir: 'social-service',
    title: 'SMM Services',
    endpoint: '/api/admin/social-service',
    columns: [
      { key: 'heading', label: 'Heading' },
      { key: 'image', label: 'Image', type: 'image' },
    ],
    fields: [
      { name: 'heading', label: 'Service Heading', required: true },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'image', label: 'Image', type: 'image' },
    ],
  },
  // Users & Access
  {
    dir: 'users',
    title: 'User Accounts',
    endpoint: '/api/admin/users',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
    ],
    fields: [
      { name: 'name', label: 'Full Name', required: true },
      { name: 'email', label: 'Email Address', required: true },
      { name: 'password', label: 'Password (leave blank to keep current)', type: 'password' },
    ],
  },
  {
    dir: 'roles',
    title: 'Security Roles',
    endpoint: '/api/admin/roles',
    columns: [
      { key: 'name', label: 'Role Name' },
    ],
    fields: [
      { name: 'name', label: 'Role Name', required: true },
    ],
  },
  {
    dir: 'permissions',
    title: 'System Permissions',
    endpoint: '/api/admin/permissions',
    columns: [
      { key: 'name', label: 'Permission Name' },
    ],
    fields: [
      { name: 'name', label: 'Permission Name', required: true },
    ],
  },
];

const adminDir = path.join(process.cwd(), 'src', 'app', 'admin');

for (const p of pages) {
  const targetDir = path.join(adminDir, p.dir);
  fs.mkdirSync(targetDir, { recursive: true });

  const pageContent = `'use client';

import GenericAdminManager from '@/components/admin/GenericAdminManager';

export default function Admin${p.dir.replace(/[^a-zA-Z0-9]/g, '')}Page() {
  return (
    <GenericAdminManager
      title="${p.title}"
      apiEndpoint="${p.endpoint}"
      columns={${JSON.stringify(p.columns)}}
      fields={${JSON.stringify(p.fields)}}
    />
  );
}
`;

  fs.writeFileSync(path.join(targetDir, 'page.jsx'), pageContent, 'utf-8');
  console.log(`Created admin page: /admin/${p.dir}`);
}

console.log('All admin pages created successfully!');
