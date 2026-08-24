import { Link } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { Badge } from '@/components/Layout';
import {
  Camera, Brain, Search, Stethoscope, History, Globe,
  Leaf, ArrowRight, ShieldCheck, Sparkles, ScanLine, Microscope,
} from 'lucide-react';

const HERO_IMG = 'https://images.pexels.com/photos/6876971/pexels-photo-6876971.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const FARMER_IMG = 'https://images.pexels.com/photos/16678079/pexels-photo-16678079.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
const LEAF_IMG = 'https://images.pexels.com/photos/8458248/pexels-photo-8458248.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export function LandingPage() {
  const { t } = useI18n();

  const steps = [
    { icon: Camera, title: t('landing.how.step1'), desc: 'Take a clear photo of the arecanut leaf using your phone camera or upload an existing image.', color: 'bg-areca-100 text-areca-700' },
    { icon: Brain, title: t('landing.how.step2'), desc: 'The AI model analyzes the leaf image, checking quality and extracting visual features.', color: 'bg-leaf-100 text-leaf-700' },
    { icon: Search, title: t('landing.how.step3'), desc: 'Get instant results: Healthy or Yellow Leaf Disease, with confidence score and severity.', color: 'bg-earth-100 text-earth-700' },
    { icon: Stethoscope, title: t('landing.how.step4'), desc: 'Receive farmer-friendly advisory with symptoms, actions, prevention, and monitoring tips.', color: 'bg-areca-100 text-areca-700' },
  ];

  const features = [
    { icon: Brain, title: 'AI Detection', desc: 'Deep learning-based image classification for accurate Yellow Leaf Disease identification with confidence scoring.' },
    { icon: Stethoscope, title: 'Farmer Advisory', desc: 'Personalized, easy-to-understand advisory based on disease result, severity, and field conditions.' },
    { icon: History, title: 'Prediction History', desc: 'Every scan is saved with full details, images, and downloadable reports for ongoing monitoring.' },
    { icon: Globe, title: 'Regional Language Support', desc: 'Full Kannada localization so farmers can use the app in their preferred language.' },
  ];

  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Arecanut palms" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-areca-950/90 via-areca-900/70 to-areca-800/30" />
        </div>

        <div className="relative px-6 py-20 sm:px-12 sm:py-28 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-5 animate-fade-in-down">
              <Badge variant="demo">
                <Sparkles className="h-3 w-3" />
                {t('common.demo')} Prototype
              </Badge>
            </div>
            <h1 className="font-display text-4xl font-bold text-white sm:text-5xl lg:text-6xl leading-tight animate-fade-in-up">
              {t('landing.hero.title')}
            </h1>
            <p className="mt-5 text-lg text-areca-100 sm:text-xl max-w-xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {t('landing.hero.subtitle')}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/detect" className="btn-primary px-6 py-3.5 text-base">
                <Camera className="h-5 w-5" />
                {t('landing.hero.detect')}
              </Link>
              <Link to="/advisory" className="btn bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3.5 text-base hover:bg-white/20">
                <Stethoscope className="h-5 w-5" />
                {t('landing.hero.advisory')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container-app section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-areca-900 sm:text-4xl">{t('landing.how.title')}</h2>
          <p className="mt-3 text-areca-600 max-w-2xl mx-auto">A simple four-step process from leaf to actionable advisory.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={i} className="card card-hover p-6 relative animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-areca-600 text-white text-sm font-bold">
                {i + 1}
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${step.color} mb-4`}>
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-areca-900 mb-2">{step.title}</h3>
              <p className="text-sm text-areca-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AI Detection Showcase */}
      <section className="container-app section-padding">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative animate-fade-in-up">
            <div className="card overflow-hidden p-0">
              <img src={LEAF_IMG} alt="Arecanut leaf" className="w-full h-80 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-3/4 h-3/4 rounded-xl border-2 border-areca-400/60 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-areca-400/20 to-transparent animate-scan-line" style={{ height: '3px', top: 0 }} />
                  <div className="absolute top-1/4 left-1/4 h-16 w-16 rounded-full bg-amber-400/30 blur-xl" />
                  <div className="absolute bottom-1/3 right-1/4 h-20 w-20 rounded-full bg-amber-400/30 blur-xl" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 card p-4 flex items-center gap-3 shadow-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <Microscope className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-areca-600">AI Attention</p>
                <p className="text-sm font-semibold text-areca-900">Visualization</p>
              </div>
            </div>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-3xl font-bold text-areca-900 mb-4">AI-Powered Leaf Analysis</h2>
            <p className="text-areca-600 mb-6">
              Our system performs image quality validation, classifies the leaf as healthy or diseased, and provides a confidence score with severity assessment — all in seconds.
            </p>
            <ul className="space-y-3">
              {[
                { icon: ScanLine, text: 'Image quality validation before analysis' },
                { icon: Brain, text: 'Deep learning classification with confidence score' },
                { icon: Microscope, text: 'Explainable AI attention visualization overlay' },
                { icon: ShieldCheck, text: 'Scientific disclaimer on every prediction' },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-areca-100 text-areca-700 shrink-0">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-areca-700">{item.text}</span>
                </li>
              ))}
            </ul>
            <Link to="/detect" className="btn-primary mt-6">
              Try Detection
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why ArecaCare AI */}
      <section className="container-app section-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-areca-900 sm:text-4xl">{t('landing.why.title')}</h2>
          <p className="mt-3 text-areca-600 max-w-2xl mx-auto">Built specifically for arecanut farmers, with the tools that matter most.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <div key={i} className="card card-hover p-6 text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-areca-500 to-areca-700 text-white mx-auto mb-4">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="font-semibold text-areca-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-areca-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-app section-padding">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-areca-700 to-areca-900 px-6 py-16 sm:px-12 sm:py-20 text-center">
          <div className="absolute inset-0 opacity-10">
            <img src={FARMER_IMG} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="relative">
            <Leaf className="h-12 w-12 text-areca-300 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Ready to protect your arecanut palms?</h2>
            <p className="text-areca-100 max-w-xl mx-auto mb-8">
              Start with a single leaf photo. Get an AI analysis, severity assessment, and a complete farmer-friendly advisory in seconds.
            </p>
            <Link to="/detect" className="btn bg-white text-areca-800 px-8 py-3.5 text-base hover:bg-areca-50">
              <Camera className="h-5 w-5" />
              {t('landing.hero.detect')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
