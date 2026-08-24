import { useEffect, useRef, useState, type ReactNode } from 'react';

interface BarChartProps {
  data: { label: string; value: number; color?: string }[];
  height?: number;
  unit?: string;
}

export function BarChart({ data, height = 200, unit = '' }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end justify-around gap-2" style={{ height }}>
      {data.map((d, i) => {
        const h = (d.value / max) * (height - 40);
        return (
          <div key={i} className="flex flex-1 flex-col items-center gap-2">
            <span className="text-xs font-semibold text-areca-800">
              {d.value}
              {unit}
            </span>
            <div
              className="w-full max-w-[40px] origin-bottom rounded-t-lg transition-all duration-700 ease-out animate-grow-bar"
              style={{
                height: `${h}px`,
                backgroundColor: d.color || '#4aa055',
              }}
            />
            <span className="text-xs text-areca-600 text-center truncate w-full">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}

interface LineChartProps {
  data: { label: string; value: number }[];
  height?: number;
  color?: string;
  unit?: string;
}

export function LineChart({ data, height = 200, color = '#358240', unit = '' }: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animProgress, setAnimProgress] = useState(0);
  const width = 600;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const max = Math.max(...data.map((d) => d.value), 1);
  const min = 0;

  useEffect(() => {
    const timer = setTimeout(() => setAnimProgress(1), 100);
    return () => clearTimeout(timer);
  }, []);

  const points = data.map((d, i) => {
    const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartW;
    const y = padding.top + chartH - ((d.value - min) / (max - min)) * chartH;
    return { x, y, ...d };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
    .join(' ');

  const areaPath =
    `${linePath} L ${padding.left + chartW} ${padding.top + chartH} L ${padding.left} ${padding.top + chartH} Z`;

  return (
    <svg ref={svgRef} viewBox={`0 0 ${width} ${height}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line
          key={t}
          x1={padding.left}
          x2={padding.left + chartW}
          y1={padding.top + chartH * t}
          y2={padding.top + chartH * t}
          stroke="#e3f5e4"
          strokeWidth="1"
        />
      ))}
      <path
        d={areaPath}
        fill="url(#lineGrad)"
        style={{ opacity: animProgress, transition: 'opacity 1s ease-out' }}
      />
      <path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: 2000,
          strokeDashoffset: 2000 * (1 - animProgress),
          transition: 'stroke-dashoffset 1.5s ease-out',
        }}
      />
      {points.map((p, i) => (
        <g key={i} style={{ opacity: animProgress, transition: `opacity 0.5s ease-out ${i * 0.1}s` }}>
          <circle cx={p.x} cy={p.y} r="4" fill="white" stroke={color} strokeWidth="2" />
          <text x={p.x} y={padding.top + chartH + 20} textAnchor="middle" className="fill-areca-600" fontSize="11">
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

interface DonutChartProps {
  data: { label: string; value: number; color: string }[];
  size?: number;
  centerLabel?: string;
  centerValue?: string;
}

export function DonutChart({ data, size = 180, centerLabel, centerValue }: DonutChartProps) {
  const [animProgress, setAnimProgress] = useState(0);
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const radius = size / 2 - 20;
  const strokeWidth = 24;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const timer = setTimeout(() => setAnimProgress(1), 100);
    return () => clearTimeout(timer);
  }, []);

  let offset = 0;
  const segments = data.map((d, i) => {
    const fraction = (d.value / total) * circumference;
    const seg = {
      ...d,
      dasharray: `${fraction * animProgress} ${circumference}`,
      dashoffset: -offset * animProgress,
      key: i,
    };
    offset += fraction;
    return seg;
  });

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#f3faf3" strokeWidth={strokeWidth} />
        {segments.map((seg) => (
          <circle
            key={seg.key}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={seg.color}
            strokeWidth={strokeWidth}
            strokeDasharray={seg.dasharray}
            strokeDashoffset={seg.dashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease-out, stroke-dashoffset 1s ease-out' }}
          />
        ))}
      </svg>
      {(centerLabel || centerValue) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && <span className="text-2xl font-bold text-areca-900">{centerValue}</span>}
          {centerLabel && <span className="text-xs text-areca-600">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}

interface ProgressRingProps {
  value: number;
  size?: number;
  color?: string;
  label?: string;
  children?: ReactNode;
}

export function ProgressRing({ value, size = 120, color = '#4aa055', label, children }: ProgressRingProps) {
  const [animProgress, setAnimProgress] = useState(0);
  const radius = size / 2 - 8;
  const strokeWidth = 8;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = (value / 100) * circumference * animProgress;

  useEffect(() => {
    const timer = setTimeout(() => setAnimProgress(1), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={center} cy={center} r={radius} fill="none" stroke="#e3f5e4" strokeWidth={strokeWidth} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
        {label && <span className="text-xs text-areca-600 mt-0.5">{label}</span>}
      </div>
    </div>
  );
}
