
import React, { useState, useEffect } from 'react';
import { 
  Download, 
  RefreshCw, 
  Trash2, 
  Layout, 
  ImageIcon, 
  AlertCircle,
  History,
  Info,
  DownloadCloud,
  Sparkles,
  Palette,
  CheckCircle2,
  Code,
  Globe,
  ArrowLeftRight
} from 'lucide-react';
import { IconConfig, GeneratedIcon } from './types';
import { ICON_STYLES, COLOR_PRESETS } from './constants';
import { generateIconImage } from './services/geminiService';

const LOADING_MESSAGES = [
  "نحلل فكرة تطبيقك المبدعة...",
  "نرسل الطلب إلى Nano Banana...",
  "جاري معالجة الألوان والأنماط...",
  "تصميم الأيقونة في مراحله الأخيرة...",
  "نجهز لك ملف PNG عالي الجودة..."
];

const App: React.FC = () => {
  const [config, setConfig] = useState<IconConfig>({
    appName: '',
    description: '',
    style: 'minimalist',
    primaryColor: '#2563eb',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);
  const [currentIcon, setCurrentIcon] = useState<GeneratedIcon | null>(null);
  const [history, setHistory] = useState<GeneratedIcon[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showApiInfo, setShowApiInfo] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMsgIndex(prev => (prev + 1) % LOADING_MESSAGES.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const handleGenerate = async () => {
    if (!config.appName.trim() || !config.description.trim()) {
      setError("يرجى إدخال اسم التطبيق ووصفه أولاً.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const imageUrl = await generateIconImage(config);
      const newIcon: GeneratedIcon = {
        id: Date.now().toString(),
        url: imageUrl,
        config: { ...config },
        createdAt: Date.now(),
      };
      setCurrentIcon(newIcon);
      setHistory(prev => [newIcon, ...prev]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || "حدث خطأ. تأكد من إعداد مفتاح API على Vercel.");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromHistory = (id: string) => {
    setHistory(prev => prev.filter(icon => icon.id !== id));
    if (currentIcon?.id === id) {
      setCurrentIcon(null);
    }
  };

  const downloadIcon = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}-icon.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#FAFBFF] text-slate-900 pb-20 font-['Tajawal']">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <Sparkles size={20} />
            </div>
            <h1 className="text-xl font-black text-slate-800">مُولد الأيقونات <span className="text-indigo-600 text-sm">API</span></h1>
          </div>
          <button 
            onClick={() => setShowApiInfo(!showApiInfo)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200"
          >
            <Code size={14} />
            {showApiInfo ? 'إغلاق التعليمات' : 'استخدام n8n / API'}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pt-8">
        {/* API Info Panel */}
        {showApiInfo && (
          <div className="mb-10 bg-slate-900 rounded-[2rem] p-8 text-slate-300 animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden relative border border-white/10 shadow-2xl">
            <div className="absolute top-0 right-0 p-10 opacity-5 text-white pointer-events-none">
              <Globe size={180} />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl font-black mb-6 text-white flex items-center gap-3">
                <ArrowLeftRight size={24} className="text-indigo-400" />
                الربط الخارجي مع n8n
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                    <p className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-widest">Endpoint URL</p>
                    <code className="text-sm block bg-black/40 p-3 rounded-lg mt-1 break-all text-indigo-200">
                      https://[YOUR_DOMAIN].vercel.app/api/generate
                    </code>
                  </div>
                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                    <p className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-widest">HTTP Method</p>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-md font-bold text-sm">POST</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700">
                    <p className="text-xs font-bold text-indigo-400 mb-2 uppercase tracking-widest">Request Body (JSON)</p>
                    <pre className="text-[11px] leading-relaxed text-slate-100 font-mono bg-black/20 p-4 rounded-xl">
{`{
  "appName": "اسم التطبيق",
  "description": "وصف الوظيفة",
  "style": "3d",
  "primaryColor": "#2563eb",
  "apiKey": "مفتاح_GEMINI_الخاص_بك"
}`}
                    </pre>
                    <p className="text-[10px] text-slate-500 mt-3 italic">
                      * حقل <code className="text-slate-400 font-bold">apiKey</code> اختياري إذا كان المفتاح مسجلاً في إعدادات Vercel، وإلزامي إذا أردت إرساله من n8n.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Inputs Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                <Palette className="text-indigo-600" size={24} />
                توليد يدوي
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">اسم التطبيق</label>
                  <input
                    type="text"
                    value={config.appName}
                    onChange={(e) => setConfig(prev => ({ ...prev, appName: e.target.value }))}
                    placeholder="مثال: متجري..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500/20 text-right"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">وصف الوظيفة</label>
                  <textarea
                    rows={3}
                    value={config.description}
                    onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="ماذا يفعل التطبيق؟..."
                    className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500/20 text-right resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">النمط الفني</label>
                  <div className="grid grid-cols-2 gap-2">
                    {ICON_STYLES.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setConfig(prev => ({ ...prev, style: style.id }))}
                        className={`flex items-center gap-2 px-3 py-3 rounded-xl border text-xs font-bold transition-all ${
                          config.style === style.id
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md'
                            : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'
                        }`}
                      >
                        {style.icon}
                        {style.label.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-3">اللون المفضل</label>
                  <div className="flex flex-wrap gap-2">
                    {COLOR_PRESETS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setConfig(prev => ({ ...prev, primaryColor: color.value }))}
                        className={`w-9 h-9 rounded-full border-2 transition-all ${
                          config.primaryColor === color.value ? 'border-slate-900 scale-110 shadow-lg' : 'border-white'
                        }`}
                        style={{ backgroundColor: color.value }}
                      />
                    ))}
                  </div>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 text-red-600 text-xs font-bold rounded-2xl flex items-center gap-2">
                    <AlertCircle size={14} />
                    {error}
                  </div>
                )}

                <button
                  onClick={handleGenerate}
                  disabled={isLoading}
                  className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-black text-lg transition-all ${
                    isLoading 
                      ? 'bg-slate-100 text-slate-400'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-xl shadow-indigo-100 active:scale-95'
                  }`}
                >
                  {isLoading ? <RefreshCw className="animate-spin" /> : <Sparkles size={20} />}
                  {isLoading ? 'جاري التصميم...' : 'توليد الأيقونة'}
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[500px] relative">
              {isLoading && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center space-y-4">
                   <div className="w-20 h-20 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                   <p className="text-indigo-600 font-bold animate-pulse">{LOADING_MESSAGES[loadingMsgIndex]}</p>
                </div>
              )}

              {currentIcon ? (
                <div className="w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
                  <div className="relative group mx-auto w-fit">
                    <img 
                      src={currentIcon.url} 
                      className="w-64 h-64 md:w-80 md:h-80 rounded-[4rem] shadow-2xl border-8 border-white object-cover shadow-indigo-100"
                    />
                    <button 
                      onClick={() => downloadIcon(currentIcon.url, currentIcon.config.appName)}
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[4rem] flex items-center justify-center"
                    >
                      <Download size={48} className="text-white" />
                    </button>
                  </div>
                  <h3 className="text-2xl font-black">{currentIcon.config.appName}</h3>
                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => downloadIcon(currentIcon.url, currentIcon.config.appName)}
                      className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-indigo-600 transition-all shadow-lg flex items-center gap-2"
                    >
                      تحميل (PNG)
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ) : !isLoading && (
                <div className="text-center text-slate-300 space-y-4">
                  <ImageIcon size={100} strokeWidth={1} />
                  <p className="font-bold">أيقونتك الذكية ستظهر هنا</p>
                </div>
              )}
            </div>

            {/* History */}
            {history.length > 0 && (
              <div className="mt-12 space-y-6 animate-in slide-in-from-bottom duration-700">
                <h2 className="text-xl font-black flex items-center gap-3">
                  <History size={24} className="text-indigo-600" />
                  الأرشيف
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {history.map(icon => (
                    <div key={icon.id} className="group relative bg-white p-2 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <img 
                        src={icon.url} 
                        className="w-full aspect-square rounded-2xl object-cover cursor-pointer"
                        onClick={() => setCurrentIcon(icon)}
                      />
                      <button 
                        onClick={() => removeFromHistory(icon.id)}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="text-center mt-20 text-slate-400 text-sm py-10 border-t border-slate-100">
        مُحسن للعمل مع n8n و Vercel - نانو بنانا v3.0
      </footer>
    </div>
  );
};

export default App;
