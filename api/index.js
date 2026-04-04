import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { createClient, ApiKeyStrategy } from "@wix/sdk";
import { items } from "@wix/data";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ---------------- LOAD ENV ----------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, "..", ".env") });

const WIX_API_KEY =
  process.env.WIX_API_KEY || process.env.VITE_WIX_API_KEY;
const WIX_SITE_ID =
  process.env.WIX_SITE_ID || process.env.VITE_WIX_SITE_ID;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json());

// ---------------- ROOT ROUTE ----------------
app.get("/", (req, res) => {
  res.send("Backend server is running correctly.");
});

// ---------------- WIX CLIENT ----------------

function getWixClient() {
  if (!WIX_API_KEY || !WIX_SITE_ID) {
    throw new Error("Missing Wix credentials in .env");
  }

  return createClient({
    modules: { items },
    auth: ApiKeyStrategy({
      apiKey: WIX_API_KEY,
      siteId: WIX_SITE_ID,
    }),
  });
}

// ---------------- WIX IMAGE EXTRACTOR ----------------
function getWixImageUrl(wixUrl) {
  if (!wixUrl) return "";
  if (typeof wixUrl !== "string") return "";
  if (wixUrl.startsWith("http")) return wixUrl;
  if (wixUrl.startsWith("wix:image://v1/")) {
    const parts = wixUrl.split("/");
    if (parts.length >= 4) {
      const uri = parts[3];
      return `https://static.wixstatic.com/media/${uri}`;
    }
  }
  return wixUrl;
}

// ---------------- SAFE FIELD EXTRACTOR ----------------

function extractFields(item) {
  return item.data && Object.keys(item.data).length > 0
    ? item.data
    : item;
}

// ---------------- ITINERARY PARSER ----------------

function parseItineraryString(itineraryStr) {
  if (!itineraryStr || typeof itineraryStr !== "string") return [];

  // Split by "Day X" pattern
  const days = itineraryStr.split(/Day\s+(\d+)/i).filter(Boolean);
  const result = [];

  for (let i = 0; i < days.length; i += 2) {
    const dayNum = parseInt(days[i]);
    const content = days[i + 1] || "";
    
    // Attempt to split title and description by the first sentence or newline
    const firstFullStop = content.indexOf('.');
    let title = "";
    let description = "";

    if (firstFullStop !== -1) {
      title = content.substring(0, firstFullStop).trim();
      description = content.substring(firstFullStop + 1).trim();
    } else {
      title = content.trim();
      description = content.trim();
    }

    result.push({
      day: dayNum,
      title: title || `Day ${dayNum}`,
      description: description,
      temples: [], // We can't easily extract this from raw text without NLP
      cities: []
    });
  }

  return result;
}

function mapTourItem(item) {
  const f = extractFields(item);
  
  // 🪵 DIAGNOSTIC: Log what we found
  console.log(`\n📦 Mapping Tour: ${f.name || f.title || f.Name || f.Title || item._id}`);
  console.log(`   Keys present: ${Object.keys(f).slice(0, 10).join(", ")}...`);

  // Robust field selectors
  const itenaryData = f.itenary || f.itinerary || f.Itinerary || f.Itenary || f.itenary_fld;
  const placesData = f.placesCovered || f.places_covered || f.PlacesCovered || f.placesCovered_fld;
  const durationData = f.duration || f.Duration || f.duration_fld;
  const templesData = f.templesCovered || f.temples_covered || f.templesCovered_fld;
  const templeCountData = f.templeCount || f.templesCount || f.templeCount_fld;
  const imageData = f.image || f.image_fld || f.Image || f.Image_fld;
  const inclusionsData = f.inclusionsAndExclusions || f.inclusions_and_exclusions || f.inclusionsAndExclusions_fld;

  const parsedItinerary = parseItineraryString(itenaryData);

  const places = typeof placesData === "string"
    ? placesData.split(",").map((p) => p.trim())
    : (Array.isArray(placesData) ? placesData : []);

  const cities = (Array.isArray(f.citiesCovered) && f.citiesCovered.length > 0)
    ? f.citiesCovered 
    : (f.citiesCovered ? f.citiesCovered.split(',').filter(Boolean) : places);

  const inclusions = (Array.isArray(f.inclusions) && f.inclusions.length > 0)
    ? f.inclusions
    : (inclusionsData ? inclusionsData.split('\n').filter(Boolean).map(i => i.trim()) : []);

  const highlights = (Array.isArray(f.highlights) && f.highlights.length > 0)
    ? f.highlights
    : (f.description ? [f.description.substring(0, 100).trim() + "..."] : []);

  const durationMatch = (durationData || "").match(/(\d+)\s*Days?\s*\/\s*(\d+)\s*Nights?/i);
  const days = durationMatch ? parseInt(durationMatch[1]) : (parseInt(f.days) || 0);
  const nights = durationMatch ? parseInt(durationMatch[2]) : (parseInt(f.nights) || 0);

  const name = f.name || f.title || f.Name || f.Title || "";
  const slug = f.slug || name.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove all non-word/non-space/non-dash chars
    .trim()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/-+/g, '-'); // collapse multiple -

  console.log(`   Result: ${days} Days, ${cities.length} Cities, ${parsedItinerary.length} Itinerary steps`);

  return {
    id: item._id,
    name,
    imageUrl: getWixImageUrl(imageData),
    duration: durationData || "",
    days,
    nights,
    groupSize: f.groupSize || "2-10 People",
    rating: parseFloat(f.rating) || 4.5,
    state: f.state || "",
    zone: f.zone || "",
    description: f.description || "",
    longDescription: f.longDescription || f.description || "",
    placesCovered: places,
    citiesCovered: cities,
    templesCovered: Number(templesData) || 0,
    templesCount: parseInt(templeCountData || templesData) || 0,
    highlights,
    inclusions,
    inclusionsAndExclusions: inclusionsData || "",
    itinerary: parsedItinerary,
    slug
  };
}

// =====================================================
// ================= TEMPLES API =======================
// =====================================================

app.get("/api/temples", async (req, res) => {
  try {
    const client = getWixClient();

    let allItems = [];
    let skipCount = 0;
    const limitCount = 1000;

    while (true) {
      const result = await client.items
        .query("TempleandToursDB")
        .limit(limitCount)
        .skip(skipCount)
        .find();

      allItems.push(...result.items);

      if (result.items.length < limitCount) {
        break;
      }
      skipCount += limitCount;
    }

    const temples = allItems.map((item) => {
      const f = extractFields(item);

      return {
        id: item._id,
        name: f.name ?? "",
        deity: f.deity ?? "",
        deityName: f.deity_name_in_temple ?? "",
        otherDeity: f.other_deity ?? "",
        famousFor: f.famous_for ?? "",
        openTime: f.open_time ?? "",
        belief: f.belief ?? "",
        address1: f.address1 ?? "",
        address2: f.address2 ?? "",
        town: f.town ?? "",
        district: f.district ?? "",
        state: f.state ?? "",
        country: f.country ?? "",
        pincode: f.pincode ?? "",
        latitude: Number(f.latitude) || 0,
        longitude: Number(f.longitude) || 0,
        content: f.content ?? "",
        // Media fields
        imageUrl: getWixImageUrl(f.image_fld), // 🔥 UPDATED TO MATCH WIX FIELD ID "image_fld"
        slug:
          f.slug ??
          f.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ??
          "",
      };
    });

    res.json(temples);
  } catch (error) {
    console.error("Temples Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/temples/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const client = getWixClient();
    const isNumeric = !isNaN(Number(idOrSlug));

    const result = await client.items
      .query("TempleandToursDB")
      .eq(isNumeric ? "_id" : "slug", String(idOrSlug))
      .find();

    if (result.items.length === 0) {
      return res.status(404).json({ error: "Temple not found" });
    }

    const item = result.items[0];
    const f = extractFields(item);

    res.json({
      id: item._id,
      name: f.name ?? "",
      deity: f.deity ?? "",
      deityName: f.deity_name_in_temple ?? "",
      otherDeity: f.other_deity ?? "",
      famousFor: f.famous_for ?? "",
      openTime: f.open_time ?? "",
      belief: f.belief ?? "",
      address1: f.address1 ?? "",
      address2: f.address2 ?? "",
      town: f.town ?? "",
      district: f.district ?? "",
      state: f.state ?? "",
      country: f.country ?? "",
      pincode: f.pincode ?? "",
      latitude: Number(f.latitude) || 0,
      longitude: Number(f.longitude) || 0,
      content: f.content ?? "",
      imageUrl: getWixImageUrl(f.image_fld),
      slug: f.slug ?? f.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-") ?? "",
    });
  } catch (error) {
    console.error("Temple Detail Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// =====================================================
// ================= TOURS API =========================
// =====================================================

app.get("/api/tours", async (req, res) => {
  try {
    const client = getWixClient();

    let allItems = [];
    let skipCount = 0;
    const limitCount = 1000;

    while (true) {
      const result = await client.items
        .query("PilgrimagePackagesDB")
        .limit(limitCount)
        .skip(skipCount)
        .find();

      allItems.push(...result.items);

      if (result.items.length < limitCount) {
        break;
      }
      skipCount += limitCount;
    }

    const tours = allItems.map(mapTourItem);
    res.json(tours);
  } catch (error) {
    console.error("Tours Error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/tours/:idOrSlug", async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const client = getWixClient();
    const isNumeric = !isNaN(Number(idOrSlug));

    const result = await client.items
      .query("PilgrimagePackagesDB")
      .eq(isNumeric ? "_id" : "slug", String(idOrSlug))
      .find();

    if (result.items.length === 0) {
      return res.status(404).json({ error: "Tour not found" });
    }

    const item = result.items[0];
    res.json(mapTourItem(item));
  } catch (error) {
    console.error("Tour Detail Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// ---------------- START SERVER ----------------

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`\n✅ Backend running at http://localhost:${PORT}`);
  });
}

export default app;