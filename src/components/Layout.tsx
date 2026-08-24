import type { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children, fullWidth = false }: { children: ReactNode; fullWidth?: boolean }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-areca-50 via-white to-areca-50">
      <Header />
      <main className={`flex-1 ${fullWidth ? '' : 'container-app section-padding'} py-6`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  icon,
  action,
}: {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 animate-fade-in-down">
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-areca-100 text-areca-700">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-areca-900 sm:text-3xl">{title}</h1>
          {subtitle && <p className="text-areca-600 mt-1 text-sm sm:text-base">{subtitle}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  color = 'areca',
  trend,
}: {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: 'areca' | 'earth' | 'leaf' | 'red' | 'amber';
  trend?: string;
}) {
  const colorMap: Record<string, string> = {
    areca: 'bg-areca-100 text-areca-700',
    earth: 'bg-earth-100 text-earth-700',
    leaf: 'bg-leaf-100 text-leaf-700',
    red: 'bg-red-100 text-red-700',
    amber: 'bg-amber-100 text-amber-700',
  };

  return (
    <div className="card card-hover p-5 animate-fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-areca-600">{label}</p>
          <p className="text-3xl font-bold text-areca-900 mt-1">{value}</p>
          {trend && <p className="text-xs text-areca-500 mt-1">{trend}</p>}
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorMap[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

export function Badge({
  children,
  variant = 'default',
}: {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'demo';
}) {
  const variants: Record<string, string> = {
    default: 'bg-areca-100 text-areca-700',
    success: 'bg-leaf-100 text-leaf-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    info: 'bg-blue-100 text-blue-700',
    demo: 'bg-earth-100 text-earth-700',
  };
  return <span className={`badge ${variants[variant]}`}>{children}</span>;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-areca-50 text-areca-400 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-areca-900 mb-1">{title}</h3>
      <p className="text-areca-600 text-sm max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

export function Disclaimer({ text }: { text: string }) {
  return (
    <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
      <div className="shrink-0 mt-0.5 text-amber-600">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M8.485 2.495c.671-1.167 2.355-1.167 3.026 0l6.28 10.875c.671 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
        </svg>
      </div>
      <p className="text-sm text-amber-800">{text}</p>
    </div>
  );
}
