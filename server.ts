import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialize Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// AI Copy & Social Media Post Concept Generator
app.post('/api/generate-copy', async (req, res) => {
  try {
    const { niche, topic, offer, platform, tone, language } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `You are a world-class social media marketing copywriter and graphic design creative director specializing in Facebook, Instagram, banners, and covers for commercial clients and e-commerce brands.
Respond with valid JSON matching this schema:
{
  "headline": "Short, punchy main banner headline (max 6-8 words)",
  "subheadline": "Secondary supporting line highlighting value or offer (max 10-12 words)",
  "badgeText": "Short badge/ribbon text (e.g. '৫০% ছাড়', 'SPECIAL OFFER', 'FREE SHIPPING')",
  "ctaText": "Direct call to action (e.g. 'অর্ডার করতে ইনবক্স করুন', 'Shop Now', 'Call Now')",
  "fullCaption": "Complete ready-to-post engaging caption formatted with emojis, bullet points, contact placeholders, and hashtags",
  "recommendedColors": ["Primary Hex", "Accent Hex", "Background Hex"],
  "designTips": "1-2 sentences with advice on typography, image placement, and visual hierarchy for this specific post"
}`;

    const userPrompt = `Generate a high-converting social media design copy and caption:
- Platform: ${platform || 'Facebook & Instagram'}
- Business Niche / Industry: ${niche || 'E-commerce'}
- Topic / Product: ${topic || 'New Arrival / Discount Offer'}
- Specific Offer / Discount: ${offer || 'Special Discount'}
- Language: ${language || 'Bengali with English key terms'}
- Tone: ${tone || 'Persuasive & Exciting'}

Make the headline and badge extremely attractive for a banner graphic. Provide the output in strict JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const outputText = response.text || '{}';
    const parsed = JSON.parse(outputText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/generate-copy:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate copy',
    });
  }
});

// AI Client Pitch & Sales Proposal Generator
app.post('/api/generate-pitch', async (req, res) => {
  try {
    const { clientName, businessType, postCount, price, currency, platformTarget, language } = req.body;
    const ai = getGeminiClient();

    const systemPrompt = `You are an expert freelance social media designer and agency sales closer.
You help designers sell their Facebook/Instagram post, banner, and cover design services directly to business owners and clients.
Respond with valid JSON:
{
  "coldPitch": "A polite, high-converting cold outreach message (WhatsApp/Messenger/Email) pitching social media post design package",
  "valueBullets": ["Benefit 1 why professional design increases their sales", "Benefit 2", "Benefit 3"],
  "pricingProposal": "Professional pricing quote breakdown for the client",
  "followUpMessage": "Gentle follow-up message if the client doesn't reply in 24 hours",
  "closingOffer": "Special closing incentive (e.g. 1 free cover banner or free revisions) to close deal today"
}`;

    const userPrompt = `Generate client sales pitch messages:
- Client / Brand Name: ${clientName || 'Valued Business Owner'}
- Business Type: ${businessType || 'Retail / Restaurant / E-commerce'}
- Deliverables: ${postCount || '10 Custom Social Media Posts + 1 Facebook Cover Banner'}
- Quoted Price: ${price || '3000'} ${currency || 'BDT'}
- Primary Platforms: ${platformTarget || 'Facebook Page & Instagram Profile'}
- Language: ${language || 'Bengali / Banglish'}

Make it respectful, professional, focus on how great graphics increase their sales and trust, and make it easy to copy-paste.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const outputText = response.text || '{}';
    const parsed = JSON.parse(outputText);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error in /api/generate-pitch:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate client pitch',
    });
  }
});

// Start server with Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
