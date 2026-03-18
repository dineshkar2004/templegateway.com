# Temple Gateway

## Overview
Temple Gateway is a spiritual platform designed to serve as a comprehensive database for temples and a pilgrimage tour service. It bridges the gap between technology and tradition by helping devotees discover temples, plan spiritual journeys, and access daily cultural and astrological insights.

The platform is built using modern web technologies to ensure a seamless, responsive, and visually engaging user experience. It uses a **custom Express.js backend** to interface with **Wix CMS** for highly scalable and user-friendly content management.

## Key Features

### Comprehensive Temple Database
- Explore a curated list of temples with historical significance
- View deity information, temple timings, and location details
- Search and filter temples by location, deity, or region

### Spiritual Tour Management
- Complete pilgrimage tour booking interface
- Detailed itineraries and package pricing
- Organized spiritual travel planning for devotees

### Unique Feature: Dynamic Cultural Panchangam
- Unlike static calendars, Temple Gateway provides a real-time Panchangam
- Calculates Tithi, Nakshatra, Yogam, and auspicious timings dynamically
- Personalized based on user date and location
- Powered by astronomy and mathematical calculation libraries

### Content Management via Wix CMS
- Fully integrated with Wix CMS for secure and easy content handling
- Seamless admin operations to add or update temples without touching code
- Manage tour packages and website content dynamically via Wix dashboard
- Express.js backend proxies the Wix API for reliable and custom data fetching

## Tech Stack

### Frontend
- **Framework:** React with Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn/UI
- **Icons:** Lucide React
- **Astrology Engine:** Custom astronomy (`astronomy-engine`) and mathematical integrations

### Backend & CMS
- **Server:** Node.js with Express.js
- **CMS Integration:** Wix SDK (`@wix/sdk`, `@wix/data`)
- **API Architecture:** RESTful endpoints for Temples and Tours

## Getting Started

### Prerequisites

Make sure you have installed:
- Node.js (v18 or higher recommended)
- npm or yarn

### Environment Variables
Create a `.env` file in the root directory and add your Wix credentials:
```env
WIX_API_KEY=your_wix_api_key
WIX_SITE_ID=your_wix_site_id
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/temple-gateway.git
cd temple-gateway
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start development server (Frontend + Backend concurrently)
```bash
npm run dev
# or
yarn dev
```
The server will start on `localhost:3001` and the Vite frontend on `localhost:5173` (or whichever port Vite provides).

## Vision
Temple Gateway aims to become a digital bridge between devotion and discovery, helping devotees reconnect with ancient traditions while using modern technology for convenience.