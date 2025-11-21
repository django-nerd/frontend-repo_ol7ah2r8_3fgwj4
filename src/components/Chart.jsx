import React from 'react'

export function BarChart({ items = [], colors = ['#0ea5e9', '#38bdf8', '#0369a1'] }) {
  if (!items || items.length === 0) return null
  const maxVal = Math.max(...items.map(i => i.value || 0)) || 1
  return (
    <div className="space-y-3">
      {items.map((it, idx) => {
        const w = Math.max(4, (it.value / maxVal) * 100)
        const color = colors[idx % colors.length]
        return (
          <div key={idx}>
            <div className="flex justify-between mb-1 text-sm">
              <span className="text-slate-200 truncate pr-2">{it.label}</span>
              <span className="text-slate-300 font-semibold">{Number(it.value).toLocaleString('tr-TR')}</span>
            </div>
            <div className="h-3 bg-slate-700/50 rounded">
              <div className="h-3 rounded" style={{ width: w + '%', backgroundColor: color }}></div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function DonutChart({ items = [], colors = ['#0ea5e9', '#38bdf8', '#0369a1', '#082f49'] }) {
  if (!items || items.length === 0) return null
  const total = items.reduce((a, b) => a + (b.value || 0), 0) || 1
  const size = 220
  const stroke = 22
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius

  let offsetAcc = 0

  return (
    <div className="flex items-center gap-6">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <g transform={`translate(${size / 2}, ${size / 2})`}>
          <circle r={radius} fill="none" stroke="#1f2937" strokeOpacity="0.4" strokeWidth={stroke} />
          {items.map((it, idx) => {
            const fraction = (it.value || 0) / total
            const length = fraction * circumference
            const dashArray = `${length} ${circumference - length}`
            const circle = (
              <circle
                key={idx}
                r={radius}
                fill="none"
                stroke={colors[idx % colors.length]}
                strokeWidth={stroke}
                strokeDasharray={dashArray}
                strokeDashoffset={-offsetAcc}
                transform="rotate(-90)"
                strokeLinecap="butt"
              />
            )
            offsetAcc += length
            return circle
          })}
        </g>
      </svg>
      <div className="grid grid-cols-1 gap-2">
        {items.map((it, idx) => (
          <div className="flex items-center gap-2" key={idx}>
            <span className="inline-block w-3 h-3 rounded" style={{ backgroundColor: colors[idx % colors.length] }}></span>
            <span className="text-slate-200 text-sm truncate">{it.label}</span>
            <span className="ml-auto text-slate-300 text-sm font-semibold">{Number(it.value).toLocaleString('tr-TR')}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Chart({ data, palette }) {
  if (!data) return null
  const colors = palette || ['#0ea5e9', '#38bdf8', '#0369a1', '#082f49']
  if (data.type === 'donut' || data.type === 'pie') {
    return <DonutChart items={data.items} colors={colors} />
  }
  return <BarChart items={data.items} colors={colors} />
}
