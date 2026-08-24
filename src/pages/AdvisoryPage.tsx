import { useState } from 'react';
import { useRouter } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { useApp } from '@/store/AppContext';
import { PageHeader, Badge, Disclaimer } from '@/components/Layout';
import { getAdvisory } from '@/data/demoData';
import {
  Stethoscope, Volume2, Square, Info, AlertCircle, Activity,
  ShieldCheck, Calendar, Stethoscope as Expert, Leaf, ChevronRight,
} from 'lucide-react';

export function AdvisoryPage({ predictionId }: { predictionId?: string }) {
  const { t, lang } = useI18n();
  const { navigate } = useRouter();
  const { getPrediction, predictions, profile } = useApp();

  const targetId = predictionId || predictions[0]?.id;
  const prediction = targetId ? getPrediction(targetId) : undefined;

  const [speaking, setSpeaking] = useState(false);

  if (!prediction) {
    return (
      <div className="text-center py-20">
        <Stethoscope className="h-12 w-12 text-areca-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-areca-900 mb-2">No predictions yet</h2>
        <p className="text-areca-600 mb-4">Run a leaf analysis first to get a personalized advisory.</p>
        <button onClick={() => navigate('/detect')} className="btn-primary">
          {t('nav.detect')}
        </button>
      </div>
    );
  }

  const isDiseased = prediction.result === 'yellow_leaf_disease';
  const advisory = getAdvisory(prediction.severity, isDiseased, lang);

  const speakAll = () => {
    if (!('speechSynthesis' in window)) return;
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const fullText = [
      advisory.meaning,
      `${lang === 'kn' ? 'ಲಕ್ಷಣಗಳು' : 'Symptoms'}: ${advisory.symptoms.join(', ')}`,
      `${lang === 'kn' ? 'ತಕ್ಷಣ ಕ್ರಮಗಳು' : 'Immediate actions'}: ${advisory.immediate.join(', ')}`,
      `${lang === 'kn' ? 'ಕ್ಷೇತ್ರ ನಿರ್ವಹಣೆ' : 'Field management'}: ${advisory.fieldMgmt.join(', ')}`,
      `${lang === 'kn' ? 'ತಡೆಗಟ್ಟುವಿಕೆ' : 'Prevention'}: ${advisory.prevention.join(', ')}`,
      `${lang === 'kn' ? 'ಮೇಲ್ವಿಚಾರಣಾ ವೇಳಾಪಟ್ಟಿ' : 'Monitoring schedule'}: ${advisory.monitoring}`,
      `${lang === 'kn' ? 'ತಜ್ಞ ಸಂಪರ್ಕ' : 'Expert contact'}: ${advisory.expert}`,
    ].join('. ');
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    speechSynthesis.speak(utterance);
  };

  const sections = [
    { icon: Info, title: t('advisory.meaning'), content: advisory.meaning, type: 'text' as const },
    { icon: AlertCircle, title: t('advisory.symptoms'), content: advisory.symptoms, type: 'list' as const },
    { icon: Activity, title: t('advisory.immediate'), content: advisory.immediate, type: 'list' as const },
    { icon: Leaf, title: t('advisory.fieldMgmt'), content: advisory.fieldMgmt, type: 'list' as const },
    { icon: ShieldCheck, title: t('advisory.prevention'), content: advisory.prevention, type: 'list' as const },
    { icon: Calendar, title: t('advisory.monitoring'), content: advisory.monitoring, type: 'text' as const },
    { icon: Expert, title: t('advisory.expert'), content: advisory.expert, type: 'text' as const },
  ];

  return (
    <div>
      <PageHeader
        title={t('advisory.title')}
        subtitle={`${prediction.result === 'healthy' ? t('common.healthy') : t('common.yellowLeaf')} • ${prediction.confidence}% ${t('common.confidence').toLowerCase()}`}
        icon={<Stethoscope className="h-6 w-6" />}
        action={
          <button onClick={speakAll} className="btn-secondary">
            {speaking ? <Square className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {speaking ? t('common.close') : t('common.listen')}
          </button>
        }
      />

      <div className="max-w-3xl mx-auto space-y-4">
        {/* Context card */}
        <div className={`card p-5 flex items-center gap-4 animate-fade-in ${isDiseased ? 'bg-amber-50' : 'bg-leaf-50'}`}>
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDiseased ? 'bg-amber-100 text-amber-700' : 'bg-leaf-100 text-leaf-700'}`}>
            {isDiseased ? <AlertCircle className="h-6 w-6" /> : <Leaf className="h-6 w-6" />}
          </div>
          <div className="flex-1">
            <p className="text-sm text-areca-600">{t('common.confidence')}</p>
            <p className="text-lg font-bold text-areca-900">
              {isDiseased ? t('common.yellowLeaf') : t('common.healthy')} — {prediction.confidence}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-areca-600">{t('result.severity')}</p>
            <p className="text-lg font-bold text-areca-900 capitalize">{prediction.severity}</p>
          </div>
        </div>

        {/* Advisory sections */}
        {sections.map((section, i) => (
          <div
            key={i}
            className="card p-6 animate-fade-in-up"
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <h3 className="font-semibold text-areca-900 mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-areca-100 text-areca-700">
                <section.icon className="h-4 w-4" />
              </div>
              {section.title}
            </h3>
            {section.type === 'text' ? (
              <p className="text-areca-700 leading-relaxed pl-10">{section.content as string}</p>
            ) : (
              <ul className="space-y-2 pl-10">
                {(section.content as string[]).map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-areca-700">
                    <ChevronRight className="h-4 w-4 text-areca-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Chemical treatment disclaimer */}
        <div className="rounded-xl bg-earth-50 border border-earth-200 p-5 flex gap-3">
          <div className="shrink-0 mt-0.5 text-earth-600">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-earth-800 text-sm mb-1">Chemical Treatment</p>
            <p className="text-sm text-earth-700">{t('advisory.chemical')}</p>
          </div>
        </div>

        <Disclaimer text={t('result.disclaimer')} />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button onClick={() => navigate('/expert')} className="btn-primary flex-1">
            <Expert className="h-5 w-5" />
            {t('expert.title')}
          </button>
          <button onClick={() => navigate(`/prediction/${prediction.id}`)} className="btn-secondary flex-1">
            {t('common.generateReport')}
          </button>
        </div>
      </div>
    </div>
  );
}
