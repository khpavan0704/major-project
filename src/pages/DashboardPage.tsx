import { useMemo } from 'react';
import { useRouter, Link } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { useApp } from '@/store/AppContext';
import { PageHeader, StatCard, Badge, EmptyState } from '@/components/Layout';
import { LineChart, DonutChart } from '@/components/Charts';
import {
  LayoutDashboard, Camera, CheckCircle2, AlertTriangle, AlertOctagon,
  TrendingUp, PieChart, History, ArrowRight, Leaf,
} from 'lucide-react';

export function DashboardPage() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  const { predictions, profile } = useApp();

  const stats = useMemo(() => {
    const total = predictions.length;
    const healthy = predictions.filter((p) => p.result === 'healthy').length;
    const diseased = predictions.filter((p) => p.result === 'yellow_leaf_disease').length;
    const highRisk = predictions.filter(
      (p) => p.result === 'yellow_leaf_disease' && (p.severity === 'high' || p.severity === 'severe')
    ).length;
    return { total, healthy, diseased, highRisk };
  }, [predictions]);

  const trendData = useMemo(() => {
    const last7 = [...predictions].slice(0, 7).reverse();
    const days = ['6d', '5d', '4d', '3d', '2d', '1d', 'Today'];
    return days.map((day, i) => {
      const pred = last7[i];
      return {
        label: day,
        value: pred ? (pred.result === 'yellow_leaf_disease' ? 1 : 0) : 0,
      };
    });
  }, [predictions]);

  const severityData = useMemo(() => {
    const counts = { low: 0, moderate: 0, high: 0, severe: 0 };
    predictions
      .filter((p) => p.result === 'yellow_leaf_disease')
      .forEach((p) => {
        if (p.severity in counts) counts[p.severity as keyof typeof counts]++;
      });
    return [
      { label: 'Low', value: counts.low, color: '#56c234' },
      { label: 'Moderate', value: counts.moderate, color: '#b5853f' },
      { label: 'High', value: counts.high, color: '#c2995f' },
      { label: 'Severe', value: counts.severe, color: '#9a6e33' },
    ].filter((d) => d.value > 0);
  }, [predictions]);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? t('dashboard.greeting') : hour < 17 ? 'Good Afternoon, Farmer' : 'Good Evening, Farmer';

  return (
    <div>
      <PageHeader
        title={`${greeting} 👋`}
        subtitle={profile.name ? `${profile.name} • ${profile.village}, ${profile.district}` : t('nav.dashboard')}
        icon={<LayoutDashboard className="h-6 w-6" />}
        action={
          <Link to="/detect" className="btn-primary">
            <Camera className="h-4 w-4" />
            {t('common.scan')}
          </Link>
        }
      />

      <div className="space-y-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label={t('dashboard.totalScans')} value={stats.total} icon={<Camera className="h-5 w-5" />} color="areca" />
          <StatCard label={t('dashboard.healthy')} value={stats.healthy} icon={<CheckCircle2 className="h-5 w-5" />} color="leaf" />
          <StatCard label={t('dashboard.diseased')} value={stats.diseased} icon={<AlertTriangle className="h-5 w-5" />} color="earth" />
          <StatCard label={t('dashboard.highRisk')} value={stats.highRisk} icon={<AlertOctagon className="h-5 w-5" />} color="red" />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-6 animate-fade-in-up">
            <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-areca-600" />
              {t('dashboard.trend')}
            </h3>
            <LineChart data={trendData} height={220} color="#358240" />
          </div>

          <div className="card p-6 animate-fade-in-up">
            <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-areca-600" />
              {t('dashboard.severityDist')}
            </h3>
            {severityData.length > 0 ? (
              <div className="flex items-center justify-center gap-6">
                <DonutChart
                  data={severityData}
                  size={160}
                  centerValue={String(stats.diseased)}
                  centerLabel={t('dashboard.diseased')}
                />
                <div className="space-y-2">
                  {severityData.map((d) => (
                    <div key={d.label} className="flex items-center gap-2 text-sm">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                      <span className="text-areca-700">{d.label}</span>
                      <span className="font-semibold text-areca-900">{d.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-areca-500">
                <CheckCircle2 className="h-10 w-10 text-leaf-500 mb-2" />
                <p className="text-sm">No diseased leaves detected</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent predictions */}
        <div className="card p-6 animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-areca-900 flex items-center gap-2">
              <History className="h-5 w-5 text-areca-600" />
              {t('dashboard.recent')}
            </h3>
            <Link to="/history" className="text-sm text-areca-600 hover:text-areca-800 flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {predictions.length === 0 ? (
            <EmptyState
              icon={<Leaf className="h-8 w-8" />}
              title="No scans yet"
              description="Start by analyzing your first arecanut leaf."
              action={<Link to="/detect" className="btn-primary">{t('common.scan')}</Link>}
            />
          ) : (
            <div className="space-y-2">
              {predictions.slice(0, 5).map((p) => (
                <button
                  key={p.id}
                  onClick={() => navigate(`/result/${p.id}`)}
                  className="w-full flex items-center gap-4 rounded-xl p-3 hover:bg-areca-50 transition-colors text-left"
                >
                  <div className="h-12 w-12 rounded-lg overflow-hidden bg-areca-100 shrink-0 flex items-center justify-center">
                    {p.imageData ? (
                      <img src={p.imageData} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <Leaf className="h-5 w-5 text-areca-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-areca-900 text-sm">
                      {p.result === 'healthy' ? t('common.healthy') : t('common.yellowLeaf')}
                    </p>
                    <p className="text-xs text-areca-500">
                      {new Date(p.date).toLocaleDateString()} • {p.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-areca-700">{p.confidence}%</span>
                    {p.result === 'healthy' ? (
                      <CheckCircle2 className="h-5 w-5 text-leaf-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-600" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
