import { useState } from 'react';
import { useRouter, Link } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { PageHeader, Badge } from '@/components/Layout';
import {
  UserPlus, Mail, Lock, User, Phone, Eye, EyeOff, Leaf,
  ShieldCheck, ArrowRight,
} from 'lucide-react';

export function RegisterPage() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  const [form, setForm] = useState({ name: '', email: '', mobile: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  return (
    <div>
      <PageHeader title={t('auth.register')} icon={<UserPlus className="h-6 w-6" />} />

      <div className="max-w-md mx-auto">
        <div className="card p-6 sm:p-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-areca-500 to-areca-700 text-white">
              <Leaf className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-areca-900">{t('auth.createAccount')}</h2>
              <p className="text-sm text-areca-500">Start protecting your arecanut palms today</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> {t('auth.name')}</label>
              <input className="input" value={form.name} onChange={(e) => update('name', e.target.value)} required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {t('auth.email')}</label>
              <input type="email" className="input" value={form.email} onChange={(e) => update('email', e.target.value)} placeholder="farmer@example.com" required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" /> {t('auth.mobile')}</label>
              <input type="tel" className="input" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} placeholder="+91 98765 43210" required />
            </div>
            <div>
              <label className="label flex items-center gap-1.5"><Lock className="h-3.5 w-3.5" /> {t('auth.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input pr-11"
                  value={form.password}
                  onChange={(e) => update('password', e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-areca-400 hover:text-areca-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full">
              {t('auth.register')}
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="flex items-center gap-2 my-5">
            <div className="flex-1 h-px bg-areca-100" />
            <span className="text-xs text-areca-400">or</span>
            <div className="flex-1 h-px bg-areca-100" />
          </div>

          <p className="text-center text-sm text-areca-600">
            {t('auth.haveAccount')}{' '}
            <Link to="/login" className="font-semibold text-areca-700 hover:text-areca-800">
              {t('auth.login')}
            </Link>
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          <ShieldCheck className="h-4 w-4 text-areca-500" />
          <span className="text-xs text-areca-500">JWT authentication • Password hashing • Secure API</span>
        </div>
        <div className="mt-2 flex justify-center">
          <Badge variant="demo">{t('common.demo')} — Auth backend integration pending</Badge>
        </div>
      </div>
    </div>
  );
}
