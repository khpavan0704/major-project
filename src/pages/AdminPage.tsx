import { useMemo, useState } from 'react';
import { useI18n } from '@/i18n/I18nContext';
import { useApp } from '@/store/AppContext';
import { PageHeader, StatCard, Badge } from '@/components/Layout';
import { LineChart, DonutChart, BarChart } from '@/components/Charts';
import { DEMO_PREDICTIONS } from '@/data/demoData';
import {
  Shield, Users, Camera, CheckCircle2, AlertTriangle,
  TrendingUp, PieChart, BarChart3, Cpu, Activity, Calendar,
} from 'lucide-react';

type TimeRange = 'daily' | 'weekly' | 'monthly';

export function AdminPage() {
  const { t } = useI18n();
  const { predictions } = useApp();
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');

  // Combine real predictions with demo data for admin view
  const allPredictions = useMemo(() => {
    const realIds = new Set(predictions.map((p) => p.id));
    const demos = DEMO_PREDICTIONS.filter((p) => !realIds.has(p.id));
    return [...predictions, ...demos];
  }, [predictions]);

  const stats = useMemo(() => {
    const totalFarmers = 47;
    const total = allPredictions.length;
    const healthy = allPredictions.filter((p) => p.result === 'healthy').length;
    const diseased = allPredictions.filter((p) => p.result === 'yellow_leaf_disease').length;
    return { totalFarmers, total, healthy, diseased };
  }, [allPredictions]);

  const trendData = useMemo(() => {
    const buckets = timeRange === 'daily' ? 7 : timeRange === 'weekly' ? 4 : 6;
    const labels =
      timeRange === 'daily'
        ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        : timeRange === 'weekly'
          ? ['Week 1', 'Week 2', 'Week 3', 'Week 4']
          : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

    return labels.map((label, i) => ({
      label,
      value: Math.floor(Math.random() * 15) + 5 + i * 2,
    }));
  }, [timeRange]);

  const diseaseDist = useMemo(() => [
    { label: t('common.healthy'), value: stats.healthy, color: '#56c234' },
    { label: t('common.yellowLeaf'), value: stats.diseased, color: '#b5853f' },
  ], [stats, t]);

  const severityDist = useMemo(() => {
    const counts = { low: 0, moderate: 0, high: 0, severe: 0 };
    allPredictions
      .filter((p) => p.result === 'yellow_leaf_disease')
      .forEach((p) => {
        if (p.severity in counts) counts[p.severity as keyof typeof counts]++;
      });
    return [
      { label: 'Low', value: counts.low, color: '#56c234' },
      { label: 'Moderate', value: counts.moderate, color: '#b5853f' },
      { label: 'High', value: counts.high, color: '#c2995f' },
      { label: 'Severe', value: counts.severe, color: '#9a6e33' },
    ];
  }, [allPredictions]);

  return (
    <div>
      <PageHeader
        title={t('admin.title')}
        subtitle="Platform analytics and model performance overview"
        icon={<Shield className="h-6 w-6" />}
        action={<Badge variant="demo">{t('common.demo')}</Badge>}
      />

      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label={t('admin.farmers')} value={stats.totalFarmers} icon={<Users className="h-5 w-5" />} color="areca" />
          <StatCard label={t('admin.predictions')} value={stats.total} icon={<Camera className="h-5 w-5" />} color="earth" />
          <StatCard label={t('admin.healthy')} value={stats.healthy} icon={<CheckCircle2 className="h-5 w-5" />} color="leaf" />
          <StatCard label={t('admin.disease')} value={stats.diseased} icon={<AlertTriangle className="h-5 w-5" />} color="red" />
        </div>

        {/* Time range selector */}
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-areca-600" />
          <div className="flex items-center gap-1 rounded-xl bg-areca-50 p-1">
            {(['daily', 'weekly', 'monthly'] as TimeRange[]).map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  timeRange === r ? 'bg-white text-areca-800 shadow-sm' : 'text-areca-500'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="card p-6 animate-fade-in-up">
            <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-areca-600" />
              {t('admin.trend')}
            </h3>
            <LineChart data={trendData} height={220} color="#358240" />
          </div>

          <div className="card p-6 animate-fade-in-up">
            <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
              <PieChart className="h-5 w-5 text-areca-600" />
              {t('admin.diseaseDist')}
            </h3>
            <div className="flex items-center justify-center gap-6">
              <DonutChart data={diseaseDist} size={160} centerValue={String(stats.total)} centerLabel="Total" />
              <div className="space-y-2">
                {diseaseDist.map((d) => (
                  <div key={d.label} className="flex items-center gap-2 text-sm">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-areca-700">{d.label}</span>
                    <span className="font-semibold text-areca-900">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card p-6 animate-fade-in-up lg:col-span-2">
            <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-areca-600" />
              {t('admin.severityDist')}
            </h3>
            {severityDist.some((d) => d.value > 0) ? (
              <BarChart data={severityDist} height={200} />
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-areca-500">
                <CheckCircle2 className="h-10 w-10 text-leaf-500 mb-2" />
                <p className="text-sm">No diseased leaves detected</p>
              </div>
            )}
          </div>
        </div>

        {/* Model metrics */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-areca-600" />
            Model Performance Metrics
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: t('admin.accuracy'), value: null },
              { label: t('admin.precision'), value: null },
              { label: t('admin.recall'), value: null },
              { label: t('admin.f1'), value: null },
            ].map((metric, i) => (
              <div key={i} className="rounded-xl border border-areca-100 p-4 text-center">
                <Activity className="h-5 w-5 text-areca-400 mx-auto mb-2" />
                <p className="text-xs text-areca-500 mb-1">{metric.label}</p>
                <p className="text-2xl font-bold text-areca-300">—</p>
                <p className="text-xs text-areca-400 mt-1">Pending model</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="text-sm text-amber-700">
              {t('model.metricsUnavailable')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
