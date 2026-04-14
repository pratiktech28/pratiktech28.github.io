import React from 'react';

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

      <p className="text-slate-400 text-sm font-medium">
        Cloud-Native Infrastructure Strategy & Architecture
      </p>
    </div>
  );
};

export default ProposalViewer;
