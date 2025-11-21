import React from 'react'
import Chart from './Chart'

export default function InfographicView({ data }) {
  if (!data) return null
  const { title, subtitle, palette, sections, highlight_stats, chart } = data

  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-700 p-6 md:p-8 shadow-xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: palette[0] }}>{title}</h2>
        {subtitle && <p className="text-slate-300 mt-2">{subtitle}</p>}
      </div>

      {highlight_stats && highlight_stats.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {highlight_stats.map((s, idx) => (
            <div key={idx} className="rounded-xl p-4 text-center" style={{ backgroundColor: palette[3] + '22', border: `1px solid ${palette[2]}33` }}>
              <div className="text-2xl font-bold" style={{ color: palette[1] }}>{Number(s.value).toLocaleString('tr-TR')}</div>
              <div className="text-slate-200 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {chart && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3 text-slate-200">Görsel Özet</h3>
          <div className="rounded-xl p-4" style={{ backgroundColor: palette[4] + '14', border: `1px solid ${palette[1]}33` }}>
            <Chart data={chart} palette={palette} />
          </div>
        </div>
      )}

      {sections && sections.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sections.map((sec, idx) => (
            <div key={idx} className="rounded-xl p-5" style={{ backgroundColor: palette[4] + '10', border: `1px solid ${palette[0]}22` }}>
              {sec.heading && <h4 className="text-lg font-bold mb-3" style={{ color: palette[0] }}>{sec.heading}</h4>}
              <ul className="space-y-2 list-disc list-inside">
                {sec.bullets.map((b, i) => (
                  <li key={i} className="text-slate-200">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
