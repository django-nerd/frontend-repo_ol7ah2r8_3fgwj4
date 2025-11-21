import { useState } from 'react'
import InfographicForm from './components/InfographicForm'
import InfographicView from './components/InfographicView'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const handleGenerate = async ({ text, title }) => {
    try {
      setLoading(true)
      setError(null)
      setData(null)

      const res = await fetch(`${baseUrl}/api/infographic`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ text, title }),
      })

      if (!res.ok) throw new Error('Sunucu hatası')
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />

      <header className="relative z-10 py-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Tam Otomatik İnfografik Üretici</h1>
        <p className="text-blue-200 mt-3">Türkçe karakter desteği ile metninizi görsele dönüştürün</p>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6 shadow-xl">
          <InfographicForm onGenerate={handleGenerate} loading={loading} />
          {error && <p className="mt-4 text-red-400">{error}</p>}
        </div>

        <div>
          {!data && !loading && (
            <div className="text-slate-300/80 border border-dashed border-slate-600 rounded-2xl p-8 text-center">
              Örnek bir metin girin ve "İnfografik Oluştur" butonuna basın.
            </div>
          )}
          {loading && (
            <div className="animate-pulse border border-slate-700 rounded-2xl p-8 text-slate-300/80">
              Metniniz analiz ediliyor, görseller hazırlanıyor…
            </div>
          )}
          {data && <InfographicView data={data} />}
        </div>
      </main>
    </div>
  )
}

export default App
