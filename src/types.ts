export type PostFormat = 
  | 'fb_ig_square'      // 1080 x 1080
  | 'fb_feed_landscape'  // 1200 x 630
  | 'fb_page_cover'      // 820 x 312 (Safe: 640x312)
  | 'ig_story_reel'      // 1080 x 1920
  | 'fb_group_banner';   // 1920 x 1005

export interface FormatConfig {
  id: PostFormat;
  name: string;
  banglaName: string;
  width: number;
  height: number;
  aspectRatio: string;
  description: string;
  iconName: string;
}

export interface DesignState {
  // Format
  format: PostFormat;
  width: number;
  height: number;

  // Background
  bgType: 'gradient' | 'solid' | 'image';
  bgColor1: string;
  bgColor2: string;
  bgGradientAngle: number; // in degrees
  bgOverlayOpacity: number; // 0 to 1
  bgCustomImage?: string;

  // Text Content
  badgeText: string;
  badgeBgColor: string;
  badgeTextColor: string;
  showBadge: boolean;

  headline: string;
  headlineColor: string;
  headlineSize: number; // relative scaling 14 - 64
  headlineFont: string;

  subheadline: string;
  subheadlineColor: string;
  subheadlineSize: number;

  // Call to Action
  ctaText: string;
  ctaBgColor: string;
  ctaTextColor: string;
  showCta: boolean;

  // Offer / Price Tag
  priceTag: string;
  showPriceTag: boolean;
  priceTagColor: string;
  priceTagTextColor: string;

  // Contact & Brand Footer
  brandName: string;
  phone: string;
  website: string;
  footerColor: string;
  showFooter: boolean;

  // Product / Cutout Image
  productImage?: string;
  productScale: number; // 0.2 to 2
  productPosX: number; // % from center -50 to 50
  productPosY: number; // % from center -50 to 50
  productShadow: boolean;
  productShape: 'none' | 'circle' | 'rounded';

  // Client Watermark (to prevent unpaid theft before client payment)
  showWatermark: boolean;
  watermarkText: string;

  // Overlay Accents
  showSafeZone: boolean;
  showGlowEffects: boolean;
}

export interface TemplatePreset {
  id: string;
  name: string;
  category: 'E-commerce' | 'Food & Restaurant' | 'Gadget & Tech' | 'Facebook Cover' | 'Fashion' | 'Agency / Service';
  thumbnailColor: string;
  design: Partial<DesignState>;
}

export interface ClientOrder {
  id: string;
  clientName: string;
  businessName: string;
  phoneOrWhatsApp: string;
  serviceType: string;
  postCount: number;
  price: number;
  advancePaid: number;
  currency: 'BDT' | 'USD';
  deadline: string;
  status: 'Drafting' | 'In Client Review' | 'Revision' | 'Approved' | 'Delivered & Paid';
  notes: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface ClientInvoice {
  invoiceNumber: string;
  date: string;
  clientName: string;
  clientBusiness: string;
  clientPhone: string;
  items: InvoiceItem[];
  advancePaid: number;
  currency: 'BDT' | 'USD';
  paymentMethod: string;
  paymentDetails: string;
  notes: string;
}
