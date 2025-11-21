import React, { useState } from 'react'

export default function InfographicForm({ onGenerate, loading }) {
  const [text, setText] = useState('')
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    onGenerate({ text, title: title.trim() || null })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">Başlık (opsiyonel)</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Örn: 2025 Dijital Pazarlama Trendleri"
          className="w-full rounded-lg bg-slate-800/60 border border-slate-700 text-slate-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-200 mb-2">Metin</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder={"Madde madde veya paragraflar halinde yazın.\nÖrnek:\nGenel Bakış:\n- %45 kullanıcı mobilde\n- Aylık 120.000 aktif kullanıcı\n- Gelirin %35'i abonelikten"}
          className="w-full rounded-lg bg-slate-800/60 border border-slate-700 text-slate-100 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? 'Oluşturuluyor…' : 'İnfografik Oluştur'}
      </button>
    </form>
  )
}
