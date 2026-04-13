import React from 'react';
import { FileText, Download, ShieldCheck } from 'lucide-react';

const ResumeViewer = () => {
  // Preview and View links for Pratik's Resume
  const resumePreviewUrl = "https://drive.google.com/file/d/1NtK1bvGuTKjbf2Pq_UUzSlxwf0-An9o-/preview";
  const resumeDownloadUrl = "https://drive.google.com/file/d/1NtK1bvGuTKjbf2Pq_UUzSlxwf0-An9o-/view?usp=sharing";

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-5xl mx-auto p-6 space-y-8">
      
      {/* Header Info */}
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Professional Resume
        </h2>
        <div className="flex items-center justify-center text-slate-400 text-sm gap-2">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>Verified by Google Search Index</span>
        </div>
      </div>

      {/* Responsive Iframe Container for Resume */}
      <div className="relative w-full overflow-hidden rounded-[16px] border border-slate-700 shadow-[0_0_30px_rgba(139,92,246,0.15)] bg-slate-900 aspect-[1/1.414] md:h-[800px] group">
        <iframe
          src={resumePreviewUrl}
          className="absolute top-0 left-0 w-full h-full border-none grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
          allow="autoplay"
          title="Prateek Sharma Official Resume"
        ></iframe>
      </div>

      {/* Action Button for Resume */}
      <div className="flex flex-col items-center gap-4">
        <a
          href={resumeDownloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-br from-purple-600 to-blue-700 rounded-2xl hover:scale-105 hover:shadow-[0_0_25px_rgba(79,70,229,0.4)] active:scale-95"
        >
          <Download className="w-6 h-6 mr-3 animate-bounce" />
          <span className="text-xl">Download Full CV</span>
        </a>
        
        <p className="text-slate-500 text-xs uppercase tracking-[0.2em]">
          Infrastructure Cloud Architect | Core Contributor
        </p>
      </div>
    </div>
  );
};

export default ResumeViewer;