'use client';

import { useState } from 'react';
import { supabase } from '@/supabase';

export default function ContactForm() {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const { error } = await supabase.from('messages').insert([{ content }]);
    console.log("Entry added:", content);

    setLoading(false);
    if (!error) {
      setStatus('success');
      setContent('');
    } else {
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
        className="flex-1 bg-neutral-200 dark:bg-neutral-800 px-3 py-2 text-sm rounded outline-none focus:ring-1 ring-neutral-400"
      />
      <button
        type="submit"
        disabled={loading}
        className="text-sm font-semibold hover:underline disabled:opacity-50"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      {status === 'success' && <span className="text-xs text-green-500 self-center">Sent!</span>}
    </form>
  );
}