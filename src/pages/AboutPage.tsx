import { Link } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { PageHeader, Badge } from '@/components/Layout';
import {
  Info, Camera, Brain, Stethoscope, History, Globe,
  ShieldCheck, Database, CloudSun, Cpu, ArrowRight, Leaf,
  Layers, Server, Lock,
} from 'lucide-react';

export function AboutPage() {
  const { t } = useI18n();

  const features = [
    { icon: Camera, title: 'AI Disease Detection', desc: 'Image-based classification of Arecanut Yellow Leaf Disease with confidence scoring and severity assessment.' },
    { icon: Stethoscope, title: 'Farmer Advisory Engine', desc: 'Personalized advisories based on disease result, severity, location, and weather conditions.' },
    { icon: History, title: 'Prediction History', desc: 'Complete scan history with images, reports, and downloadable PDF summaries.' },
    { icon: Globe, title: 'Kannada Localization', desc: 'Full bilingual support (English / Kannada) for regional accessibility.' },
    { icon: CloudSun, title: 'Weather-Aware Tips', desc: 'Weather-based farming recommendations integrated with disease advisory.' },
    { icon: ShieldCheck, title: 'Scientific Disclaimer', desc: 'Every prediction includes a clear disclaimer for responsible decision-support use.' },
  ];

  const architecture = [
    { icon: Camera, label: 'Frontend', desc: 'React + TypeScript + Tailwind CSS' },
    { icon: Server, label: 'Backend (Future)', desc: 'Python FastAPI REST API' },
    { icon: Brain, label: 'AI Model (Future)', desc: 'TensorFlow / Keras CNN classifier' },
    { icon: Database, label: 'Database (Future)', desc: 'MySQL with 7 relational tables' },
    { icon: Lock, label: 'Security', desc: 'JWT auth, password hashing, input validation' },
    { icon: Layers, label: 'Dataset', desc: 'healthy / yellow_leaf_disease / extensible' },
  ];

  const apiEndpoints = [
    'POST /api/auth/register',
    'POST /api/auth/login',
    'POST /api/predictions/analyze',
    'GET /api/predictions/history',
    'GET /api/predictions/{id}',
    'GET /api/advisories/{disease}',
    'GET /api/diseases',
    'GET /api/weather',
    'GET /api/profile',
  ];

  return (
    <div>
      <PageHeader
        title={t('about.title')}
        subtitle="AI-powered Arecanut Yellow Leaf Disease detection and farmer advisory platform"
        icon={<Info className="h-6 w-6" />}
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Overview */}
        <div className="card p-6 sm:p-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-areca-500 to-areca-700 text-white">
              <Leaf className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-areca-900">ArecaCare AI</h2>
          </div>
          <p className="text-areca-700 leading-relaxed mb-3">
            ArecaCare AI is an advanced agricultural technology platform designed specifically for arecanut farmers. It leverages deep learning image classification to detect Yellow Leaf Disease — one of the most serious conditions affecting arecanut palms — and provides farmer-friendly advisory for timely action.
          </p>
          <p className="text-areca-700 leading-relaxed">
            The platform is built as a production-ready prototype with realistic demo predictions, clearly labeled as DEMO, and is designed for seamless integration with a Python FastAPI backend and a trained TensorFlow/Keras CNN model in the future.
          </p>
        </div>

        {/* Features */}
        <div>
          <h2 className="text-xl font-bold text-areca-900 mb-4">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="card card-hover p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-areca-100 text-areca-700 shrink-0">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-areca-900 mb-1">{f.title}</h3>
                    <p className="text-sm text-areca-600">{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div>
          <h2 className="text-xl font-bold text-areca-900 mb-4">System Architecture</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {architecture.map((a, i) => (
              <div key={i} className="card p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-earth-100 text-earth-700 mb-3">
                  <a.icon className="h-5 w-5" />
                </div>
                <p className="text-xs text-areca-500">{a.label}</p>
                <p className="text-sm font-semibold text-areca-800">{a.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* API Endpoints */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
            <Server className="h-5 w-5 text-areca-600" />
            Planned API Endpoints
          </h3>
          <div className="space-y-2">
            {apiEndpoints.map((ep, i) => (
              <div key={i} className="flex items-center gap-2 rounded-lg bg-areca-50 px-3 py-2 font-mono text-sm text-areca-700">
                <ArrowRight className="h-3.5 w-3.5 text-areca-400" />
                {ep}
              </div>
            ))}
          </div>
        </div>

        {/* Database tables */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
            <Database className="h-5 w-5 text-areca-600" />
            Database Schema (MySQL — Future)
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {['users', 'farmer_profiles', 'predictions', 'prediction_images', 'disease_information', 'advisories', 'model_versions'].map((table, i) => (
              <div key={i} className="rounded-lg border border-areca-200 px-3 py-2 font-mono text-sm text-areca-700 bg-areca-50">
                {table}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-areca-700 to-areca-900 p-8 text-center animate-fade-in-up">
          <Cpu className="h-10 w-10 text-areca-300 mx-auto mb-3" />
          <h3 className="text-xl font-bold text-white mb-2">Ready to try the demo?</h3>
          <p className="text-areca-100 text-sm mb-5 max-w-md mx-auto">
            Experience the full workflow from leaf photo to farmer advisory with realistic demo predictions.
          </p>
          <Link to="/detect" className="btn bg-white text-areca-800 px-6 py-3 hover:bg-areca-50">
            <Camera className="h-5 w-5" />
            Start Detection
          </Link>
        </div>

        <div className="flex justify-center">
          <Badge variant="demo">{t('common.demo')} Prototype — Backend integration pending</Badge>
        </div>
      </div>
    </div>
  );
}
