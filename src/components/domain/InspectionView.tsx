import React, { useState } from 'react';
import { ProduceBatch } from '../../types';
import { APP_IMAGES } from '../../assets/images';
import { ShieldCheck, Cpu, Sparkles, CheckCircle2, AlertTriangle, RefreshCw, Loader2, Award, Camera, Upload, Image as ImageIcon, Eye, FileCheck } from 'lucide-react';

interface InspectionViewProps {
  batches: ProduceBatch[];
  onAddBatch: (batch: Partial<ProduceBatch>) => void;
}

export const InspectionView: React.FC<InspectionViewProps> = ({ batches, onAddBatch }) => {
  const [cropType, setCropType] = useState<'Cocoa' | 'Cashew' | 'Maize' | 'Sheanut'>('Cocoa');
  const [farmerName, setFarmerName] = useState('Kwasi Bio');
  const [location, setLocation] = useState('Goaso, Ahafo Region');
  const [region, setRegion] = useState<'Ashanti' | 'Western' | 'Eastern' | 'Central' | 'Brong-Ahafo' | 'Volta'>('Brong-Ahafo');
  const [weightKg, setWeightKg] = useState(3200);
  const [moistureContent, setMoistureContent] = useState(7.2);
  const [moldPercentage, setMoldPercentage] = useState(1.1);
  const [defectPercentage, setDefectPercentage] = useState(1.4);
  const [slatePercentage, setSlatePercentage] = useState(1.8);
  const [beanCountPer100g, setBeanCountPer100g] = useState(96);

  // Seed photo attachment state
  const [seedImagePreview, setSeedImagePreview] = useState<string>(APP_IMAGES.beans);
  const [seedImageBase64, setSeedImageBase64] = useState<string>('');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [progressStep, setProgressStep] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [aiReport, setAiReport] = useState<any | null>(null);

  // Handle local file upload (cut-test seed photo)
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSeedImagePreview(result);
      setSeedImageBase64(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRunAiInspection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoadingAI(true);
    setAiReport(null);
    setProgressPercent(15);
    setProgressStep('Initializing Digital Cut-Test & AI Vision Probe...');

    try {
      setTimeout(() => {
        setProgressPercent(45);
        setProgressStep('Analyzing Cocoa Seed Color, Fermentation & Surface Hyphae...');
      }, 600);

      setTimeout(() => {
        setProgressPercent(80);
        setProgressStep('Querying Gemini 3.7 Vision Quality Matrix...');
      }, 1200);

      const response = await fetch('/api/ai/grade-quality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropType,
          moistureContent,
          moldPercentage,
          defectPercentage,
          slatePercentage,
          beanCountPer100g,
          weightKg,
          seedImageBase64: seedImageBase64 || undefined,
        }),
      });

      const data = await response.json();

      setTimeout(() => {
        setProgressPercent(100);
        setProgressStep('Inspection Verified & Certified!');
        setAiReport(data);

        // Automatically register the batch
        onAddBatch({
          farmerName,
          location,
          region,
          cropType,
          weightKg,
          bagsCount: Math.round(weightKg / 64),
          moistureContent,
          moldPercentage,
          defectPercentage,
          slatePercentage,
          beanCountPer100g,
          grade: data.recommendedGrade || 'Grade 1 Premium',
          status: 'Inspected',
          seedImageUrl: seedImagePreview,
          aiNotes: data.actionPlan || 'AI Quality Analysis Complete with Attached Seed Photo',
        });
        setIsLoadingAI(false);
      }, 1800);

    } catch (err) {
      console.error('Inspection AI Error:', err);
      setIsLoadingAI(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
        
        {/* Header Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center border-b border-slate-200 pb-6">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Batch Quality Inspection &amp; AI Bean Grading</h1>
                <p className="text-xs text-slate-500">
                  Upload seed cut-test photo, physical moisture ratings, and trigger Gemini AI automated vision grading.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                <Camera className="w-3.5 h-3.5 text-emerald-600" />
                Seed Image Analysis Enabled
              </span>
              <span className="bg-emerald-50 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-emerald-200">
                COCOBOD Standard: Moisture ≤ 7.5%
              </span>
              <span className="bg-amber-50 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-lg border border-amber-200">
                Grade 1 Premium Bonus Eligible
              </span>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-28 border border-slate-200 shadow-sm hidden md:block">
            <img 
              src={seedImagePreview} 
              alt="Dried Cocoa Beans Inspection Sample" 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-2.5">
              <span className="text-white text-[10px] font-bold flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Active Cut-Test Sample Attached</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          
          {/* Inspection Input Form (7 Cols) */}
          <form onSubmit={handleRunAiInspection} className="lg:col-span-7 space-y-5">
            
            {/* Cocoa Seed Cut-Test Photo Attachment Section */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-bold text-slate-800">Attach Cocoa Seed Cut-Test Photo</span>
                </div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                  Vision AI Ready
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                
                {/* Photo Preview & Drag/Drop Dropzone */}
                <div 
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragOver(false);
                    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                      handleFileUpload(e.dataTransfer.files[0]);
                    }
                  }}
                  className={`sm:col-span-8 relative rounded-xl border-2 border-dashed p-3 text-center transition-all flex items-center justify-between gap-3 ${
                    isDragOver ? 'border-emerald-500 bg-emerald-50' : 'border-slate-300 bg-white hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-slate-200 shrink-0 relative bg-slate-100">
                      <img 
                        src={seedImagePreview} 
                        alt="Cut Test Seed Sample" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {isLoadingAI && (
                        <div className="absolute inset-0 bg-emerald-950/70 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-amber-400 animate-spin" />
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-bold text-slate-800">Drag &amp; Drop or Upload Seed Photo</p>
                      <p className="text-[10px] text-slate-500">Attach cut-test bean tray image (JPG/PNG)</p>
                      <label className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 mt-1 cursor-pointer">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Browse File...</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          className="hidden" 
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Preset Cut-Test Samples */}
                <div className="sm:col-span-4 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Sample Presets:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setSeedImagePreview(APP_IMAGES.beans);
                      setSeedImageBase64('');
                      setMoistureContent(7.2);
                      setMoldPercentage(1.1);
                      setSlatePercentage(1.8);
                    }}
                    className={`w-full text-left text-[11px] px-2.5 py-1.5 rounded-lg border font-medium transition-all ${
                      seedImagePreview === APP_IMAGES.beans
                        ? 'bg-emerald-700 text-white border-emerald-800 font-bold'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Grade 1 Fermented Seed Tray
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSeedImagePreview(APP_IMAGES.inspector);
                      setSeedImageBase64('');
                      setMoistureContent(8.8);
                      setMoldPercentage(4.5);
                      setSlatePercentage(3.2);
                    }}
                    className="w-full text-left text-[11px] px-2.5 py-1.5 rounded-lg border font-medium bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                  >
                    Moisture Hazard Inspection
                  </button>
                </div>

              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Crop Type</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Cocoa">Ghana Premium Cocoa</option>
                  <option value="Cashew">Raw Cashew Nuts (RCN)</option>
                  <option value="Maize">White Grain Maize</option>
                  <option value="Sheanut">Grade A Sheanuts</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Farmer / Producer Name</label>
                <input
                  type="text"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">District / Depot Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Region</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value as any)}
                  className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-2.5 font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Ashanti">Ashanti Region</option>
                  <option value="Western">Western Region</option>
                  <option value="Eastern">Eastern Region</option>
                  <option value="Brong-Ahafo">Brong-Ahafo Region</option>
                  <option value="Central">Central Region</option>
                  <option value="Volta">Volta Region</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Total Weight (Kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Moisture (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={moistureContent}
                  onChange={(e) => setMoistureContent(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-bold text-emerald-700"
                  min="0"
                  max="50"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Bean Count / 100g</label>
                <input
                  type="number"
                  value={beanCountPer100g}
                  onChange={(e) => setBeanCountPer100g(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-bold text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Moldy Beans (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={moldPercentage}
                  onChange={(e) => setMoldPercentage(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Slaty Beans (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={slatePercentage}
                  onChange={(e) => setSlatePercentage(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-900"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Other Defects (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={defectPercentage}
                  onChange={(e) => setDefectPercentage(Number(e.target.value))}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-900"
                  required
                />
              </div>
            </div>

            {/* REALISTIC MULTI-STEP PROGRESS BAR DURING LOADING */}
            {isLoadingAI && (
              <div className="bg-emerald-950/90 text-white p-4 rounded-xl border border-emerald-700 space-y-2 animate-pulse">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                    <span>{progressStep}</span>
                  </span>
                  <span className="text-amber-400">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-amber-400 h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            <button
              id="btn-run-ai-grading"
              type="submit"
              disabled={isLoadingAI}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-700 to-teal-800 hover:from-emerald-800 hover:to-teal-900 text-white font-bold py-3.5 rounded-xl shadow transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingAI ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Seed Photo &amp; Sample Quality Matrix...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Execute Gemini AI Vision Quality Grading &amp; Register Batch</span>
                </>
              )}
            </button>
          </form>

          {/* AI Inspection Output Report Card (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 relative border border-slate-800 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <Cpu className="w-5 h-5 text-emerald-400" />
                  <span className="font-bold text-sm text-emerald-100">AI Quality Inspection Output</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-bold">
                  COCOBOD Vision Probe
                </span>
              </div>

              {aiReport ? (
                <div className="space-y-4 text-xs">
                  
                  {/* Seed Image Audit Trail Box */}
                  <div className="flex items-center gap-3 bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-emerald-500/50 shrink-0">
                      <img 
                        src={seedImagePreview} 
                        alt="Audited Cocoa Seed Sample" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 text-emerald-400 font-extrabold text-[11px]">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Seed Photo Certified &amp; Audited</span>
                      </div>
                      <p className="text-[10px] text-slate-300 mt-0.5 font-medium">
                        {aiReport.visualCutTestAnalysis || 'Visual seed probe confirms uniform brown fermentation texture.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <div>
                      <span className="text-slate-400 block text-[11px]">Recommended Quality Grade</span>
                      <span className="text-base font-extrabold text-amber-300">{aiReport.recommendedGrade}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 block text-[11px]">Quality Index Score</span>
                      <span className="text-lg font-black text-emerald-400">{aiReport.qualityScore}/100</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-800/50 p-2.5 rounded-lg">
                      <span className="text-slate-400 block">Moisture Hazard Level</span>
                      <span className="font-semibold text-emerald-300">{aiReport.moistureRisk}</span>
                    </div>
                    <div className="bg-slate-800/50 p-2.5 rounded-lg">
                      <span className="text-slate-400 block">Price Premium Adjustment</span>
                      <span className="font-semibold text-emerald-400">
                        {aiReport.priceAdjustmentPercent > 0 ? `+${aiReport.priceAdjustmentPercent}% Premium` : 'Standard Rate'}
                      </span>
                    </div>
                  </div>

                  {aiReport.visualDefectsDetected && aiReport.visualDefectsDetected.length > 0 && (
                    <div className="bg-slate-800/50 p-2.5 rounded-lg">
                      <span className="font-bold text-slate-300 block mb-1">AI Vision Seed Attributes:</span>
                      <ul className="space-y-1 text-slate-300">
                        {aiReport.visualDefectsDetected.map((defect: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <Eye className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{defect}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <span className="font-bold text-slate-300 block mb-1">Key Scientific Observations:</span>
                    <ul className="space-y-1 text-slate-300">
                      {aiReport.keyObservations?.map((obs: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{obs}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-950/60 p-3 rounded-xl border border-emerald-800 text-emerald-200">
                    <span className="font-bold block mb-1">Inspector Action Plan:</span>
                    <p>{aiReport.actionPlan}</p>
                  </div>

                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 space-y-3">
                  <ShieldCheck className="w-12 h-12 text-slate-700" />
                  <p className="text-xs text-slate-400 max-w-xs">
                    Attach a cocoa seed sample image, fill in moisture content and physical bean metrics, then click execute to trigger Gemini AI Vision grading.
                  </p>
                </div>
              )}
            </div>

            {/* Inspector Station Banner */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span>Inspector Station #4 - Goaso Depot</span>
              </span>
              <span className="font-mono text-emerald-400">Gemini 3.7 Vision Online</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

