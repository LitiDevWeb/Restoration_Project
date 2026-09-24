// Real photographs from the Fennec Restoration job archives.
// Every photo is tagged with the stage it actually shows (BEFORE / IN PROGRESS
// / AFTER) plus the category it belongs to, so gallery filters, captions and
// alt text never overstate what a photo proves.
//
// Photos that only show utility equipment or unfinished catio framing are
// intentionally left out — they are not portfolio material.

import type { StaticImageData } from 'next/image';

import kitchen1 from '@images/kitchen/1.jpg';
import kitchen2 from '@images/kitchen/2.jpg';
import kitchen3 from '@images/kitchen/3.jpg';
import kitchen4 from '@images/kitchen/4.jpg';
import kitchenA1 from '@images/kitchen/A1.jpg';
import kitchenA2 from '@images/kitchen/A2.jpg';
import kitchenB1 from '@images/kitchen/B1.jpg';
import kitchenB2 from '@images/kitchen/B2.jpg';

import bathroom1 from '@images/bathroom/1.jpg';
import bathroom2 from '@images/bathroom/2.jpg';
import bathroom3 from '@images/bathroom/3.jpg';
import bathroom4 from '@images/bathroom/4.jpg';
import bathroom5 from '@images/bathroom/5.jpg';
import bathroomA1 from '@images/bathroom/A1.jpg';
import bathroomA2 from '@images/bathroom/A2.jpg';
import bathroomA3 from '@images/bathroom/A3.jpg';
import bathroomA4 from '@images/bathroom/A4.jpg';
import bathroomA5 from '@images/bathroom/A5.jpg';
import bathroomB1 from '@images/bathroom/B1.jpg';
import bathroomB2 from '@images/bathroom/B2.jpg';
import bathroomB3 from '@images/bathroom/B3.jpg';
import bathroomB4 from '@images/bathroom/B4.jpg';
import bathroomB5 from '@images/bathroom/B5.jpg';

import bedroom1 from '@images/bedroom/1.jpg';
import bedroom2 from '@images/bedroom/2.jpg';
import bedroom3 from '@images/bedroom/3.jpg';
import bedroom4 from '@images/bedroom/4.jpg';
import bedroom5 from '@images/bedroom/5.jpg';

import patio1 from '@images/patio/1.jpg';
import patio2 from '@images/patio/2.jpg';
import patio3 from '@images/patio/3.jpg';
import patio4 from '@images/patio/4.jpg';
import patio5 from '@images/patio/5.jpg';
import patio6 from '@images/patio/6.jpg';
import patio7 from '@images/patio/7.jpg';
import patio8 from '@images/patio/8.jpg';
import patio9 from '@images/patio/9.jpg';

import misc1 from '@images/miscellaneous/1.jpg';
import misc2 from '@images/miscellaneous/2.jpg';
import misc3 from '@images/miscellaneous/3.jpg';
import misc4 from '@images/miscellaneous/4.jpg';
import miscA1 from '@images/miscellaneous/A1.jpg';
import miscA2 from '@images/miscellaneous/A2.jpg';
import miscA3 from '@images/miscellaneous/A3.jpg';
import miscA4 from '@images/miscellaneous/A4.jpg';
import miscA5 from '@images/miscellaneous/A5.jpg';
import miscB1 from '@images/miscellaneous/B1.jpg';
import miscB2 from '@images/miscellaneous/B2.jpg';
import miscB3 from '@images/miscellaneous/B3.jpg';
import miscE1 from '@images/miscellaneous/E1.jpg';
import miscE2 from '@images/miscellaneous/E2.jpg';

import livingroomS1 from '@images/livingroom/S1.jpg';
import livingroomS2 from '@images/livingroom/S2.jpg';
import livingroomG1 from '@images/livingroom/G1.jpg';
import livingroomG2 from '@images/livingroom/G2.jpg';

export type Stage = 'before' | 'progress' | 'after';

export const stageLabels: Record<Stage, string> = {
  before: 'Before',
  progress: 'In Progress',
  after: 'After',
};

export type ProjectCategory = 'Kitchen' | 'Bathroom' | 'Interior' | 'Additions & New Builds' | 'Outdoor Living';

export type Photo = {
  src: StaticImageData;
  alt: string;
  stage: Stage;
};

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  summary: string;
  scope: string[];
  cover: StaticImageData;
  photos: Photo[];
};
export const projectCategories: ProjectCategory[] = [
  'Kitchen',
  'Bathroom',
  'Interior',
  'Additions & New Builds',
  'Outdoor Living',
];

export const projects: Project[] = [
  {
    id: 'kitchen-gut-rebuild',
    title: 'Kitchen Gut & Rebuild',
    category: 'Kitchen',
    location: 'Phoenix Valley, AZ',
    summary:
      'A closed-off, dated kitchen was stripped back to studs and rebuilt with new cabinetry, counters, lighting and a service peninsula.',
    scope: ['Full demolition', 'New cabinetry & countertops', 'Tile & backsplash', 'Lighting & electrical'],
    cover: kitchenA2,
    photos: [
      { src: kitchen1, alt: 'Original dated kitchen with worn cabinets before demolition', stage: 'before' },
      { src: kitchenA1, alt: 'Kitchen stripped back to bare drywall during demolition', stage: 'before' },
      { src: kitchen2, alt: 'New peninsula and cabinetry going in during the kitchen remodel', stage: 'progress' },
      { src: kitchen3, alt: 'New kitchen cabinetry with pendant lighting partly installed', stage: 'progress' },
      { src: kitchen4, alt: 'Kitchen remodel in progress with new cabinets and open floor area', stage: 'progress' },
      { src: kitchenA2, alt: 'Finished kitchen with shaker cabinetry, quartz counters and tile backsplash', stage: 'after' },
    ],
  },
  {
    id: 'bath-slate-shower',
    title: 'Slate Tile Shower & Double Vanity',
    category: 'Bathroom',
    location: 'Phoenix Valley, AZ',
    summary:
      'A primary bath taken down to the studs and rebuilt around a large slate-tiled walk-in shower with glass and two vanity layouts.',
    scope: ['Demolition & rough-in', 'Custom tiled shower', 'Frameless glass', 'Dual vanity & fixtures'],
    cover: bathroom3,
    photos: [
      { src: bathroom1, alt: 'Bathroom before remodel with demolition starting on the old finishes', stage: 'before' },
      { src: bathroom2, alt: 'Walk-in shower with new glass panel going in during the bathroom remodel', stage: 'progress' },
      { src: bathroom3, alt: 'Completed walk-in shower with large-format slate tile and glass enclosure', stage: 'after' },
      { src: bathroom4, alt: 'Finished bathroom with dual vanity and hexagon marble floor tile', stage: 'after' },
      { src: bathroom5, alt: 'Finished bathroom with warm wood double vanity and tiled shower', stage: 'after' },
    ],
  },
  {
    id: 'bath-guest-rebuild',
    title: 'Guest Bath Rebuild',
    category: 'Bathroom',
    location: 'Phoenix Valley, AZ',
    summary:
      'An outdated guest bath was gutted, re-panned and finished with a marble-look shower, a new tub surround and fresh tile throughout.',
    scope: ['Demo & mud pan', 'Tub & shower tile', 'Marble-look surround', 'Trim-out & paint'],
    cover: bathroomA4,
    photos: [
      { src: bathroomA1, alt: 'Guest bathroom during demolition with the old finishes removed', stage: 'before' },
      { src: bathroomA2, alt: 'New shower mud pan being formed during the guest bath rebuild', stage: 'progress' },
      { src: bathroomA3, alt: 'Bathtub being set in place during the guest bath remodel', stage: 'progress' },
      { src: bathroomA4, alt: 'Finished shower with large marble-look tile and glass door', stage: 'after' },
      { src: bathroomA5, alt: 'Finished guest bathroom with tan tile surround and new fixtures', stage: 'after' },
    ],
  },
  {
    id: 'bath-hall-refresh',
    title: 'Small Hall Bath Refresh',
    category: 'Bathroom',
    location: 'Phoenix Valley, AZ',
    summary:
      'Compact hall bathrooms upgraded with brick-pattern wall tile, a vessel sink vanity and updated fixtures without changing the footprint.',
    scope: ['Tile replacement', 'Vessel sink vanity', 'Fixture upgrades', 'Paint & trim'],
    cover: bathroomB3,
    photos: [
      { src: bathroomB1, alt: 'Original small hall bathroom before the refresh', stage: 'before' },
      { src: bathroomB2, alt: 'Original hall bathroom vanity and shower before renovation', stage: 'before' },
      { src: bathroomB3, alt: 'Refreshed hall bathroom with brick-pattern tile and vessel sink vanity', stage: 'after' },
      { src: bathroomB4, alt: 'Finished hall bathroom with tiled shower wall and new vanity', stage: 'after' },
      { src: bathroomB5, alt: 'Completed hall bathroom with brick-lay tile and updated fixtures', stage: 'after' },
    ],
  },
  {
    id: 'bedroom-suite-addition',
    title: 'Primary Bedroom Suite Addition',
    category: 'Additions & New Builds',
    location: 'Phoenix Valley, AZ',
    summary:
      'A ground-up bedroom addition taken from framing and sheathing through insulation, drywall, texture and finished flooring.',
    scope: ['Framing & sheathing', 'Insulation', 'Drywall & texture', 'Flooring & finish'],
    cover: bedroom5,
    photos: [
      { src: bedroom1, alt: 'New bedroom addition at framing stage with sheathing and open studs', stage: 'before' },
      { src: bedroom2, alt: 'Bedroom addition with insulation installed before drywall', stage: 'progress' },
      { src: bedroom3, alt: 'Bedroom addition with drywall hung and ready for texture', stage: 'progress' },
      { src: bedroom4, alt: 'Finished bedroom with fresh paint and hardwood-look flooring', stage: 'after' },
      { src: bedroom5, alt: 'Completed bedroom addition with painted walls and wood flooring', stage: 'after' },
    ],
  },
  {
    id: 'addition-metal-roof',
    title: 'Addition Framing & Metal Roof',
    category: 'Additions & New Builds',
    location: 'Phoenix Valley, AZ',
    summary:
      'A structural addition framed, sheathed and topped with a standing-seam metal roof tied into the existing house.',
    scope: ['Structural framing', 'Sheathing & weather barrier', 'Metal roofing', 'Exterior tie-in'],
    cover: miscA3,
    photos: [
      { src: miscA1, alt: 'Addition framing in place before sheathing was installed', stage: 'before' },
      { src: miscA2, alt: 'Addition wrapped in green sheathing during exterior construction', stage: 'progress' },
      { src: miscA3, alt: 'Completed addition with standing-seam metal roof and stucco exterior', stage: 'after' },
    ],
  },
  {
    id: 'garage-conversion',
    title: 'Carport to Enclosed Garage',
    category: 'Additions & New Builds',
    location: 'Phoenix Valley, AZ',
    summary:
      'An open carport was closed in and finished into a secure garage with a wood-look door and matching exterior finish.',
    scope: ['Wall framing & stucco', 'Garage door install', 'Electrical', 'Exterior finish'],
    cover: miscA5,
    photos: [
      { src: miscA4, alt: 'Open carport before being enclosed into a garage', stage: 'before' },
      { src: miscA5, alt: 'Finished enclosed garage with wood-look overhead door and stucco exterior', stage: 'after' },
    ],
  },
  {
    id: 'interior-openings-fireplace',
    title: 'Interior Openings, Sliders & Fireplace',
    category: 'Interior',
    location: 'Phoenix Valley, AZ',
    summary:
      'Interior upgrades spanning new door and slider openings, arched architectural details and a stone fireplace wall with built-ins.',
    scope: ['Door & slider openings', 'Arched openings', 'Stone fireplace & built-ins', 'Trim & paint'],
    cover: miscE1,
    photos: [
      { src: misc2, alt: 'Sliding door opening being framed during the interior remodel', stage: 'progress' },
      { src: misc1, alt: 'Finished french door opening with new trim and paint', stage: 'after' },
      { src: misc3, alt: 'Completed sliding glass door with finished interior surround', stage: 'after' },
      { src: misc4, alt: 'Interior arched window opening finished with trim', stage: 'after' },
      { src: miscB1, alt: 'Stone fireplace wall with built-in cabinetry after completion', stage: 'after' },
      { src: miscB2, alt: 'Stone fireplace and shelving detail in the finished living area', stage: 'after' },
      { src: miscB3, alt: 'Completed built-in shelving and stone fireplace surround', stage: 'after' },
      { src: miscE1, alt: 'Arched interior opening with chandelier in the finished home', stage: 'after' },
      { src: miscE2, alt: 'Arched hallway with chandelier and finished flooring', stage: 'after' },
    ],
  },
  {
    id: 'interior-living-room-refresh',
    title: 'Living Room Floor Replacement & Beam Details',
    category: 'Interior',
    location: 'Phoenix Valley, AZ',
    summary:
      'Two living spaces brought back to life: a carpeted room rebuilt with wood beams and a black paneled media wall, and a vaulted room taken down to the subfloor for new hardwood and a chandelier.',
    scope: ['Carpet & flooring removal', 'Wood beam details', 'Black paneled media wall', 'Hardwood floors & lighting'],
    cover: livingroomS2,
    photos: [
      { src: livingroomS1, alt: 'Cluttered carpeted living room before the remodel with a popcorn ceiling and a pass-through to the kitchen', stage: 'before' },
      { src: livingroomG1, alt: 'Walk-behind floor stripper lifting the old flooring in the vaulted living room during demolition', stage: 'progress' },
      { src: livingroomG2, alt: 'Finished vaulted living room with new hardwood floors, chandelier and French doors out to the pool', stage: 'after' },
      { src: livingroomS2, alt: 'Finished open living area with wood beams, a black paneled media wall and light hardwood flooring', stage: 'after' },
    ],
  },
  {
    id: 'outdoor-living-structures',
    title: 'Patios, Ramadas & Pergolas',
    category: 'Outdoor Living',
    location: 'Phoenix Valley, AZ',
    summary:
      'Backyard structures built for desert sun: paver patios, covered patio framing, wood-ceiling ramadas and a steel-slat pergola.',
    scope: ['Paver installation', 'Joist & beam framing', 'Wood ceiling & fans', 'Steel pergola'],
    cover: patio9,
    photos: [
      { src: patio1, alt: 'Paver patio installation in progress with base prep complete', stage: 'progress' },
      { src: patio2, alt: 'Paver patio rows being laid across the backyard', stage: 'progress' },
      { src: patio3, alt: 'Roof joists and framing being set for a covered patio', stage: 'progress' },
      { src: patio4, alt: 'Completed covered patio attached to the home', stage: 'after' },
      { src: patio5, alt: 'Finished patio cover with paved deck area', stage: 'after' },
      { src: patio6, alt: 'Completed ramada structure with open sides and paved floor', stage: 'after' },
      { src: patio7, alt: 'Finished pool deck and patio hardscape', stage: 'after' },
      { src: patio8, alt: 'Completed steel-slat pergola over an outdoor seating area', stage: 'after' },
      { src: patio9, alt: 'Finished covered patio with wood ceiling and tiled floor', stage: 'after' },
      { src: kitchenB1, alt: 'Covered walkway with wood ceiling and tile finish after construction', stage: 'after' },
      { src: kitchenB2, alt: 'Vaulted wood ceiling patio with ceiling fan after completion', stage: 'after' },
    ],
  },
];

export const featuredProjectIds = [
  'kitchen-gut-rebuild',
  'bath-slate-shower',
  'bedroom-suite-addition',
  'outdoor-living-structures',
  'addition-metal-roof',
  'interior-openings-fireplace',
];

export const galleryStats = {
  photos: projects.reduce((total, project) => total + project.photos.length, 0),
  projects: projects.length,
  categories: projectCategories.length,
};
