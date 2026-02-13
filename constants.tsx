
import { Memory, LoveNote } from './types';

import mainImg from './assets/main.jpg';
import p1 from './assets/p1.jpg';
import p2 from './assets/p2.jpg';
import p3 from './assets/p3.jpg';
import p4 from './assets/p4.jpg';
import p5 from './assets/p5.jpg';
import p6 from './assets/p6.jpg';
import p7 from './assets/p7.jpg';
import p8 from './assets/p8.jpg';
import p9 from './assets/p9.jpg';
import p10 from './assets/p10.jpg';
import p11 from './assets/p11.jpg';
import p12 from './assets/p12.jpg';
import p13 from './assets/p13.jpg';
import p14 from './assets/p14.jpg';
import p15 from './assets/p15.jpg';
import musicFile from './assets/music.mp3';

export const HERO_IMAGE = mainImg;
export const BACKGROUND_MUSIC = musicFile;

export const FEATURED_MEMORY: Memory = {
  id: 'featured-1',
  title: 'Where it all changed',
  description: '"Was something random turned out to be a life changing love I felt."',
  imageUrl: mainImg,
  date: 'The day everything changed...'
};

export const GALLERY_MEMORIES: Memory[] = [
  {
    id: 'm1',
    title: "Summer '23",
    imageUrl: p1,
    rotation: 'rotate-1'
  },
  {
    id: 'm2',
    title: 'Our First Hike',
    imageUrl: p2,
    rotation: '-rotate-2'
  },
  {
    id: 'm3',
    title: 'Birthday Dinner',
    imageUrl: p3,
    rotation: 'rotate-3'
  },
  {
    id: 'm4',
    title: 'Beach Day',
    imageUrl: p4,
    rotation: '-rotate-1'
  },
  {
    id: 'm5',
    title: 'Road Trip',
    imageUrl: p5,
    rotation: 'rotate-2'
  },
  {
    id: 'm6',
    title: 'Cozy Winter',
    imageUrl: p6,
    rotation: '-rotate-3'
  },
  {
    id: 'm7',
    title: 'Sunset Walk',
    imageUrl: p7,
    rotation: 'rotate-1'
  },
  {
    id: 'm8',
    title: 'Cooking Together',
    imageUrl: p8,
    rotation: '-rotate-2'
  },
  {
    id: 'm9',
    title: 'Under the Stars',
    imageUrl: p9,
    rotation: 'rotate-3'
  },
  {
    id: 'm10',
    title: 'Morning Coffee',
    imageUrl: p10,
    rotation: '-rotate-1'
  },
  {
    id: 'm11',
    title: 'City Lights',
    imageUrl: p11,
    rotation: 'rotate-2'
  },
  {
    id: 'm12',
    title: 'Garden Picnic',
    imageUrl: p12,
    rotation: '-rotate-3'
  },
  {
    id: 'm13',
    title: 'Movie Night',
    imageUrl: p13,
    rotation: 'rotate-1'
  },
  {
    id: 'm14',
    title: 'Weekend Getaway',
    imageUrl: p14,
    rotation: '-rotate-2'
  },
  {
    id: 'm15',
    title: 'Our Favorite Spot',
    imageUrl: p15,
    rotation: 'rotate-3'
  }
];

export const INITIAL_LOVE_NOTES: LoveNote[] = [
  {
    id: 'n1',
    content: "I love how you always know exactly how I like my coffee in the morning.",
    icon: 'push_pin',
    color: 'bg-[#fff9c4]',
    rotation: 'rotate-1'
  },
  {
    id: 'n2',
    content: "Being with you feels like the safest place in the world.",
    icon: 'favorite',
    color: 'bg-pink-50',
    rotation: '-rotate-2'
  },
  {
    id: 'n3',
    content: "Your laugh is my favorite soundtrack in the entire world.",
    icon: 'edit',
    color: 'bg-orange-50',
    rotation: 'rotate-2'
  },
  {
    id: 'n4',
    content: "To many more adventures and thousands more photos to add here. Love you!",
    icon: 'auto_awesome',
    color: 'bg-[#fff9c4]',
    rotation: '-rotate-1'
  }
];
