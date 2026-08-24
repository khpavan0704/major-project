import { useRouter } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { useApp } from '@/store/AppContext';
import { PageHeader, Badge, Disclaimer } from '@/components/Layout';
import { ProgressRing } from '@/components/Charts';
import {
  CheckCircle2, AlertTriangle, Brain, Stethoscope, Camera,
  Volume2, Download, Scan, ArrowRight, Cpu, Activity,
} from 'lucide-react';
import type { Severity } from '@/types';

const severityConfig: Record<Severity, { label: string; color: string; bg: string }> = {
  none: { label: '—', color: 'text-areca-600', bg: 'bg-areca-100' },
  low: { label: 'Low', color: 'text-leaf-700', bg: 'bg-leaf-100' },
  moderate: { label: 'Moderate', color: 'text-amber-700', bg: 'bg-amber-100' },
  high: { label: 'High', color: 'text-orange-700', bg: 'bg-orange-100' },
  severe: { label: 'Severe', color: 'text-red-700', bg: 'bg-red-100' },
};

export function ResultPage({ predictionId }: { predictionId: string }) {
  const { t } = useI18n();
  const { navigate } = useRouter();
  const { getPrediction } = useApp();
  const prediction = getPrediction(predictionId);

  if (!prediction) {
    return (
      <div className="text-center py-20">
        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-areca-900 mb-2">Prediction not found</h2>
        <button onClick={() => navigate('/history')} className="btn-primary mt-4">
          View History
        </button>
      </div>
    );
  }

  const isDiseased = prediction.result === 'yellow_leaf_disease';
  const isHealthy = prediction.result === 'healthy';
  const sev = severityConfig[prediction.severity];

  const speak = () => {
    if ('speechSynthesis' in window) {
      const text = isHealthy
        ? `Prediction: Healthy Arecanut Leaf. Confidence: ${prediction.confidence} percent.`
        : `Prediction: Yellow Leaf Disease. Confidence: ${prediction.confidence} percent. Severity: ${sev.label}.`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div>
      <PageHeader
        title={t('result.title')}
        icon={<Brain className="h-6 w-6" />}
        action={
          <button onClick={() => navigate('/detect')} className="btn-secondary">
            <Camera className="h-4 w-4" />
            {t('common.scan')}
          </button>
        }
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Result Card */}
        <div className={`card p-6 sm:p-8 animate-scale-in border-l-4 ${isHealthy ? 'border-l-leaf-500' : 'border-l-amber-500'}`}>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Image with heatmap overlay */}
            <div className="relative w-full sm:w-64 shrink-0 rounded-2xl overflow-hidden bg-areca-50">
              {prediction.imageData ? (
                <img src={prediction.imageData} alt="Analyzed leaf" className="w-full h-56 object-cover" />
              ) : (
                <div className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-areca-100 to-areca-200">
                  <Camera className="h-12 w-12 text-areca-400" />
                </div>
              )}
              {/* AI Attention overlay */}
              {isDiseased && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 h-16 w-16 rounded-full bg-amber-400/40 blur-xl" />
                  <div className="absolute bottom-1/3 right-1/4 h-20 w-20 rounded-full bg-amber-500/40 blur-xl" />
                  <div className="absolute top-1/2 left-1/2 h-12 w-12 rounded-full bg-orange-400/30 blur-lg" />
                </div>
              )}
              <div className="absolute bottom-2 left-2">
                <Badge variant="demo">
                  <Cpu className="h-3 w-3" />
                  {t('common.demo')}
                </Badge>
              </div>
            </div>

            {/* Result details */}
            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                {isHealthy ? (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-leaf-100 text-leaf-700">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <AlertTriangle className="h-7 w-7" />
                  </div>
                )}
                <div>
                  <p className="text-sm text-areca-600">{t('result.prediction')}</p>
                  <h2 className={`text-xl font-bold ${isHealthy ? 'text-leaf-700' : 'text-amber-700'}`}>
                    {isHealthy ? t('result.healthyTitle') : t('result.diseaseTitle')}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="rounded-xl bg-areca-50 p-3">
                  <p className="text-xs text-areca-600">{t('common.confidence')}</p>
                  <p className="text-2xl font-bold text-areca-900">{prediction.confidence}%</p>
                </div>
                <div className="rounded-xl bg-areca-50 p-3">
                  <p className="text-xs text-areca-600">{t('result.severity')}</p>
                  <p className={`text-lg font-bold ${sev.color}`}>{sev.label}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 text-xs text-areca-500">
                <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> {prediction.modelVersion}</span>
                <span>•</span>
                <span>{new Date(prediction.date).toLocaleDateString()}</span>
                <span>•</span>
                <span>{prediction.location}</span>
              </div>

              <button onClick={speak} className="btn-ghost mt-4 text-sm">
                <Volume2 className="h-4 w-4" />
                {t('common.listen')}
              </button>
            </div>
          </div>
        </div>

        {/* Confidence Visualization */}
        <div className="card p-6 sm:p-8 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-6 flex items-center gap-2">
            <Activity className="h-5 w-5 text-areca-600" />
            Confidence Score Breakdown
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="shrink-0">
              <ProgressRing
                value={prediction.confidence}
                size={140}
                color={isHealthy ? '#56c234' : '#b5853f'}
              >
                <span className="text-3xl font-bold text-areca-900">{prediction.confidence}%</span>
                <span className="text-xs text-areca-600">{t('common.confidence')}</span>
              </ProgressRing>
            </div>

            <div className="flex-1 w-full space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-areca-700">{t('result.healthyProb')}</span>
                  <span className="text-sm font-bold text-areca-900">{prediction.healthyProb}%</span>
                </div>
                <div className="h-3 rounded-full bg-areca-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-leaf-400 to-leaf-600 rounded-full transition-all duration-1000"
                    style={{ width: `${prediction.healthyProb}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-areca-700">{t('result.diseaseProb')}</span>
                  <span className="text-sm font-bold text-areca-900">{prediction.diseaseProb}%</span>
                </div>
                <div className="h-3 rounded-full bg-areca-100 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full transition-all duration-1000"
                    style={{ width: `${prediction.diseaseProb}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Attention Visualization */}
        <div className="card p-6 sm:p-8 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-2 flex items-center gap-2">
            <Brain className="h-5 w-5 text-areca-600" />
            {t('result.attention')}
          </h3>
          <p className="text-sm text-areca-600 mb-4">{t('result.attentionDesc')}</p>

          <div className="relative rounded-2xl overflow-hidden bg-areca-50">
            {prediction.imageData ? (
              <img src={prediction.imageData} alt="Attention" className="w-full max-h-80 object-contain" />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-areca-100 to-areca-200">
                <Camera className="h-12 w-12 text-areca-400" />
              </div>
            )}
            {isDiseased && (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 h-20 w-20 rounded-full bg-amber-400/40 blur-2xl animate-pulse-soft" />
                <div className="absolute bottom-1/3 right-1/4 h-24 w-24 rounded-full bg-orange-400/40 blur-2xl animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 left-1/2 h-16 w-16 rounded-full bg-red-400/30 blur-xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
              </div>
            )}
          </div>
        </div>

        {/* AI Explanation */}
        <div className="card p-6 sm:p-8 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-3">{t('result.explanation')}</h3>
          <p className="text-areca-700 leading-relaxed">
            {isHealthy
              ? `The AI model analyzed the leaf image and found no significant indicators of Yellow Leaf Disease. The leaf shows normal green coloration and healthy structure. The model is ${prediction.confidence}% confident in this assessment. Continue regular monitoring to maintain palm health.`
              : `The AI model detected visual patterns consistent with Yellow Leaf Disease. The highlighted regions in the attention visualization show areas of yellowing and chlorosis that influenced the prediction. With ${prediction.confidence}% confidence, the model classifies this as a ${sev.label.toLowerCase()} case. The severity assessment is based on the extent and intensity of discoloration observed. Please consult the advisory for recommended actions.`}
          </p>
        </div>

        {/* Disclaimer */}
        <Disclaimer text={t('result.disclaimer')} />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate(`/advisory/${prediction.id}`)}
            className="btn-primary flex-1"
          >
            <Stethoscope className="h-5 w-5" />
            {t('common.advisory')}
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={() => navigate(`/prediction/${prediction.id}`)}
            className="btn-secondary flex-1"
          >
            <Download className="h-5 w-5" />
            {t('common.generateReport')}
          </button>
          <button
            onClick={() => navigate('/detect')}
            className="btn-secondary flex-1"
          >
            <Scan className="h-5 w-5" />
            Scan Another
          </button>
        </div>
      </div>
    </div>
  );
}
