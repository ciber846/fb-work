import { DesignState } from '../types';

// Cache loaded images so re-renders are instant
const imageCache = new Map<string, HTMLImageElement>();

export function loadImage(src: string): Promise<HTMLImageElement> {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = (err) => {
      console.warn('Failed to load image:', src, err);
      reject(err);
    };
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

export async function renderDesignToCanvas(
  canvas: HTMLCanvasElement,
  design: DesignState,
  scale: number = 1
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w = design.width;
  const h = design.height;

  // Set internal canvas resolution
  if (canvas.width !== w || canvas.height !== h) {
    canvas.width = w;
    canvas.height = h;
  }

  // 1. Draw Background
  const angleRad = ((design.bgGradientAngle || 135) * Math.PI) / 180;
  const halfDiagonal = Math.sqrt(w * w + h * h) / 2;
  const cx = w / 2;
  const cy = h / 2;
  const x1 = cx - Math.cos(angleRad) * halfDiagonal;
  const y1 = cy - Math.sin(angleRad) * halfDiagonal;
  const x2 = cx + Math.cos(angleRad) * halfDiagonal;
  const y2 = cy + Math.sin(angleRad) * halfDiagonal;

  const grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0, design.bgColor1 || '#0f172a');
  grad.addColorStop(1, design.bgColor2 || '#1e1b4b');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Background image if set
  if (design.bgCustomImage) {
    try {
      const bgImg = await loadImage(design.bgCustomImage);
      ctx.save();
      ctx.globalAlpha = design.bgOverlayOpacity || 0.3;
      ctx.drawImage(bgImg, 0, 0, w, h);
      ctx.restore();
    } catch {
      // Ignore background image load errors
    }
  }

  // 2. Ambient Glow Orbs & Light Accents
  if (design.showGlowEffects) {
    ctx.save();
    // Top-right glow
    const glow1 = ctx.createRadialGradient(w * 0.8, h * 0.2, 20, w * 0.8, h * 0.2, w * 0.45);
    glow1.addColorStop(0, 'rgba(236, 72, 153, 0.22)');
    glow1.addColorStop(1, 'rgba(236, 72, 153, 0)');
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, w, h);

    // Bottom-left glow
    const glow2 = ctx.createRadialGradient(w * 0.2, h * 0.8, 30, w * 0.2, h * 0.8, w * 0.45);
    glow2.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
    glow2.addColorStop(1, 'rgba(59, 130, 246, 0)');
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, w, h);

    // Subtle dark vignette at bottom for contact footer contrast
    const vignette = ctx.createLinearGradient(0, h * 0.7, 0, h);
    vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
    vignette.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, h * 0.7, w, h * 0.3);
    ctx.restore();
  }

  // 3. Product / Hero Image
  const isLandscape = design.format === 'fb_feed_landscape' || design.format === 'fb_page_cover' || design.format === 'fb_group_banner';
  const isCover = design.format === 'fb_page_cover';
  const isStory = design.format === 'ig_story_reel';

  // Position coordinates for product
  let prodCenterX = w * 0.72 + (design.productPosX / 100) * w;
  let prodCenterY = h * 0.5 + (design.productPosY / 100) * h;
  let maxProdSize = Math.min(w, h) * 0.62 * (design.productScale || 1);

  if (isCover) {
    prodCenterX = w * 0.78 + (design.productPosX / 100) * w;
    prodCenterY = h * 0.5 + (design.productPosY / 100) * h;
    maxProdSize = h * 0.82 * (design.productScale || 1);
  } else if (isStory) {
    prodCenterX = w * 0.5 + (design.productPosX / 100) * w;
    prodCenterY = h * 0.65 + (design.productPosY / 100) * h;
    maxProdSize = w * 0.75 * (design.productScale || 1);
  }

  if (design.productImage) {
    try {
      const pImg = await loadImage(design.productImage);
      ctx.save();

      const imgAspect = pImg.width / pImg.height;
      let drawW = maxProdSize;
      let drawH = maxProdSize / imgAspect;

      if (imgAspect < 1) {
        drawH = maxProdSize;
        drawW = maxProdSize * imgAspect;
      }

      const imgX = prodCenterX - drawW / 2;
      const imgY = prodCenterY - drawH / 2;

      // Drop shadow for floating product
      if (design.productShadow) {
        ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
        ctx.shadowBlur = 35;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 15;
      }

      if (design.productShape === 'circle') {
        const radius = Math.min(drawW, drawH) / 2;
        ctx.beginPath();
        ctx.arc(prodCenterX, prodCenterY, radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(pImg, imgX, imgY, drawW, drawH);
      } else if (design.productShape === 'rounded') {
        roundRect(ctx, imgX, imgY, drawW, drawH, Math.min(drawW, drawH) * 0.12);
        ctx.clip();
        ctx.drawImage(pImg, imgX, imgY, drawW, drawH);
      } else {
        ctx.drawImage(pImg, imgX, imgY, drawW, drawH);
      }

      ctx.restore();
    } catch {
      // Product image load failed, continue rendering layout
    }
  }

  // 4. Price Tag / Offer Badge
  if (design.showPriceTag && design.priceTag.trim()) {
    ctx.save();
    const tagRadius = isCover ? 38 : isStory ? 54 : 58;
    const tagX = prodCenterX + maxProdSize * 0.35;
    const tagY = prodCenterY - maxProdSize * 0.32;

    // Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 6;

    // Circle
    ctx.fillStyle = design.priceTagColor || '#eab308';
    ctx.beginPath();
    ctx.arc(tagX, tagY, tagRadius, 0, Math.PI * 2);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // Border ring
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(tagX, tagY, tagRadius - 4, 0, Math.PI * 2);
    ctx.stroke();

    // Price text lines
    ctx.fillStyle = design.priceTagTextColor || '#000000';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = design.priceTag.split('\n');
    const lineCount = lines.length;
    const baseFontSize = isCover ? 14 : isStory ? 20 : 22;

    lines.forEach((line, idx) => {
      const isLast = idx === lineCount - 1;
      const fontSize = isLast && lineCount > 1 ? baseFontSize * 1.25 : baseFontSize;
      ctx.font = `700 ${fontSize}px 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif`;
      const offset = (idx - (lineCount - 1) / 2) * (fontSize * 1.15);
      ctx.fillText(line.trim(), tagX, tagY + offset);
    });

    ctx.restore();
  }

  // 5. Left Column Content Layout
  const paddingX = isCover ? 48 : isStory ? 64 : 72;
  let currentY = isCover ? 42 : isStory ? 120 : 130;
  const contentWidth = isStory ? w - paddingX * 2 : isCover ? w * 0.6 : isLandscape ? w * 0.52 : w * 0.56;

  // Badge / Top Tag
  if (design.showBadge && design.badgeText.trim()) {
    ctx.save();
    const badgeFontSize = isCover ? 11 : isStory ? 18 : 18;
    ctx.font = `600 ${badgeFontSize}px 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif`;
    const textMetrics = ctx.measureText(design.badgeText.trim());
    const badgeW = textMetrics.width + 24;
    const badgeH = badgeFontSize + 14;

    ctx.fillStyle = design.badgeBgColor || '#e11d48';
    roundRect(ctx, paddingX, currentY, badgeW, badgeH, 6);
    ctx.fill();

    ctx.fillStyle = design.badgeTextColor || '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.fillText(design.badgeText.trim(), paddingX + 12, currentY + badgeH / 2);

    currentY += badgeH + (isCover ? 12 : 24);
    ctx.restore();
  }

  // Main Headline
  if (design.headline.trim()) {
    ctx.save();
    const headlineScale = (design.headlineSize || 44) / 44;
    const baseSize = isCover ? 28 : isStory ? 56 : 50;
    const calculatedSize = Math.round(baseSize * headlineScale);

    ctx.font = `800 ${calculatedSize}px '${design.headlineFont || 'Hind Siliguri'}', 'Plus Jakarta Sans', sans-serif`;
    ctx.fillStyle = design.headlineColor || '#ffffff';
    ctx.textBaseline = 'top';

    // Headline text shadow for pop
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;

    const lines = design.headline.split('\n');
    const lineHeight = calculatedSize * 1.25;

    lines.forEach((line) => {
      ctx.fillText(line.trim(), paddingX, currentY);
      currentY += lineHeight;
    });

    currentY += isCover ? 8 : 16;
    ctx.restore();
  }

  // Sub-headline
  if (design.subheadline.trim()) {
    ctx.save();
    const subScale = (design.subheadlineSize || 20) / 20;
    const baseSubSize = isCover ? 13 : isStory ? 24 : 21;
    const subFontSize = Math.round(baseSubSize * subScale);

    ctx.font = `500 ${subFontSize}px 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif`;
    ctx.fillStyle = design.subheadlineColor || '#cbd5e1';
    ctx.textBaseline = 'top';

    // Word wrapping for subheadline
    const words = design.subheadline.split(' ');
    let currentLine = '';
    const subLineHeight = subFontSize * 1.45;

    for (let i = 0; i < words.length; i++) {
      const testLine = currentLine + (currentLine ? ' ' : '') + words[i];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > contentWidth && i > 0) {
        ctx.fillText(currentLine, paddingX, currentY);
        currentLine = words[i];
        currentY += subLineHeight;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      ctx.fillText(currentLine, paddingX, currentY);
      currentY += subLineHeight;
    }

    currentY += isCover ? 12 : 28;
    ctx.restore();
  }

  // Call to Action Button
  if (design.showCta && design.ctaText.trim()) {
    ctx.save();
    const ctaFontSize = isCover ? 13 : isStory ? 22 : 20;
    ctx.font = `700 ${ctaFontSize}px 'Hind Siliguri', 'Plus Jakarta Sans', sans-serif`;
    const ctaMetrics = ctx.measureText(design.ctaText.trim());
    const ctaW = ctaMetrics.width + 36;
    const ctaH = ctaFontSize + 22;

    // CTA Shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 6;

    ctx.fillStyle = design.ctaBgColor || '#e11d48';
    roundRect(ctx, paddingX, currentY, ctaW, ctaH, 8);
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // CTA Text
    ctx.fillStyle = design.ctaTextColor || '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.fillText(design.ctaText.trim(), paddingX + 18, currentY + ctaH / 2);

    ctx.restore();
  }

  // 6. Footer & Brand / Contact Info Bar
  if (design.showFooter) {
    ctx.save();
    const footerY = h - (isCover ? 36 : isStory ? 70 : 64);
    const footerFontSize = isCover ? 12 : isStory ? 20 : 18;
    ctx.font = `600 ${footerFontSize}px 'Plus Jakarta Sans', 'Hind Siliguri', sans-serif`;
    ctx.fillStyle = design.footerColor || '#94a3b8';
    ctx.textBaseline = 'middle';

    let footerX = paddingX;

    // Brand Name
    if (design.brandName) {
      ctx.fillStyle = '#ffffff';
      ctx.font = `700 ${footerFontSize + 1}px 'Plus Jakarta Sans', sans-serif`;
      ctx.fillText(design.brandName, footerX, footerY);
      const bMetrics = ctx.measureText(design.brandName);
      footerX += bMetrics.width + 24;

      // Divider dot
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.arc(footerX - 12, footerY, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Phone / WhatsApp
    if (design.phone) {
      ctx.fillStyle = design.footerColor || '#cbd5e1';
      ctx.font = `600 ${footerFontSize}px 'Plus Jakarta Sans', sans-serif`;
      const phoneText = `📞 ${design.phone}`;
      ctx.fillText(phoneText, footerX, footerY);
      const pMetrics = ctx.measureText(phoneText);
      footerX += pMetrics.width + 24;

      if (design.website) {
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.arc(footerX - 12, footerY, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Website / Page Handle
    if (design.website) {
      ctx.fillStyle = design.footerColor || '#cbd5e1';
      ctx.font = `600 ${footerFontSize}px 'Plus Jakarta Sans', sans-serif`;
      const webText = `🌐 ${design.website}`;
      ctx.fillText(webText, footerX, footerY);
    }

    ctx.restore();
  }

  // 7. Facebook Cover Safe Zone Guides (Mobile vs Desktop)
  if (design.showSafeZone && isCover) {
    ctx.save();
    // Desktop: 820x312 (entire canvas)
    // Mobile visible area: Center 640 x 312
    const mobileSafeW = 640;
    const sideCropW = (w - mobileSafeW) / 2;

    // Darken side cropped areas on mobile
    ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
    ctx.fillRect(0, 0, sideCropW, h);
    ctx.fillRect(w - sideCropW, 0, sideCropW, h);

    // Guide borders
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(sideCropW, 0, mobileSafeW, h);

    // Label
    ctx.fillStyle = '#fca5a5';
    ctx.font = '700 12px sans-serif';
    ctx.fillText('MOBILE SAFE ZONE (640px)', sideCropW + 12, 20);
    ctx.fillText('Desktop Only Side Area', 10, h / 2);
    ctx.fillText('Desktop Only Side Area', w - sideCropW + 10, h / 2);

    ctx.restore();
  }

  // 8. Client Watermark (Crucial for selling designs without getting ripped off)
  if (design.showWatermark) {
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-Math.PI / 5); // Diagonal 36 degree angle

    const wmText = design.watermarkText || 'CLIENT PREVIEW • FOR APPROVAL ONLY • DO NOT COPY';
    const wmFontSize = Math.round(w * 0.045);
    ctx.font = `900 ${wmFontSize}px 'Plus Jakarta Sans', sans-serif`;

    // Repeating diagonal stripes of watermark text
    for (let row = -3; row <= 3; row++) {
      const yOffset = row * (wmFontSize * 3.5);

      // Dark shadow for visibility on light/dark backgrounds
      ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.textAlign = 'center';
      ctx.fillText(wmText, 2, yOffset + 2);

      // Bright white watermark
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillText(wmText, 0, yOffset);
    }

    ctx.restore();
  }
}
