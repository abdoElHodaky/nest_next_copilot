import { useState } from 'react';

export default function Home() {
  const [idea, setIdea] = useState('');
  const [sections, setSections] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sectionId, setSectionId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSections(null);
    try {
      const res = await fetch('http://localhost:3333/sections', { // adjust port if needed
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea }),
      });
      if (!res.ok) throw new Error((await res.json()).message || 'Failed to create sections');
      const data = await res.json();
      setSectionId(data.id);

      // Fetch stored sections
      const fetchRes = await fetch(`http://localhost:3333/sections/${data.id}`);
      const fetchData = await fetchRes.json();
      setSections(fetchData.sections);
    } catch (err: any) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 32 }}>
      <h1>Website Idea Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={idea}
          onChange={e => setIdea(e.target.value)}
          placeholder="Enter your website idea"
          disabled={loading}
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <button type="submit" disabled={loading || !idea}>Submit</button>
      </form>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {sections && (
        <div>
          <h2>Preview</h2>
          <ul>
            {sections.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}