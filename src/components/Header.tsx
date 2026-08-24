import { useState, useEffect } from 'react';
import { useRouter, Link } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import type { TranslationKey } from '@/i18n/translations';
import {
  Leaf, Menu, X, Camera, LayoutDashboard, History, CloudSun,
  User, Stethoscope, Info, Shield, Cpu, LogIn, Globe, BookOpen,
} from 'lucide-react';

export function Header() {
  const { path, navigate } = useRouter();
  const { lang, setLang, t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  const navItems: { to: string; label: TranslationKey; icon: typeof Leaf }[] = [
    { to: '/', label: 'nav.home', icon: Leaf },
    { to: '/detect', label: 'nav.detect', icon: Camera },
    { to: '/dashboard', label: 'nav.dashboard', icon: LayoutDashboard },
    { to: '/history', label: 'nav.history', icon: History },
    { to: '/advisory', label: 'nav.advisory', icon: Stethoscope },
    { to: '/diseases', label: 'Diseases', icon: BookOpen },
    { to: '/weather', label: 'nav.weather', icon: CloudSun },
    { to: '/expert', label: 'nav.expert', icon: Info },
    { to: '/about', label: 'nav.about', icon: Info },
  ];

  const secondaryItems: { to: string; label: TranslationKey; icon: typeof Leaf }[] = [
    { to: '/profile', label: 'nav.profile', icon: User },
    { to: '/admin', label: 'nav.admin', icon: Shield },
    { to: '/model', label: 'nav.model', icon: Cpu },
  ];

  const isActive = (to: string) => (to === '/' ? path === '/' : path.startsWith(to));

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-app section-padding">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-areca-500 to-areca-700 text-white shadow-md">
              <Leaf className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold text-areca-900 hidden sm:block">
              ArecaCare <span className="text-areca-500">AI</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.to)
                    ? 'bg-areca-100 text-areca-800'
                    : 'text-areca-700 hover:bg-areca-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {t(item.label)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1 rounded-lg bg-areca-50 p-0.5 border border-areca-100">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all ${
                  lang === 'en' ? 'bg-white text-areca-800 shadow-sm' : 'text-areca-500'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('kn')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-all ${
                  lang === 'kn' ? 'bg-white text-areca-800 shadow-sm' : 'text-areca-500'
                }`}
              >
                ಕನ್ನಡ
              </button>
            </div>

            <Link
              to="/login"
              className="hidden sm:flex btn-primary px-4 py-2 text-sm"
            >
              <LogIn className="h-4 w-4" />
              {t('nav.login')}
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex h-10 w-10 items-center justify-center rounded-lg text-areca-700 hover:bg-areca-50"
              aria-label="Menu"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden glass border-t border-areca-100 animate-fade-in-down">
          <div className="container-app section-padding py-4 space-y-1">
            {[...navItems, ...secondaryItems].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(item.to) ? 'bg-areca-100 text-areca-800' : 'text-areca-700 hover:bg-areca-50'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {t(item.label)}
              </Link>
            ))}
            <Link to="/login" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-areca-700 hover:bg-areca-50">
              <LogIn className="h-4 w-4" />
              {t('nav.login')}
            </Link>
            <div className="flex items-center gap-2 pt-2">
              <Globe className="h-4 w-4 text-areca-500" />
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md ${lang === 'en' ? 'bg-areca-100 text-areca-800' : 'text-areca-500'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('kn')}
                className={`px-3 py-1.5 text-sm font-semibold rounded-md ${lang === 'kn' ? 'bg-areca-100 text-areca-800' : 'text-areca-500'}`}
              >
                ಕನ್ನಡ
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
