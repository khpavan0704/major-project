import { useI18n } from '@/i18n/I18nContext';
import { PageHeader, Badge, Disclaimer } from '@/components/Layout';
import { YELLOW_LEAF_DISEASE, HEALTHY_INFO } from '@/data/demoData';
import {
  BookOpen, AlertTriangle, CheckCircle2, Activity, ShieldCheck,
  Microscope, Leaf,
} from 'lucide-react';

export function DiseaseInfoPage() {
  const { t, lang } = useI18n();
  const diseases = [YELLOW_LEAF_DISEASE, HEALTHY_INFO];

  return (
    <div>
      <PageHeader
        title="Disease Information"
        subtitle="Learn about arecanut leaf diseases and their management"
        icon={<BookOpen className="h-6 w-6" />}
      />

      <div className="max-w-3xl mx-auto space-y-6">
        {diseases.map((disease, idx) => {
          const isDiseased = disease.id === 'yellow_leaf_disease';
          return (
            <div key={disease.id} className="card p-6 sm:p-8 animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${isDiseased ? 'bg-amber-100 text-amber-700' : 'bg-leaf-100 text-leaf-700'}`}>
                  {isDiseased ? <AlertTriangle className="h-6 w-6" /> : <CheckCircle2 className="h-6 w-6" />}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-areca-900">
                    {lang === 'kn' ? disease.nameKn : disease.name}
                  </h2>
                  <p className="text-sm text-areca-500 italic">{disease.scientificName}</p>
                </div>
              </div>

              <p className="text-areca-700 leading-relaxed mb-5">{disease.description}</p>

              {disease.symptoms.length > 0 && (
                <div className="mb-5">
                  <h3 className="font-semibold text-areca-900 mb-2 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-areca-600" />
                    {t('common.symptoms')}
                  </h3>
                  <ul className="space-y-1.5">
                    {disease.symptoms.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-areca-700">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h3 className="font-semibold text-areca-900 mb-2 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-areca-600" />
                  {t('common.prevention')}
                </h3>
                <ul className="space-y-1.5">
                  {disease.prevention.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-areca-700">
                      <CheckCircle2 className="h-4 w-4 text-leaf-600 mt-0.5 shrink-0" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}

        <Disclaimer text={t('result.disclaimer')} />

        <div className="flex justify-center">
          <Badge variant="demo">
            <Microscope className="h-3 w-3" />
            {t('common.demo')} — Disease database expandable on backend integration
          </Badge>
        </div>
      </div>
    </div>
  );
}
