import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CanvasEditor } from './components/CanvasEditor';
import { ControlPanel } from './components/ControlPanel';
import { ClientMockupView } from './components/ClientMockupView';
import { OrderTracker } from './components/OrderTracker';
import { InvoiceBuilder } from './components/InvoiceBuilder';
import { SellingGuideModal } from './components/SellingGuideModal';
import { AICopywriterModal } from './components/AICopywriterModal';
import { DesignState, PostFormat, TemplatePreset } from './types';
import { FORMAT_PRESETS, INITIAL_DESIGN } from './data/templates';
import { renderDesignToCanvas } from './utils/canvasRenderer';
import confetti from 'canvas-confetti';

export default function App() {
  const [activeTab, setActiveTab] = useState<'studio' | 'mockup' | 'ai' | 'orders' | 'invoice' | 'guide'>('studio');
  const [design, setDesign] = useState<DesignState>(INITIAL_DESIGN);
  const [isAICopyOpen, setIsAICopyOpen] = useState<boolean>(false);

  const handleUpdateDesign = (updater: Partial<DesignState> | ((prev: DesignState) => DesignState)) => {
    setDesign((prev) => {
      if (typeof updater === 'function') {
        return updater(prev);
      }
      return { ...prev, ...updater };
    });
  };

  const handleSelectFormat = (format: PostFormat) => {
    const config = FORMAT_PRESETS.find((f) => f.id === format);
    if (!config) return;
    setDesign((prev) => ({
      ...prev,
      format,
      width: config.width,
      height: config.height,
      // Adjust default headline size for cover vs square
      headlineSize: format === 'fb_page_cover' ? 28 : 44,
      subheadlineSize: format === 'fb_page_cover' ? 13 : 20,
    }));
  };

  const handleToggleWatermark = () => {
    setDesign((prev) => ({ ...prev, showWatermark: !prev.showWatermark }));
  };

  const handleApplyTemplate = (template: TemplatePreset) => {
    const formatConfig = FORMAT_PRESETS.find((f) => f.id === template.design.format) || FORMAT_PRESETS[0];
    setDesign((prev) => ({
      ...prev,
      ...template.design,
      width: formatConfig.width,
      height: formatConfig.height,
    }));
  };

  const handleExportPNG = (withWatermark: boolean) => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#a855f7', '#ec4899', '#f59e0b']
    });

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = design.width;
    tempCanvas.height = design.height;

    const downloadDesign: DesignState = {
      ...design,
      showWatermark: withWatermark,
    };

    renderDesignToCanvas(tempCanvas, downloadDesign).then(() => {
      const link = document.createElement('a');
      const suffix = withWatermark ? '_CLIENT_PREVIEW' : '_FINAL_HIGHRES';
      const cleanBrand = (design.brandName || 'Post').replace(/\s+/g, '_');
      link.download = `${design.format}_${cleanBrand}${suffix}.png`;
      link.href = tempCanvas.toDataURL('image/png', 1.0);
      link.click();
    });
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'ai') {
            setIsAICopyOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        currentFormat={design.format}
        onSelectFormat={handleSelectFormat}
        onExportPNG={handleExportPNG}
        isWatermarked={design.showWatermark}
        onToggleWatermark={handleToggleWatermark}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 flex overflow-hidden relative">
        {activeTab === 'studio' && (
          <div className="flex-1 flex flex-col lg:flex-row h-full w-full overflow-hidden">
            <CanvasEditor
              design={design}
              onUpdateDesign={handleUpdateDesign}
              onOpenAICopy={() => setIsAICopyOpen(true)}
            />
            <ControlPanel
              design={design}
              onUpdateDesign={handleUpdateDesign}
              onApplyTemplate={handleApplyTemplate}
              onOpenAICopy={() => setIsAICopyOpen(true)}
            />
          </div>
        )}

        {activeTab === 'mockup' && (
          <ClientMockupView
            design={design}
            onUpdateDesign={handleUpdateDesign}
            onSwitchToStudio={() => setActiveTab('studio')}
            onOpenAICopy={() => setIsAICopyOpen(true)}
          />
        )}

        {activeTab === 'orders' && (
          <OrderTracker onSwitchToInvoice={() => setActiveTab('invoice')} />
        )}

        {activeTab === 'invoice' && <InvoiceBuilder />}

        {activeTab === 'guide' && <SellingGuideModal />}
      </main>

      {/* AI Copy & Pitch Modal */}
      <AICopywriterModal
        design={design}
        onApplyToCanvas={handleUpdateDesign}
        isOpen={isAICopyOpen}
        onClose={() => setIsAICopyOpen(false)}
      />
    </div>
  );
}
