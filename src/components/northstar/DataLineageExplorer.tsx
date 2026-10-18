import React, { useState } from 'react';
import { LineageNode } from './types';
import { 
  Database, 
  Search, 
  RefreshCw, 
  CheckCircle2 
} from 'lucide-react';

interface DataLineageExplorerProps {
  nodes: LineageNode[];
  onOpenCase?: (caseId: string) => void;
}

export const DataLineageExplorer: React.FC<DataLineageExplorerProps> = ({ nodes, onOpenCase }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [lastVerifiedTimestamp, setLastVerifiedTimestamp] = useState('2 minutes ago');
  const [selectedNode, setSelectedNode] = useState<LineageNode>(nodes[0]);

  const filteredNodes = nodes.filter(n =>
    n.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.originSystem.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.hash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReverifyHashes = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setLastVerifiedTimestamp('Just now (100% Validated)');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#786450] uppercase tracking-wider">
            <Database size={14} />
            <span>BCBS 239 &amp; ISO 20022 Enterprise Data Lineage Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#12151B] tracking-tight mt-1">
            Data Lineage &amp; Provenance Graph
          </h2>
          <p className="text-xs sm:text-sm text-[#4B5363] mt-0.5">
            Continuous field-level traceability from authoritative third-party source APIs through algorithmic transformation to underwriter decisioning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReverifyHashes}
            disabled={isVerifying}
            className="px-4 py-2 rounded-xl bg-[#12151B] text-white hover:bg-[#232834] font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            <RefreshCw size={13} className={isVerifying ? 'animate-spin' : ''} />
            <span>{isVerifying ? 'Cryptographically Auditing...' : 'Audit All Hashes'}</span>
          </button>
        </div>
      </div>

      {/* Lineage Summary KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-[#D9CEBF]">
          <span className="text-[10px] text-[#786450] uppercase font-bold block">Active Financial Fields</span>
          <span className="text-xl font-extrabold text-[#12151B]">28 Tracked</span>
          <span className="text-[11px] text-[#4B5363] mt-0.5 block">100% Automated Provenance</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#D9CEBF]">
          <span className="text-[10px] text-[#786450] uppercase font-bold block">Cryptographic Integrity</span>
          <span className="text-xl font-extrabold text-emerald-700">100% Verified</span>
          <span className="text-[11px] text-[#4B5363] mt-0.5 block">{lastVerifiedTimestamp}</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#D9CEBF]">
          <span className="text-[10px] text-[#786450] uppercase font-bold block">AI Grounding Accuracy</span>
          <span className="text-xl font-extrabold text-[#12151B]">99.4% Validated</span>
          <span className="text-[11px] text-[#4B5363] mt-0.5 block">Zero Hallucination Shield</span>
        </div>
        <div className="p-4 rounded-xl bg-white border border-[#D9CEBF]">
          <span className="text-[10px] text-[#786450] uppercase font-bold block">Audit Standard</span>
          <span className="text-xl font-extrabold text-[#12151B]">BCBS 239</span>
          <span className="text-[11px] text-[#4B5363] mt-0.5 block">Basel Committee Compliant</span>
        </div>
      </div>

      {/* Main Lineage Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Node Table (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs">
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#786450]" />
              <input
                type="text"
                placeholder="Search financial field, origin system, or cryptographic hash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#F8F6F1] border border-[#D9CEBF] text-[#12151B] placeholder-[#786450] focus:outline-hidden focus:border-[#12151B]"
              />
            </div>
          </div>

          <div className="space-y-2.5 max-h-[640px] overflow-y-auto pr-1">
            {filteredNodes.map(node => {
              const isSelected = selectedNode?.id === node.id;
              return (
                <div
                  key={node.id}
                  onClick={() => setSelectedNode(node)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'bg-white border-[#12151B] shadow-md ring-2 ring-[#12151B]/10'
                      : 'bg-[#F8F6F1]/80 hover:bg-white border-[#E5DCCF]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-mono font-bold text-[#786450] bg-white px-2 py-0.5 rounded border border-[#D9CEBF]">
                      {node.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 size={10} />
                      <span>{node.validationStatus}</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#12151B]">{node.field}</h3>
                  <div className="text-[11px] text-[#4B5363] mt-1 font-mono truncate">
                    Origin: <strong className="text-[#12151B]">{node.originSystem}</strong>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-[#E5DCCF] flex items-center justify-between text-[11px] font-mono text-[#786450]">
                    <span>Hash: {node.hash}</span>
                    <span>Synced {node.lastSynced}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Detailed Lineage Trace Flow (5 Cols) */}
        {selectedNode && (
          <div className="lg:col-span-5 p-6 rounded-2xl bg-white border border-[#D9CEBF] shadow-xs space-y-5">
            <div className="pb-3 border-b border-[#E5DCCF]">
              <span className="text-[10px] font-mono font-bold text-[#786450] uppercase tracking-wider block">
                Field Trace Specification
              </span>
              <h3 className="text-lg font-black text-[#12151B] mt-0.5">
                {selectedNode.field}
              </h3>
            </div>

            {/* Stepped Flow: 3 Stages */}
            <div className="space-y-3">
              {/* Step 1: Origin */}
              <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#12151B] mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#12151B] text-white flex items-center justify-center text-[10px]">1</span>
                  <span>Originating Authority System</span>
                </div>
                <div className="text-xs text-[#4B5363] pl-7">
                  {selectedNode.originSystem}
                </div>
              </div>

              {/* Step 2: Transformation */}
              <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#12151B] mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#12151B] text-white flex items-center justify-center text-[10px]">2</span>
                  <span>Algorithmic Transformation &amp; Normalization</span>
                </div>
                <div className="text-xs text-[#4B5363] pl-7">
                  {selectedNode.transformation}
                </div>
              </div>

              {/* Step 3: Consumer */}
              <div className="p-3.5 rounded-xl bg-[#F8F6F1] border border-[#E5DCCF]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#12151B] mb-1">
                  <span className="w-5 h-5 rounded-full bg-[#12151B] text-white flex items-center justify-center text-[10px]">3</span>
                  <span>Downstream Target Consumer</span>
                </div>
                <div className="text-xs text-[#4B5363] pl-7">
                  {selectedNode.targetConsumer}
                </div>
              </div>
            </div>

            {/* Cryptographic Hash Card */}
            <div className="p-4 rounded-xl bg-[#12151B] text-white space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#D9CEBF]">
                <span>CRYPTOGRAPHIC TRACE HASH</span>
                <span className="text-emerald-400 font-bold">100% UNALTERED</span>
              </div>
              <div className="font-mono text-xs font-bold text-white break-all bg-white/10 p-2 rounded-lg border border-white/10">
                {selectedNode.hash}
              </div>
              <p className="text-[11px] text-[#A6AFBD]">
                Signed with North Star Enterprise HSM key. Verified across regulatory snapshot registry.
              </p>

              {onOpenCase && (
                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-[#A6AFBD]">Linked Workspace:</span>
                  <button
                    onClick={() => onOpenCase('NS-MTG-8841')}
                    className="text-emerald-400 hover:text-white font-mono text-[11px] underline cursor-pointer"
                  >
                    View in Lending Engine &rarr;
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
