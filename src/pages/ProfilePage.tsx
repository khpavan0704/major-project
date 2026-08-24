import { useState } from 'react';
import { useI18n } from '@/i18n/I18nContext';
import { useApp } from '@/store/AppContext';
import { PageHeader, Badge } from '@/components/Layout';
import type { FarmerProfile, Language } from '@/types';
import {
  User, Phone, MapPin, Home, Building2, TreePalm, Languages, Save, Check,
} from 'lucide-react';

export function ProfilePage() {
  const { t, lang, setLang } = useI18n();
  const { profile, updateProfile } = useApp();
  const [form, setForm] = useState<FarmerProfile>(profile);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(form);
    if (form.language !== lang) setLang(form.language);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const update = (field: keyof FarmerProfile, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <PageHeader
        title={t('common.profile')}
        subtitle="Manage your farm information and preferences"
        icon={<User className="h-6 w-6" />}
      />

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-5 animate-fade-in-up">
          {/* Avatar */}
          <div className="flex items-center gap-4 pb-4 border-b border-areca-100">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-areca-500 to-areca-700 text-white text-xl font-bold">
              {form.name ? form.name.charAt(0).toUpperCase() : <User className="h-7 w-7" />}
            </div>
            <div>
              <p className="font-semibold text-areca-900">{form.name || 'Your Name'}</p>
              <p className="text-sm text-areca-500">{form.village}, {form.district}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {t('profile.name')}</label>
              <input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {t('profile.mobile')}</label>
              <input className="input" type="tel" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><Home className="h-3.5 w-3.5" /> {t('profile.village')}</label>
              <input className="input" value={form.village} onChange={(e) => update('village', e.target.value)} required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {t('profile.taluk')}</label>
              <input className="input" value={form.taluk} onChange={(e) => update('taluk', e.target.value)} required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> {t('profile.district')}</label>
              <input className="input" value={form.district} onChange={(e) => update('district', e.target.value)} required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><TreePalm className="h-3.5 w-3.5" /> {t('profile.farmSize')}</label>
              <input className="input" type="number" value={form.farmSize} onChange={(e) => update('farmSize', e.target.value)} required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><TreePalm className="h-3.5 w-3.5" /> {t('profile.palms')}</label>
              <input className="input" type="number" value={form.palms} onChange={(e) => update('palms', e.target.value)} required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><Languages className="h-3.5 w-3.5" /> {t('profile.language')}</label>
              <select
                className="input"
                value={form.language}
                onChange={(e) => update('language', e.target.value as Language)}
              >
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">
              {saved ? <><Check className="h-5 w-5" /> Saved!</> : <><Save className="h-5 w-5" /> {t('common.save')}</>}
            </button>
          </div>
        </form>

        <div className="mt-4 flex justify-center">
          <Badge variant="demo">{t('common.demo')} — Profile syncs to backend on integration</Badge>
        </div>
      </div>
    </div>
  );
}
