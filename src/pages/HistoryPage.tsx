import { useState } from 'react';
import { useRouter, Link } from '@/router/Router';
import { useI18n } from '@/i18n/I18nContext';
import { useApp } from '@/store/AppContext';
import { PageHeader, Badge, EmptyState } from '@/components/Layout';
import {
  History, Camera, CheckCircle2, AlertTriangle, Trash2, Eye,
  FileText, Leaf, Search, Filter,
} from 'lucide-react';
import type { PredictionClass } from '@/types';

export function HistoryPage() {
  const { t } = useI18n();
  const { navigate } = useRouter();
  const { predictions, deletePrediction } = useApp();
  const [filter, setFilter] = useState<'all' | 'healthy' | 'diseased'>('all');
  const [search, setSearch] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = predictions.filter((p) => {
    if (filter === 'healthy' && p.result !== 'healthy') return false;
    if (filter === 'diseased' && p.result !== 'yellow_leaf_disease') return false;
    if (search && !p.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (predictions.length === 0) {
    return (
      <div>
        <PageHeader title={t('common.history')} icon={<History className="h-6 w-6" />} />
        <EmptyState
          icon={<Leaf className="h-8 w-8" />}
          title="No predictions yet"
          description="Your scan history will appear here once you start analyzing leaves."
          action={<Link to="/detect" className="btn-primary"><Camera className="h-4 w-4" />{t('common.scan')}</Link>}
        />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={t('common.history')}
        subtitle={`${predictions.length} ${t('dashboard.totalScans').toLowerCase()}`}
        icon={<History className="h-6 w-6" />}
        action={<Link to="/detect" className="btn-primary"><Camera className="h-4 w-4" />{t('common.scan')}</Link>}
      />

      <div className="max-w-4xl mx-auto space-y-4">
        {/* Filters */}
        <div className="card p-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-areca-400" />
            <input
              type="text"
              placeholder="Search by location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
          <div className="flex items-center gap-1 rounded-xl bg-areca-50 p-1">
            {(['all', 'healthy', 'diseased'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                  filter === f ? 'bg-white text-areca-800 shadow-sm' : 'text-areca-500'
                }`}
              >
                {f === 'all' ? 'All' : f === 'healthy' ? t('common.healthy') : 'Diseased'}
              </button>
            ))}
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="card p-8 text-center text-areca-500">
              <Filter className="h-8 w-8 mx-auto mb-2" />
              <p>No predictions match your filter.</p>
            </div>
          ) : (
            filtered.map((p, i) => (
              <div
                key={p.id}
                className="card card-hover p-4 flex items-center gap-4 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="h-16 w-16 rounded-xl overflow-hidden bg-areca-100 shrink-0 flex items-center justify-center">
                  {p.imageData ? (
                    <img src={p.imageData} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Leaf className="h-6 w-6 text-areca-400" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {p.result === 'healthy' ? (
                      <Badge variant="success"><CheckCircle2 className="h-3 w-3" />{t('common.healthy')}</Badge>
                    ) : (
                      <Badge variant="warning"><AlertTriangle className="h-3 w-3" />{t('common.yellowLeaf')}</Badge>
                    )}
                    {p.isDemo && <Badge variant="demo">{t('common.demo')}</Badge>}
                  </div>
                  <p className="text-sm text-areca-600">
                    {new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })} • {p.location}
                  </p>
                  <p className="text-xs text-areca-500 mt-0.5">
                    {t('common.confidence')}: {p.confidence}% • {p.modelVersion}
                  </p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => navigate(`/result/${p.id}`)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-areca-600 hover:bg-areca-100"
                    title={t('common.viewDetails')}
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => navigate(`/prediction/${p.id}`)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-areca-600 hover:bg-areca-100"
                    title={t('common.generateReport')}
                  >
                    <FileText className="h-4 w-4" />
                  </button>
                  {confirmDelete === p.id ? (
                    <button
                      onClick={() => { deletePrediction(p.id); setConfirmDelete(null); }}
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                      title="Confirm delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setConfirmDelete(p.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-areca-400 hover:bg-red-50 hover:text-red-600"
                      title={t('common.delete')}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
