import { Link } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { Leaf, Home } from 'lucide-react';

export function NotFoundPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center animate-fade-in-up">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-areca-100 text-areca-600 mx-auto mb-6">
          <Leaf className="h-10 w-10" />
        </div>
        <h1 className="text-6xl font-bold text-areca-900 mb-3">404</h1>
        <h2 className="text-xl font-semibold text-areca-800 mb-2">{t('notfound.title')}</h2>
        <p className="text-areca-600 max-w-sm mx-auto mb-6">{t('notfound.subtitle')}</p>
        <Link to="/" className="btn-primary">
          <Home className="h-4 w-4" />
          {t('notfound.home')}
        </Link>
      </div>
    </div>
  );
}
