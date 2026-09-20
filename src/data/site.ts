// Canonical business information — single source of truth for NAP details,
// navigation, services and marketing copy. Update here, never in components.

export const site = {
  name: 'Fennec Restoration & Remodeling LLC',
  shortName: 'Fennec Restoration',
  legalName: 'Fennec Restoration & Remodeling LLC',
  classification: 'General Contractor',
  roc: '355657',
  tagline: 'Big or Small — We Do It All.',
  headerLine: 'Restoration & Remodeling',
  phoneDisplay: '(602) 245-1768',
  phoneHref: 'tel:+16022451768',
  smsHref: 'sms:+16022451768',
  email: 'fennecbuilding@gmail.com',
  emailHref: 'mailto:fennecbuilding@gmail.com?subject=Free%20estimate%20request',
  areaServed: 'Phoenix Valley & Surrounding Areas, Arizona',
  areaShort: 'Phoenix Valley & Surrounding Areas',
  addressLocality: 'Phoenix',
  addressRegion: 'AZ',
  addressCountry: 'US',
  url: 'https://www.fennecrestoration.com',
  responseNote: 'Send us a message any time — phone, text, or the form below. No pressure, no obligation.',
} as const;

export type NavLink = {
  label: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { label: 'Home', href: '/home' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Availability', href: '/calendar' },
];

export const trustPoints: { value: string; label: string }[] = [
  { value: `ROC ${site.roc}`, label: 'Licensed Arizona contractor' },
  { value: 'Bonded & insured', label: 'Covered work, clean job sites' },
  { value: 'Residential + commercial', label: 'From repairs to full builds' },
  { value: 'Phoenix Valley', label: 'Locally owned and operated' },
];

export const coreServices: {
  key: string;
  title: string;
  summary: string;
  bullets: string[];
}[] = [
  {
    key: 'remodeling',
    title: 'Remodeling',
    summary:
      'Full interior transformations — kitchens, baths and living spaces rebuilt around how you actually live.',
    bullets: ['Kitchen & bath remodels', 'Open-concept conversions', 'Cabinets, counters & tile'],
  },
  {
    key: 'restoration',
    title: 'Restoration',
    summary:
      'Bringing damaged or dated homes back to solid, code-compliant condition after water, fire or years of wear.',
    bullets: ['Water & fire damage repair', 'Drywall & texture matching', 'Structural corrections'],
  },
  {
    key: 'additions',
    title: 'Additions',
    summary: 'Room additions, garage conversions and casitas that add square footage without moving house.',
    bullets: ['Bedroom & bath additions', 'Garage conversions', 'Framing through finish work'],
  },
  {
    key: 'outdoor',
    title: 'Outdoor Living',
    summary:
      'Patios, ramadas, pergolas and pavers built for Arizona sun — shade, structure and hardscape done right.',
    bullets: ['Covered patios & ramadas', 'Steel & wood pergolas', 'Pavers, decks & pool decks'],
  },
  {
    key: 'new-builds',
    title: 'New Builds',
    summary: 'Ground-up construction and major structural work with one accountable general contractor.',
    bullets: ['Ground-up construction', 'Structural framing & roofing', 'Permits & inspections'],
  },
];

export const specializedServices: { key: string; label: string }[] = [
  { key: 'kitchen', label: 'Kitchen Remodeling' },
  { key: 'bath', label: 'Bathroom Remodeling' },
  { key: 'shower', label: 'Custom Showers & Tile' },
  { key: 'vanity', label: 'Vanities & Countertops' },
  { key: 'flooring', label: 'Flooring Installation' },
  { key: 'drywall', label: 'Drywall & Texture' },
  { key: 'paint', label: 'Interior & Exterior Paint' },
  { key: 'doors', label: 'Doors, Windows & Sliders' },
  { key: 'patio', label: 'Patio Covers & Ramadas' },
  { key: 'pergola', label: 'Pergolas & Shade Structures' },
  { key: 'pavers', label: 'Pavers & Concrete' },
  { key: 'roofing', label: 'Roofing & Metal Roofs' },
  { key: 'electrical', label: 'Electrical & Lighting' },
  { key: 'plumbing', label: 'Plumbing Rough-In & Trim' },
  { key: 'fireplace', label: 'Fireplaces & Built-Ins' },
  { key: 'garage', label: 'Garage Conversions' },
  { key: 'framing', label: 'Framing & Structural Repair' },
  { key: 'punch', label: 'Punch Lists & Repair Work' },
];
export const whyFennec: { title: string; text: string }[] = [
  {
    title: 'One contractor, start to finish',
    text: 'Design, permitting, trades and finish work are coordinated by the same team — no chasing five different crews.',
  },
  {
    title: 'Fixed, itemized estimates',
    text: 'You see what the work costs and why before anything starts, so surprises stay on the job site and out of your budget.',
  },
  {
    title: 'Built for Arizona homes',
    text: 'Stucco, block, slab-on-grade, desert sun. We detail work that holds up in the Valley instead of failing in two summers.',
  },
  {
    title: 'Clean, respectful job sites',
    text: 'Daily cleanup, protected floors and a schedule you can plan your week around — you still have to live there.',
  },
  {
    title: 'Real communication',
    text: 'One point of contact, plain-language updates and photos as the work progresses. You always know where your project stands.',
  },
  {
    title: 'Big or small — we do it all',
    text: 'From a single shower rebuild to a ground-up addition, the same standards apply to every scope we take on.',
  },
];
export const processSteps: { step: string; title: string; text: string }[] = [
  {
    step: '01',
    title: 'Free walkthrough',
    text: 'We visit the property, measure, listen to what you want and flag anything that will affect cost or schedule.',
  },
  {
    step: '02',
    title: 'Scope & itemized estimate',
    text: 'You get a written scope with line-item pricing, material options and a realistic timeline — no vague lump sums.',
  },
  {
    step: '03',
    title: 'Build & daily updates',
    text: 'Trades are sequenced, inspections are handled and you receive progress photos while the work moves forward.',
  },
  {
    step: '04',
    title: 'Walkthrough & warranty',
    text: 'We close out the punch list together, hand the space over clean and stand behind the work after we leave.',
  },
];
export const faqs: { question: string; answer: string }[] = [
  {
    question: 'What areas do you serve?',
    answer: `We work throughout the ${site.areaServed}. If you are not sure whether your address is in range, send it along with your project details and we will confirm.`,
  },
  {
    question: 'Are you licensed and insured?',
    answer: `${site.legalName} is a licensed Arizona general contractor operating under ROC ${site.roc}, and we are bonded and insured.`,
  },
  {
    question: 'Do you provide free estimates?',
    answer:
      'Estimates are free. We walk the property, talk through the options and send a written, itemized scope so you can compare bids on equal footing.',
  },
  {
    question: 'Can you handle permits and inspections?',
    answer:
      'We can. Structural work, additions and conversions usually require permits — we prepare the scope, coordinate the inspections and keep the paperwork moving.',
  },
  {
    question: 'Do you take on small jobs?',
    answer:
      'Yes. A single bathroom, a damaged wall, a slider replacement or a punch list are all welcome. Big or small — we do it all.',
  },
  {
    question: 'How long does a typical remodel take?',
    answer:
      'Bathrooms commonly run a few weeks, while kitchens and additions take longer once permits and material lead times are factored in. Your written scope includes a projected schedule before we start.',
  },
];

export const estimateProjectTypes: string[] = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Whole-Home Remodel',
  'Room Addition / Garage Conversion',
  'New Build',
  'Outdoor Living (Patio, Pergola, Pavers)',
  'Roofing',
  'Restoration / Water or Fire Damage',
  'Repairs & Repair Work',
  'Something Else',
];
