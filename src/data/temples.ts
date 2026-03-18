export interface Temple {
  id: number;
  name: string;
  deity: string;
  deityName: string;
  otherDeity: string;
  famousFor: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  content: string;
  slug: string;
  imageUrl?: string;
  galleryImages?: string[];
  videoUrl?: string;
  openTime?: string;
  belief?: string;
  address1?: string;
  address2?: string;
  town?: string;
  country?: string;
  pincode?: string;
}

// Deity mapping
export const deityMap: Record<string, string> = {
  "1001": "Shiva",
  "1002": "Vishnu",
  "1003": "Brahma",
  "1004": "Devi/Goddess",
  "1005": "Ganesha",
  "1006": "Hanuman",
  "1007": "Murugan",
  "1008": "Ayyappan",
  "1009": "Navagraha",
  "1010": "Other",
};

// State mapping
export const stateMap: Record<string, string> = {
  "1001": "Karnataka",
  "1002": "Andhra Pradesh",
  "1003": "Tamil Nadu",
  "1004": "Kerala",
  "1005": "Maharashtra",
  "1006": "Gujarat",
  "1007": "Rajasthan",
  "1008": "Uttar Pradesh",
  "1009": "Madhya Pradesh",
  "1010": "Himachal Pradesh",
  "1011": "Jammu & Kashmir",
  "1012": "West Bengal",
  "1013": "Odisha",
  "1014": "Telangana",
};

// District mapping (partial)
export const districtMap: Record<string, string> = {
  "1045": "Anantapur",
  "1046": "Chittoor",
  "1525": "Solan",
  "1526": "Una",
  "1370": "Jammu",
  "1371": "Leh",
};

export const temples: Temple[] = [];

// Get unique deities
export const getUniqueDeities = (): string[] => {
  return [...new Set(temples.map(t => t.deity))].filter(Boolean).sort();
};

// Get unique states
export const getUniqueStates = (): string[] => {
  return [...new Set(temples.map(t => t.state))].filter(Boolean).sort();
};

// Get unique famous for categories (simplified)
export const getFamousForCategories = (): string[] => {
  return [
    "Jyotirlinga",
    "Shakti Peetha",
    "Char Dham",
    "UNESCO Site",
    "Ancient Temple",
    "Architectural Marvel",
    "Pilgrimage Center",
  ];
};
