export interface TourItinerary {
  day: number;
  title: string;
  description: string;
  temples?: string[];
  cities?: string[];
}

export interface Tour {
  id: number;
  name: string;
  slug: string;
  duration: string;
  days: number;
  nights: number;
  groupSize: string;
  rating: number;
  description: string;
  longDescription: string;
  templesCount: number;
  citiesCovered: string[];
  highlights: string[];
  inclusions: string[];
  itinerary: TourItinerary[];
  imageUrl?: string;
  galleryImages?: string[];
  videoUrl?: string;
}

export const tours: Tour[] = [];

export const getTourBySlug = (slug: string): Tour | undefined => {
  return tours.find(tour => tour.slug === slug);
};

export const getTourById = (id: number): Tour | undefined => {
  return tours.find(tour => tour.id === id);
};
