import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a Wix image URL string or wix:image:// URI into a standard HTML-compatible https URL
 * @param wixUrl The raw image string from Wix CMS
 * @returns A standard https URL
 */
export function getWixImageUrl(wixUrl?: string | null): string {
  if (!wixUrl) return '';

  // If it's already a full HTTP(s) URL, return it
  if (wixUrl.startsWith('http://') || wixUrl.startsWith('https://')) {
    return wixUrl;
  }

  // Wix image URLs typically look like: wix:image://v1/identifier.jpg/filename#originWidth=1000&originHeight=1000
  if (wixUrl.startsWith('wix:image://v1/')) {
    // Extract the image identifier
    const parts = wixUrl.split('/');
    if (parts.length > 3) {
      const imageId = parts[3]; // 'identifier.jpg'
      return `https://static.wixstatic.com/media/${imageId}`;
    }
  }

  return wixUrl;
}
