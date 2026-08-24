import { useRouter } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { useApp } from '@/store/AppContext';
import { PageHeader, Badge, Disclaimer } from '@/components/Layout';
import { getAdvisory, YELLOW_LEAF_DISEASE, HEALTHY_INFO } from '@/data/demoData';
import {
  FileText, Download, Printer, CheckCircle2, AlertTriangle,
  Calendar, MapPin, Cpu, Activity, Stethoscope, Camera, Leaf,
} from 'lucide-react';

export function PredictionDetailsPage({ predictionId }: { predictionId: string }) {
  const { t, lang } = useI18n();
  const { navigate } = useRouter();
  const { getPrediction, profile } = useApp();
  const prediction = getPrediction(predictionId);

  if (!prediction) {
    return (
      <div className="text-center py-20">
        <AlertTriangle className="h-12 w-12 text-amber-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-areca-900 mb-2">Prediction not found</h2>
        <button onClick={() => navigate('/history')} className="btn-primary mt-4">View History</button>
      </div>
    );
  }

  const isDiseased = prediction.result === 'yellow_leaf_disease';
  const diseaseInfo = isDiseased ? YELLOW_LEAF_DISEASE : HEALTHY_INFO;
  const advisory = getAdvisory(prediction.severity, isDiseased, lang);

  const handlePrint = () => window.print();

  return (
    <div>
      <PageHeader
        title="Prediction Report"
        subtitle={`ID: ${prediction.id}`}
        icon={<FileText className="h-6 w-6" />}
        action={
          <button onClick={handlePrint} className="btn-primary">
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        }
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Report header */}
        <div className="card p-6 sm:p-8 animate-scale-in">
          <div className="flex items-center justify-between border-b border-areca-100 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-areca-500 to-areca-700 text-white">
                <Leaf className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display font-bold text-areca-900">ArecaCare AI</p>
                <p className="text-xs text-areca-500">Disease Detection Report</p>
              </div>
            </div>
            {prediction.isDemo && <Badge variant="demo">{t('common.demo')}</Badge>}
          </div>

          {/* Farmer info */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs text-areca-500 mb-1">Farmer Name</p>
              <p className="font-semibold text-areca-900">{profile.name}</p>
            </div>
            <div>
              <p className="text-xs text-areca-500 mb-1">Mobile</p>
              <p className="font-semibold text-areca-900">{profile.mobile}</p>
            </div>
            <div>
              <p className="text-xs text-areca-500 mb-1">Location</p>
              <p className="font-semibold text-areca-900">{profile.village}, {profile.district}</p>
            </div>
            <div>
              <p className="text-xs text-areca-500 mb-1">Scan Date</p>
              <p className="font-semibold text-areca-900">
                {new Date(prediction.date).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-areca-50 mb-6">
            {prediction.imageData ? (
              <img src={prediction.imageData} alt="Analyzed leaf" className="w-full max-h-72 object-contain" />
            ) : (
              <div className="w-full h-48 flex items-center justify-center">
                <Camera className="h-12 w-12 text-areca-400" />
              </div>
            )}
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-areca-50">
              {isDiseased ? (
                <AlertTriangle className="h-8 w-8 text-amber-600" />
              ) : (
                <CheckCircle2 className="h-8 w-8 text-leaf-600" />
              )}
              <div>
                <p className="text-sm text-areca-600">{t('result.prediction')}</p>
                <p className={`text-xl font-bold ${isDiseased ? 'text-amber-700' : 'text-leaf-700'}`}>
                  {isDiseased ? t('common.yellowLeaf') : t('common.healthy')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-xl border border-areca-100 p-3">
                <p className="text-xs text-areca-500">{t('common.confidence')}</p>
                <p className="text-lg font-bold text-areca-900">{prediction.confidence}%</p>
              </div>
              <div className="rounded-xl border border-areca-100 p-3">
                <p className="text-xs text-areca-500">{t('result.severity')}</p>
                <p className="text-lg font-bold text-areca-900 capitalize">{prediction.severity}</p>
              </div>
              <div className="rounded-xl border border-areca-100 p-3">
                <p className="text-xs text-areca-500">{t('common.model')}</p>
                <p className="text-sm font-bold text-areca-900">{prediction.modelVersion}</p>
              </div>
              <div className="rounded-xl border border-areca-100 p-3">
                <p className="text-xs text-areca-500">Location</p>
                <p className="text-sm font-bold text-areca-900">{prediction.location}</p>
              </div>
            </div>

            {/* Probability bars */}
            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-areca-700">{t('result.healthyProb')}</span>
                  <span className="font-semibold text-areca-900">{prediction.healthyProb}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-areca-100 overflow-hidden">
                  <div className="h-full bg-leaf-500 rounded-full" style={{ width: `${prediction.healthyProb}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-areca-700">{t('result.diseaseProb')}</span>
                  <span className="font-semibold text-areca-900">{prediction.diseaseProb}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-areca-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${prediction.diseaseProb}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        {isDiseased && diseaseInfo.symptoms.length > 0 && (
          <div className="card p-6 animate-fade-in-up">
            <h3 className="font-semibold text-areca-900 mb-3 flex items-center gap-2">
              <Activity className="h-5 w-5 text-areca-600" />
              {t('common.symptoms')}
            </h3>
            <ul className="space-y-2">
              {diseaseInfo.symptoms.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-areca-700">
                  <span className="text-areca-400 mt-1">•</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Advisory */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-areca-600" />
            {t('common.advisory')}
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-semibold text-areca-800 mb-1">{t('advisory.meaning')}</p>
              <p className="text-areca-700">{advisory.meaning}</p>
            </div>
            <div>
              <p className="font-semibold text-areca-800 mb-1">{t('advisory.immediate')}</p>
              <ul className="space-y-1">
                {advisory.immediate.map((a, i) => <li key={i} className="text-areca-700">• {a}</li>)}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-areca-800 mb-1">{t('advisory.prevention')}</p>
              <ul className="space-y-1">
                {advisory.prevention.map((a, i) => <li key={i} className="text-areca-700">• {a}</li>)}
              </ul>
            </div>
            <div className="rounded-lg bg-earth-50 border border-earth-200 p-3">
              <p className="text-sm text-earth-700">{t('advisory.chemical')}</p>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <Disclaimer text={t('result.disclaimer')} />

        {/* Meta */}
        <div className="card p-4 flex flex-wrap items-center gap-4 text-xs text-areca-500">
          <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(prediction.date).toLocaleString()}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {prediction.location}</span>
          <span className="flex items-center gap-1"><Cpu className="h-3 w-3" /> {prediction.modelVersion}</span>
        </div>
      </div>
    </div>
  );
}


