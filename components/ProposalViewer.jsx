import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';

const ProposalViewer = () => {
  const previewUrl = "https://drive.google.com/file/d/1vodPBpHGcMlfoetJjca5clxAB5sShX27/preview";
  const fullViewUrl = "https://drive.google.com/file/d/1vodPBpHGcMlfoetJjca5clxAB5sShX27/view?usp=sharing";

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-4 space-y-6">
      
      {/* Responsive Iframe Container */}
      <div className="relative w-full overflow-hidden rounded-[12px] border-2 border-slate-800 shadow-[0_0_20px_rgba(59,130,246,0.2)] bg-slate-950 aspect-[4/3] md:aspect-video lg:h-[650px]">
        <iframe
          src={previewUrl}
          className="absolute top-0 left-0 w-full h-full border-none"
          allow="autoplay"
          title="Prateek Sharma GSoC Proposal"
        ></iframe>
      </div>

      {/* High-Contrast CTA Button */}
      <a
        href={fullViewUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-blue-500/50"
      >
        <FileText className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
        <span className="text-lg">View Full Proposal</span>
        <ExternalLink className="w-4 h-4 ml-2 opacity-70" />
      </a>
      
      <p className="text-slate-400 text-sm font-medium">
        Cloud-Native Infrastructure Strategy & Architecture
      </p>
    </div>
  );
};

export default ProposalViewer;