


export type SitemapCategory =
  | 'Live in Canada'
  | 'Life in Canada'
  | 'News & Blog'
  | 'Calculators'
  | 'About Us';

export interface SitemapItem {
  title: string;
  href: string;
  category: SitemapCategory;
  description?: string;
  isNew?: boolean;
  subItems?: string[]; // Adding support for sub-lists if we want depth
}

export const sitemap: SitemapItem[] = [
  // --- LIVE IN CANADA: Express Entry ---
  { title: 'Express Entry', href: '/live-in-canada/express-entry', category: 'Live in Canada', description: 'Federal Skilled Worker & CEC', isNew: true },
  { title: 'Federal Skilled Worker', href: '/live-in-canada/skilled-immigration/federal-skilled-worker', category: 'Live in Canada' },
  { title: 'Canadian Experience Class', href: '/live-in-canada/skilled-immigration/canadian-experience-class', category: 'Live in Canada' },

  // --- LIVE IN CANADA: PNP Streams ---
  { title: 'BC PNP', href: '/live-in-canada/pnps-program/british-columbia', category: 'Live in Canada', description: 'British Columbia Provincial Nominee Program' },
  { title: 'OINP (Ontario)', href: '/live-in-canada/pnps-program/ontario', category: 'Live in Canada', description: 'Ontario Immigrant Nominee Program' },
  { title: 'AINP (Alberta)', href: '/live-in-canada/pnps-program/alberta', category: 'Live in Canada', description: 'Alberta Advantage Immigration Program' },
  { title: 'SINP (Saskatchewan)', href: '/live-in-canada/pnps-program/saskatchewan', category: 'Live in Canada' },
  { title: 'MPNP (Manitoba)', href: '/live-in-canada/pnps-program/manitoba', category: 'Live in Canada' },
  { title: 'NSNP (Nova Scotia)', href: '/live-in-canada/pnps-program/nova-scotia', category: 'Live in Canada' },

  // --- LIFE IN CANADA: Guides ---
  { title: 'Cost of Living', href: '/life-in-canada/canadian-facts/the-cost-of-living-in-canada', category: 'Life in Canada', description: 'Budgeting for your new life' },
  { title: 'Healthcare System', href: '/life-in-canada/know-healthcare', category: 'Life in Canada' },
  { title: 'Banking & Finance', href: '/life-in-canada/understand-finance/canadian-banking', category: 'Life in Canada' },
  { title: 'Housing Market', href: '/life-in-canada/housing-fundamentals/buying-a-home', category: 'Life in Canada' },
  { title: 'Education System', href: '/life-in-canada/education', category: 'Life in Canada' },
  { title: 'Driving in Canada', href: '/life-in-canada/driving-lincense', category: 'Life in Canada' },

  // --- WORK & BUSINESS ---
  { title: 'Start-up Visa', href: '/live-in-canada/business-immigration/start-up-visa', category: 'Live in Canada', description: 'For innovative entrepreneurs' },
  { title: 'Self-Employed', href: '/live-in-canada/business-immigration/self-employment-program', category: 'Live in Canada' },
  { title: 'LMIA Work Permits', href: '/live-in-canada/work-permit/lmia-based-work-permits', category: 'Live in Canada' },
  { title: 'Global Talent Stream', href: '/live-in-canada/work-permit/global-talent-stream', category: 'Live in Canada' },

  // --- CALCULATORS ---
  { title: 'CRS Score Calculator', href: '/crs-calculator', category: 'Calculators', description: 'Express Entry Points', isNew: true },
  { title: 'CLB Language Converter', href: '/clb-calculator', category: 'Calculators' },
  { title: 'BC PNP Calculator', href: '/bc-pnp-point-latest', category: 'Calculators' },

  // --- ABOUT ---
  { title: 'Meet Our Founder', href: '/meet-our-founder', category: 'About Us', description: 'Vinay Chaudhary, RCIC' },
  { title: 'Our Team', href: '/our-team', category: 'About Us' },
  { title: 'Contact Us', href: '/contact-us', category: 'About Us' },
];

export const navigationCategories = [
  {
    name: 'Live in Canada',
    items: sitemap.filter(i => i.category === 'Live in Canada')
  },
  {
    name: 'Life in Canada',
    items: sitemap.filter(i => i.category === 'Life in Canada')
  },
  {
    name: 'Calculators',
    items: sitemap.filter(i => i.category === 'Calculators')
  },
  {
    name: 'About & News',
    items: [...sitemap.filter(i => i.category === 'About Us'), ...sitemap.filter(i => i.category === 'News & Blog')]
  }
];