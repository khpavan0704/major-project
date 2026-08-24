import { useState, useRef, useCallback } from 'react';
import { useRouter } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { useApp } from '@/store/AppContext';
import { PageHeader, Badge, Disclaimer } from '@/components/Layout';
import type { Prediction, Severity } from '@/types';
import {
  Camera, Upload, ImageIcon, X, ScanLine, CheckCircle2,
  AlertTriangle, Loader2, Leaf, Brain, FileCheck,
} from 'lucide-react';

type Phase = 'idle' | 'preview' | 'quality-check' | 'analyzing' | 'error';

function checkLeafImage(dataUrl: string): Promise<boolean> {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 96;
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext('2d');

      if (!context) {
        resolve(true);
        return;
      }

      context.drawImage(image, 0, 0, size, size);
      const pixels = context.getImageData(0, 0, size, size).data;
      let leafLikePixels = 0;

      for (let index = 0; index < pixels.length; index += 4) {
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const isGreenLeaf = green > red * 1.05 && green > blue * 1.08 && green > 45;
        const isYellowLeaf = red > blue * 1.35 && green > blue * 1.2 && red > 55 && green > 45;

        if (isGreenLeaf || isYellowLeaf) leafLikePixels += 1;
      }

      resolve(leafLikePixels / (size * size) >= 0.12);
    };
    image.onerror = () => resolve(false);
    image.src = dataUrl;
  });
}

export function DetectPage() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  const { addPrediction, profile, setCurrentPredictionId } = useApp();

  const [phase, setPhase] = useState<Phase>('idle');
  const [imageData, setImageData] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [analyzeStep, setAnalyzeStep] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      setPhase('error');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('Image is too large. Please use an image under 10 MB.');
      setPhase('error');
      return;
    }
    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result;
      if (typeof dataUrl !== 'string') {
        setError('We could not read that image. Please try another photo.');
        setPhase('error');
        return;
      }

      const looksLikeLeaf = await checkLeafImage(dataUrl);
      if (!looksLikeLeaf) {
        setError('This does not look like an arecanut leaf photo. Please upload a clear photo of one leaf.');
        setPhase('error');
        return;
      }

      setImageData(dataUrl);
      setPhase('preview');
      setError('');
    };
    reader.onerror = () => {
      setError('We could not read that image. Please try another photo.');
      setPhase('error');
    };
    reader.readAsDataURL(file);
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const reset = () => {
    setPhase('idle');
    setImageData('');
    setError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const runAnalysis = () => {
    setPhase('quality-check');
    setTimeout(() => {
      setPhase('analyzing');
      setAnalyzeStep(0);

      const steps = [
        'Validating image quality...',
        'Preprocessing leaf image...',
        'Running CNN classification...',
        'Computing confidence scores...',
        'Assessing severity...',
        'Generating advisory...',
      ];

      steps.forEach((_, i) => {
        setTimeout(() => setAnalyzeStep(i), i * 700);
      });

      setTimeout(() => {
        // Realistic DEMO prediction
        const isDiseased = Math.random() > 0.45;
        const confidence = isDiseased
          ? 0.88 + Math.random() * 0.1
          : 0.92 + Math.random() * 0.07;
        const severities: Severity[] = ['low', 'moderate', 'high', 'severe'];
        const severity: Severity = isDiseased
          ? severities[Math.floor(Math.random() * 4)]
          : 'none';

        const prediction: Prediction = {
          id: `pred-${Date.now()}`,
          date: new Date().toISOString(),
          imageData,
          result: isDiseased ? 'yellow_leaf_disease' : 'healthy',
          confidence: Math.round(confidence * 1000) / 10,
          healthyProb: Math.round((1 - confidence) * 1000) / 10,
          diseaseProb: Math.round(confidence * 1000) / 10,
          severity,
          location: `${profile.village}, ${profile.district}`,
          modelVersion: 'ArecaCare AI v1.0',
          isDemo: true,
        };

        addPrediction(prediction);
        setCurrentPredictionId(prediction.id);
        navigate(`/result/${prediction.id}`);
      }, steps.length * 700 + 400);
    }, 1500);
  };

  return (
    <div>
      <PageHeader
        title={t('detect.title')}
        subtitle={t('detect.subtitle')}
        icon={<Camera className="h-6 w-6" />}
      />

      <div className="max-w-2xl mx-auto">
        {phase === 'idle' && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="card p-8">
              <div className="grid sm:grid-cols-2 gap-4">
                <button
                  onClick={() => cameraInputRef.current?.click()}
                  className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-areca-200 p-8 transition-all hover:border-areca-400 hover:bg-areca-50"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-areca-100 text-areca-700 group-hover:scale-110 transition-transform">
                    <Camera className="h-7 w-7" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-areca-900">{t('detect.takePhoto')}</p>
                    <p className="text-xs text-areca-500 mt-1">Use your phone camera</p>
                  </div>
                </button>

                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex flex-col items-center gap-3 rounded-2xl border-2 border-dashed border-areca-200 p-8 transition-all hover:border-areca-400 hover:bg-areca-50"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-100 text-leaf-700 group-hover:scale-110 transition-transform">
                    <Upload className="h-7 w-7" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-areca-900">{t('detect.uploadImage')}</p>
                    <p className="text-xs text-areca-500 mt-1">Choose from gallery</p>
                  </div>
                </button>
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
              <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={onFileChange} />
            </div>

            <div className="card p-6">
              <h3 className="font-semibold text-areca-900 mb-3 flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-areca-600" />
                {t('detect.qualityCheck')}
              </h3>
              <ul className="space-y-2 text-sm text-areca-600">
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-leaf-600" /> Ensure the leaf is clearly visible</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-leaf-600" /> Take photo in good natural lighting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-leaf-600" /> Avoid blurry or dark images</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-leaf-600" /> Focus on a single leaf, not the whole plant</li>
              </ul>
            </div>

            <Disclaimer text={t('result.disclaimer')} />
          </div>
        )}

        {phase === 'preview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="card p-6">
              <div className="relative rounded-2xl overflow-hidden bg-areca-50">
                <img src={imageData} alt="Leaf preview" className="w-full max-h-96 object-contain" />
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-areca-600">
                <ImageIcon className="h-4 w-4" />
                <span>Leaf image ready for analysis</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={reset} className="btn-secondary flex-1">
                {t('common.cancel')}
              </button>
              <button onClick={runAnalysis} className="btn-primary flex-1">
                <Brain className="h-5 w-5" />
                {t('detect.analyze')}
              </button>
            </div>
          </div>
        )}

        {phase === 'quality-check' && (
          <div className="card p-8 text-center animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-areca-100 text-areca-700">
                  <ScanLine className="h-10 w-10 animate-pulse" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-areca-900 text-lg">{t('detect.qualityCheck')}</h3>
                <p className="text-areca-600 text-sm mt-1">Checking image clarity, lighting, and leaf visibility...</p>
              </div>
              <div className="w-full max-w-xs space-y-2">
                {['Image detected', 'Leaf region identified', 'Lighting sufficient'].map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-areca-700 animate-fade-in" style={{ animationDelay: `${i * 0.4}s` }}>
                    <Loader2 className="h-4 w-4 animate-spin text-areca-500" />
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {phase === 'analyzing' && (
          <div className="card p-8 animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden bg-areca-50 mb-6">
              <img src={imageData} alt="Analyzing" className="w-full max-h-80 object-contain opacity-90" />
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-areca-400 to-transparent animate-scan-line" style={{ top: '0%' }} />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-full bg-areca-900/70 px-4 py-2 backdrop-blur-sm">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('detect.scanning')}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {[
                'Validating image quality...',
                'Preprocessing leaf image...',
                'Running CNN classification...',
                'Computing confidence scores...',
                'Assessing severity...',
                'Generating advisory...',
              ].map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 text-sm transition-all ${
                    i <= analyzeStep ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  {i < analyzeStep ? (
                    <CheckCircle2 className="h-5 w-5 text-leaf-600" />
                  ) : i === analyzeStep ? (
                    <Loader2 className="h-5 w-5 animate-spin text-areca-600" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-areca-200" />
                  )}
                  <span className={i <= analyzeStep ? 'text-areca-800' : 'text-areca-400'}>{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs text-areca-500 mb-1.5">
                <span>{t('detect.analyzing')}</span>
                <span>{Math.min(Math.round(((analyzeStep + 1) / 6) * 100), 100)}%</span>
              </div>
              <div className="h-2 rounded-full bg-areca-100 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-areca-500 to-areca-700 transition-all duration-700"
                  style={{ width: `${Math.min(((analyzeStep + 1) / 6) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {phase === 'error' && (
          <div className="card p-8 text-center animate-fade-in">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 mx-auto mb-4">
              <AlertTriangle className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-areca-900 text-lg mb-2">Unable to analyze</h3>
            <p className="text-areca-600 text-sm mb-6">{error || t('detect.qualityFail')}</p>
            <p className="text-xs text-areca-500 mb-6">Use a clear, well-lit photo with the leaf filling most of the frame.</p>
            <button onClick={reset} className="btn-primary">
              {t('common.retry')}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Badge variant="demo">
          <Leaf className="h-3 w-3" />
          {t('common.demo')} — Real AI model integration pending
        </Badge>
      </div>
    </div>
  );
}
