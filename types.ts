
export interface Memory {
  id: string;
  title: string;
  // Made optional to accommodate memories in GALLERY_MEMORIES that only have images and titles
  description?: string;
  imageUrl: string;
  date?: string;
  rotation?: string;
  size?: 'sm' | 'md' | 'lg';
}

export interface LoveNote {
  id: string;
  content: string;
  icon: string;
  color: string;
  rotation?: string;
}

export enum View {
  HOME = 'Home',
  GALLERY = 'Gallery',
  MESSAGES = 'Messages'
}