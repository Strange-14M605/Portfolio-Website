'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      });

      let data = null;
      try {
        data = await res.json();
      } catch (parseErr) {
        const raw = await res.text().catch(() => null);
        console.error('Failed to parse JSON response from /api/contact', parseErr, raw);
        data = { raw };
      }
      console.log('Email send response:', data);

      setLoading(false);
      if (res.ok) {
        setStatus('success');
        setContent('');
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        placeholder="Drop a 'Hi'..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-1"
      />
      <button
        type="submit"
        disabled={loading}
        className="disabled:opacity-50"
      >
        {loading ? <i className="bi bi-send"></i> : <i className="bi bi-send-fill"></i>}
      </button>
      {status === 'success' && <span className="self-center"> Sent!</span>}
    </form>
  );
}