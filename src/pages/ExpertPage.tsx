import { useI18n } from '@/i18n/I18nContext';
import { PageHeader, Badge, Disclaimer } from '@/components/Layout';
import { EXPERT_CONTACTS } from '@/data/demoData';
import {
  Stethoscope, Building2, Microscope, Mail, Phone, Clock,
  CheckCircle2, ArrowRight, Info,
} from 'lucide-react';

const typeIcons = {
  officer: Stethoscope,
  pathologist: Microscope,
  research: Building2,
};

export function ExpertPage() {
  const { t, lang } = useI18n();

  return (
    <div>
      <PageHeader
        title={t('expert.title')}
        subtitle={t('expert.subtitle')}
        icon={<Stethoscope className="h-6 w-6" />}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {EXPERT_CONTACTS.map((contact, i) => {
            const Icon = typeIcons[contact.type];
            return (
              <div key={contact.id} className="card card-hover p-6 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-areca-100 text-areca-700 mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-areca-900 mb-1">
                  {lang === 'kn' ? contact.nameKn : contact.name}
                </h3>
                <p className="text-xs text-areca-500 mb-3">
                  {lang === 'kn' ? contact.roleKn : contact.role}
                </p>
                <p className="text-sm text-areca-600 mb-4">
                  {lang === 'kn' ? contact.descriptionKn : contact.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-leaf-600">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Available for consultation</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact info placeholder */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-2 flex items-center gap-2">
            <Info className="h-5 w-5 text-areca-600" />
            How to reach an expert
          </h3>
          <p className="text-sm text-areca-600 mb-4">
            Verified agricultural contact details (phone, email, address) will be provided here once the backend is connected. The platform will pull verified contacts from the agricultural department database.
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <div className="rounded-xl bg-areca-50 p-4 text-center">
              <Phone className="h-6 w-6 text-areca-600 mx-auto mb-2" />
              <p className="text-xs text-areca-500">Phone</p>
              <p className="text-sm font-medium text-areca-700">Pending backend</p>
            </div>
            <div className="rounded-xl bg-areca-50 p-4 text-center">
              <Mail className="h-6 w-6 text-areca-600 mx-auto mb-2" />
              <p className="text-xs text-areca-500">Email</p>
              <p className="text-sm font-medium text-areca-700">Pending backend</p>
            </div>
            <div className="rounded-xl bg-areca-50 p-4 text-center">
              <Clock className="h-6 w-6 text-areca-600 mx-auto mb-2" />
              <p className="text-xs text-areca-500">Office Hours</p>
              <p className="text-sm font-medium text-areca-700">Pending backend</p>
            </div>
          </div>
        </div>

        {/* When to consult */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-3">When to consult an expert</h3>
          <ul className="space-y-2 text-sm text-areca-700">
            {[
              'AI prediction indicates high or severe disease severity',
              'Yellowing spreads rapidly across multiple palms',
              'Symptoms do not match typical Yellow Leaf Disease patterns',
              'After applying recommended field management with no improvement',
              'You need specific chemical treatment recommendations',
              'For laboratory confirmation of the pathogen',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowRight className="h-4 w-4 text-areca-400 mt-0.5 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <Disclaimer text={t('result.disclaimer')} />

        <div className="flex justify-center">
          <Badge variant="demo">{t('common.demo')} — Expert contacts provided by backend on integration</Badge>
        </div>
      </div>
    </div>
  );
}
