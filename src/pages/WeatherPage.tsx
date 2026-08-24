import { useI18n } from '@/i18n/I18nContext';
import { PageHeader, Badge } from '@/components/Layout';
import { DEMO_WEATHER, getWeatherTips } from '@/data/demoData';
import {
  CloudSun, Cloud, CloudRain, Sun, Droplets, CloudDrizzle,
  Thermometer, TrendingUp, Lightbulb, MapPin,
} from 'lucide-react';

const weatherIcons: Record<string, typeof Sun> = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  'partly-cloudy': CloudDrizzle,
};

const weatherColors: Record<string, string> = {
  sunny: 'bg-amber-100 text-amber-600',
  cloudy: 'bg-gray-100 text-gray-600',
  rainy: 'bg-blue-100 text-blue-600',
  'partly-cloudy': 'bg-areca-100 text-areca-600',
};

export function WeatherPage() {
  const { t, lang } = useI18n();
  const weather = DEMO_WEATHER;
  const tips = getWeatherTips(weather, lang);

  const CurrentIcon = weatherIcons[weather.current.condition];

  return (
    <div>
      <PageHeader
        title={t('weather.title')}
        subtitle={weather.current.location}
        icon={<CloudSun className="h-6 w-6" />}
      />

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Current weather */}
        <div className="card p-6 sm:p-8 animate-fade-in-up bg-gradient-to-br from-areca-50 to-white">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className={`flex h-20 w-20 items-center justify-center rounded-2xl ${weatherColors[weather.current.condition]}`}>
              <CurrentIcon className="h-10 w-10" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-sm text-areca-600">{t('weather.current')}</h3>
              <p className="text-4xl font-bold text-areca-900">{weather.current.temp}°C</p>
              <p className="text-sm text-areca-500 capitalize flex items-center justify-center sm:justify-start gap-1 mt-1">
                <MapPin className="h-3 w-3" /> {weather.current.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="rounded-xl bg-white/80 p-4 text-center border border-areca-100">
              <Thermometer className="h-5 w-5 text-areca-600 mx-auto mb-1" />
              <p className="text-xs text-areca-500">{t('weather.temp')}</p>
              <p className="text-lg font-bold text-areca-900">{weather.current.temp}°C</p>
            </div>
            <div className="rounded-xl bg-white/80 p-4 text-center border border-areca-100">
              <Droplets className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-areca-500">{t('weather.humidity')}</p>
              <p className="text-lg font-bold text-areca-900">{weather.current.humidity}%</p>
            </div>
            <div className="rounded-xl bg-white/80 p-4 text-center border border-areca-100">
              <CloudRain className="h-5 w-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs text-areca-500">{t('weather.rain')}</p>
              <p className="text-lg font-bold text-areca-900">{weather.current.rainProb}%</p>
            </div>
          </div>
        </div>

        {/* 7-day forecast */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-areca-600" />
            {t('weather.forecast')}
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
            {weather.forecast.map((day, i) => {
              const Icon = weatherIcons[day.condition];
              return (
                <div key={i} className="rounded-xl bg-areca-50 p-3 text-center">
                  <p className="text-xs font-semibold text-areca-700 mb-2">{day.day}</p>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${weatherColors[day.condition]} mx-auto mb-2`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-bold text-areca-900">{day.tempHigh}°</p>
                  <p className="text-xs text-areca-500">{day.tempLow}°</p>
                  <div className="flex items-center justify-center gap-0.5 mt-1.5 text-xs text-blue-500">
                    <CloudRain className="h-3 w-3" />
                    {day.rainProb}%
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weather-based farm tips */}
        <div className="card p-6 animate-fade-in-up">
          <h3 className="font-semibold text-areca-900 mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            {t('weather.tips')}
          </h3>
          <div className="space-y-3">
            {tips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-100 p-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 shrink-0">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <p className="text-sm text-areca-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Badge variant="demo">{t('common.demo')} — Weather API integration pending</Badge>
        </div>
      </div>
    </div>
  );
}
