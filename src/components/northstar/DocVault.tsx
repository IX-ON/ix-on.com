import React, { useState } from 'react';
import { LivingDoc } from './types';
import { 
  FileText, 
  Copy, 
  Check, 
  Download, 
  Search, 
  ShieldCheck 
} from 'lucide-react';

interface DocVaultProps {
  docs: LivingDoc[];
  initialSelectedDocRef?: string;
}

export const DocVault: React.FC<DocVaultProps> = ({ docs, initialSelectedDocRef }) => {
  const [selectedDocId, setSelectedDocId] = useState<string>(() => {
    if (initialSelectedDocRef) {
      const found = docs.find(d => d.caseRef.includes(initialSelectedDocRef));
      if (found) return found.id;
    }
    return docs[0]?.id || '';
  });

  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedDoc = docs.find(d => d.id === selectedDocId) || docs[0];

  const filteredDocs = docs.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.caseRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.standard.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopy = () => {
    if (!selectedDoc) return;
    navigator.clipboard.writeText(selectedDoc.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!selectedDoc) return;
    const blob = new Blob([selectedDoc.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedDoc.title.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#786450] uppercase tracking-wider">
            <FileText size={14} />
            <span>Automated Living Documentation Vault &bull; TRID &amp; MISMO 3.4 Standards</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#12151B] tracking-tight mt-1">
            Living Documentation Repository
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5363] mt-0.5">
            Auto-compiled, verifiable loan packages and canonical XML payloads synchronized continuously with live case pipelines.
          </p>
        </div>

        {selectedDoc && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#F8F6F1] text-[#12151B] border border-[#D9CEBF] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              {copied ? <Check size={14} className="text-emerald-700" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy Content'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-[#12151B] text-white hover:bg-[#232834] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download size={14} />
              <span>{downloadSuccess ? 'Downloaded!' : 'Export Document'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Grid: Docs List + Document Preview Pane */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Documents List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-3.5 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#786450]" />
              <input
                type="text"
                placeholder="Search document title or reference..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] placeholder-[#786450] focus:outline-hidden focus:border-[#12151B]"
              />
            </div>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredDocs.map(doc => {
              const isSelected = selectedDoc?.id === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-[#12151B] shadow-md ring-2 ring-[#12151B]/10'
                      : 'bg-[#F8F6F1]/80 hover:bg-white border-[#E5DCCF]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#786450] mb-1">
                    <span>{doc.standard}</span>
                    <span>{doc.fileSize}</span>
                  </div>
                  <h4 className="text-xs font-bold text-[#12151B] leading-snug">
                    {doc.title}
                  </h4>
                  <div className="text-[11px] text-[#4B5363] mt-1 font-mono">
                    Case: {doc.caseRef}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: High-Fidelity Code / Text Viewer (8 Cols) */}
        {selectedDoc && (
          <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5DCCF]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#786450] uppercase tracking-wider block">
                  {selectedDoc.type} &bull; {selectedDoc.standard}
                </span>
                <h3 className="text-base font-black text-[#12151B] mt-0.5">
                  {selectedDoc.title}
                </h3>
                <span className="text-xs text-[#4B5363] font-mono">
                  Ref: {selectedDoc.caseRef} &bull; Generated: {selectedDoc.generatedAt}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-[#786450] uppercase font-bold block">Document Hash</span>
                <span className="text-xs font-mono font-bold text-[#12151B] bg-[#F8F6F1] px-2 py-0.5 rounded border border-[#D9CEBF]">
                  {selectedDoc.hash}
                </span>
              </div>
            </div>

            {/* Code / Content Viewer */}
            <div className="p-4 rounded-xl bg-[#12151B] text-[#F8F6F1] font-mono text-xs leading-relaxed overflow-x-auto max-h-[520px] whitespace-pre-wrap select-all border border-[#232834]">
              {selectedDoc.content}
            </div>

            <div className="flex items-center justify-between text-xs text-[#4B5363] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck size={14} className="text-emerald-700" />
                <span>Digitally signed and archived with immutable revision ledger.</span>
              </span>
              <span className="font-mono text-[11px]">Ready for Underwriter AI Copilot</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
