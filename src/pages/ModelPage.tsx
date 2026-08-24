import { useI18n } from '@/i18n/I18nContext';
import { PageHeader, Badge } from '@/components/Layout';
import { DEMO_MODEL } from '@/data/demoData';
import {
  Cpu, Calendar, Database, Activity, CheckCircle2, Clock,
  Layers, GitBranch, AlertCircle,
} from 'lucide-react';

export function ModelPage() {
  const { t } = useI18n();
  const model = DEMO_MODEL;

  const metrics = [
    { label: t('admin.accuracy'), value: model.accuracy, icon: Activity },
    { label: t('admin.precision'), value: model.precision, icon: Activity },
    { label: t('admin.recall'), value: model.recall, icon: Activity },
    { label: t('admin.f1'), value: model.f1Score, icon: Activity },
  ];

  const info = [
    { icon: Cpu, label: t('model.name'), value: model.name },
    { icon: GitBranch, label: t('model.version'), value: model.version },
    { icon: Calendar, label: t('model.trainingDate'), value: model.trainingDate },
    { icon: Database, label: t('model.dataset'), value: model.datasetVersion },
  ];

  return (
    <div>
      <PageHeader
        title={t('model.title')}
        subtitle="AI model information and performance tracking"
        icon={<Cpu className="h-6 w-6" />}
        action={<Badge variant="demo">{model.status}</Badge>}
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {/* Model info card */}
        <div className="card p-6 sm:p-8 animate-scale-in">
          <div className="flex items-center gap-4 mb-6 pb-4 border-b border-areca-100">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-areca-500 to-areca-700 text-white">
              <Cpu className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-areca-900">{model.name}</h2>
              <p className="text-sm text-areca-500">Convolutional Neural Network for Arecanut Leaf Classification</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {info.map((item, i) => (
              <div key={i} className="rounded-xl bg-areca-50 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <item.icon className="h-4 w-4 text-areca-500" />
                  <p className="text-xs text-areca-500">{item.label}</p>
                </div>
                <p className="font-semibold text-areca-900">
                  {item.value || (
                    <span className="text-areca-300">— Pending</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Status */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-areca-600" />
            Status
          </h3>
          <div className="flex items-center gap-3 rounded-xl bg-earth-50 border border-earth-200 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-earth-100 text-earth-700">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-earth-800">DEMO Mode</p>
              <p className="text-sm text-earth-600">
                The model is currently running in demo mode with simulated predictions. Real TensorFlow/Keras model integration is pending.
              </p>
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-areca-600" />
            Performance Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <div key={i} className="rounded-xl border border-areca-100 p-4 text-center">
                <metric.icon className="h-5 w-5 text-areca-400 mx-auto mb-2" />
                <p className="text-xs text-areca-500 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-areca-300">—</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">{t('model.metricsUnavailable')}</p>
          </div>
        </div>

        {/* Dataset structure */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-areca-600" />
            Dataset Structure
          </h3>
          <div className="space-y-2">
            <div className="rounded-lg bg-areca-50 p-3 font-mono text-sm text-areca-700">
              dataset/
            </div>
            {['healthy/', 'yellow_leaf_disease/'].map((folder, i) => (
              <div key={i} className="rounded-lg bg-areca-50 p-3 font-mono text-sm text-areca-700 pl-8">
                ├── {folder}
              </div>
            ))}
            <div className="rounded-lg bg-earth-50 p-3 font-mono text-sm text-earth-600 pl-8 border border-earth-100">
              └── (extensible to other diseases)
            </div>
          </div>
          <p className="text-xs text-areca-500 mt-3">
            The dataset will be collected from real arecanut leaves and agricultural sources. The system is designed to support additional disease categories in the future.
          </p>
        </div>

        <div className="flex justify-center">
          <Badge variant="demo">{t('common.demo')} — Real model training and deployment pending</Badge>
        </div>
      </div>
    </div>
  );
}
