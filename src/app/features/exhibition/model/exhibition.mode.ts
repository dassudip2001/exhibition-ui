export interface CreateExhibition {
  title: string;
  description: string;
  bannerImage: string;
  thumbnailImage: string;
  startDate: string;
  endDate: string;
  status: ExhibitionStatusT;
  slug: string;
  sections: ExhibitionSection[];
}
export interface ExhibitionSection {
  id: string;
  type: ExhibitionSectionTypeT;
  title: string;
  content: string;
  order: number;
}

export enum ExhibitionStatusT {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived',
}

export enum ExhibitionSectionTypeT {
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  GALLERY = 'gallery',
  SLIDER = 'slider',
  CAROUSEL = 'carousel',
  EMBEDDED = 'embedded',
  HTML = 'html',
  IFRAME = 'iframe',
}
