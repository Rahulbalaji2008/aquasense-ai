import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  FileText, 
  Download, 
  FileSpreadsheet, 
  FileCode, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  HardDrive 
} from 'lucide-react';
import { mockReports } from '../data/mockData';

export const ReportsSection: React.FC = () => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<Record<string, 'PDF' | 'Excel' | 'CSV'>>({
    'rep-1': 'PDF',
    'rep-2': 'Excel',
    'rep-3': 'CSV'
  });

  const handleDownload = (reportId: string, title: string) => {
    setDownloadingId(reportId);
    const format = selectedFormat[reportId] || 'PDF';

    setTimeout(() => {
      setDownloadingId(null);

      // Trigger Confetti Celebration Effect
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00E5FF', '#00FF9D', '#4FC3F7']
      });

      // Simulated File Download trigger
      const dummyContent = `AquaSense AI - ${title}\nExport Format: ${format}\nTimestamp: ${new Date().toISOString()}\nMonitored Aquifers: 6 sites\nAvg Water Level: 72%`;
      const blob = new Blob([dummyContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AquaSense_${title.replace(/\s+/g, '_')}.${format.toLowerCase()}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 1000);
  };

  return (
    <section id="reports" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#00E5FF]/30 text-xs font-mono text-[#00E5FF] mb-3">
            <FileText className="w-4 h-4" />
            <span>COMPLIANCE & AUDIT EXPORTS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Automated <span className="gradient-text">Hydrogeological Reports</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mt-3">
            Generate and export authenticated water balance, rainfall precipitation, and AI forecast logs for regulatory bodies and farm management.
          </p>
        </div>

        {/* Reports Download Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockReports.map((report) => {
            const currentFormat = selectedFormat[report.id] || 'PDF';
            const isDownloading = downloadingId === report.id;

            return (
              <div
                key={report.id}
                className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 relative overflow-hidden flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 font-bold uppercase">
                      {report.period} Report
                    </span>
                    <span className="text-xs text-gray-400 font-mono flex items-center gap-1">
                      <HardDrive className="w-3.5 h-3.5" /> {report.fileSize}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{report.title}</h3>

                  <div className="space-y-1.5 text-xs text-gray-400 font-mono mb-6">
                    <div className="flex items-center justify-between">
                      <span>Data Records:</span>
                      <span className="text-white font-bold">{report.recordsCount.toLocaleString()} points</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Last Generated:</span>
                      <span className="text-cyan-300">{report.lastGenerated}</span>
                    </div>
                  </div>

                  {/* Format Selector */}
                  <div className="mb-6">
                    <label className="text-xs font-mono text-gray-400 block mb-2">Export Format:</label>
                    <div className="grid grid-cols-3 gap-2 bg-[#050816] p-1.5 rounded-2xl border border-white/10">
                      {(['PDF', 'Excel', 'CSV'] as const).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => setSelectedFormat({ ...selectedFormat, [report.id]: fmt })}
                          className={`py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                            currentFormat === fmt
                              ? 'bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] shadow-sm'
                              : 'text-gray-400 hover:text-white'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownload(report.id, report.title)}
                  disabled={isDownloading}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00E5FF] to-[#00FF9D] text-[#050816] font-bold text-xs tracking-wider hover:shadow-lg hover:shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isDownloading ? (
                    <span>GENERATING {currentFormat}...</span>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>DOWNLOAD {currentFormat}</span>
                    </>
                  )}
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
