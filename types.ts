
export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface Course {
  id: string;
  title: string;
  code: string;
  description: string;
  coreConcepts: string[];
  link?: string;
  highlight?: string;
}

export interface ArticleCategory {
  name: string;
  tags: string[];
}

// Support for nested category tree
export interface CategoryNode {
  id: string;
  name: string;
  children?: CategoryNode[];
}

export interface Article {
  id: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  categories: string[]; // Stores category names or slugs
  tags: string[];
  link?: string; // URL to the actual WordPress post
  content?: string; // HTML content from WP
  isNew?: boolean;
}

// Legacy Event interface - keeping for compatibility if needed, though we are shifting to specific types
export interface Event {
  id: string;
  date: string;
  title: string;
  speaker?: string;
  type: 'Lecture' | 'Workshop' | 'Seminar' | 'Gathering';
  description: string;
}

export interface LeadershipEvent {
  id: string;
  date: string;
  title: string;
  speaker: string;
  image: string;
  link?: string;
  status: 'completed' | 'upcoming';
}

export interface WorkshopEvent {
  id: string;
  date: string;
  title: string;
  image: string;
  details: string[];
}

export interface LunchGathering {
  title: string;
  dates: string[];
  image: string;
}
