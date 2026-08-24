import { Link } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { Leaf, Github, Mail } from 'lucide-react';

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="mt-16 border-t border-areca-100 bg-white">
      <div className="container-app section-padding py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-areca-500 to-areca-700 text-white">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="font-display font-bold text-areca-900">
                ArecaCare <span className="text-areca-500">AI</span>
              </span>
            </Link>
            <p className="text-sm text-areca-600 max-w-xs">
              AI-powered Arecanut Yellow Leaf Disease detection and farmer advisory platform.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-areca-900 mb-3 text-sm">Platform</h4>
            <ul className="space-y-2 text-sm text-areca-600">
              <li><Link to="/detect" className="hover:text-areca-800">{t('nav.detect')}</Link></li>
              <li><Link to="/dashboard" className="hover:text-areca-800">{t('nav.dashboard')}</Link></li>
              <li><Link to="/history" className="hover:text-areca-800">{t('nav.history')}</Link></li>
              <li><Link to="/weather" className="hover:text-areca-800">{t('nav.weather')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-areca-900 mb-3 text-sm">Resources</h4>
            <ul className="space-y-2 text-sm text-areca-600">
              <li><Link to="/expert" className="hover:text-areca-800">{t('nav.expert')}</Link></li>
              <li><Link to="/about" className="hover:text-areca-800">{t('nav.about')}</Link></li>
              <li><Link to="/admin" className="hover:text-areca-800">{t('nav.admin')}</Link></li>
              <li><Link to="/model" className="hover:text-areca-800">{t('nav.model')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-areca-900 mb-3 text-sm">Connect</h4>
            <div className="flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-areca-50 text-areca-600 hover:bg-areca-100 transition-colors">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-areca-50 text-areca-600 hover:bg-areca-100 transition-colors">
                <Mail className="h-4 w-4" />
              </a>
              <Link to="/profile" className="flex h-9 w-9 items-center justify-center rounded-lg bg-areca-50 text-areca-600 hover:bg-areca-100 transition-colors">
                <Leaf className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-areca-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-areca-500">
            © 2026 ArecaCare AI. AI predictions are preliminary and for decision-support only.
          </p>
          <p className="text-xs text-areca-500">
            DEMO prototype — model integration pending
          </p>
        </div>
      </div>
    </footer>
  );
}
