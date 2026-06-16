import  { useState, useEffect } from 'react';
import axios from 'axios';
import UrlCard from '../components/UrlCard';
import { Plus } from 'lucide-react';

function Dashboard() {
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchUrls = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/urls', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUrls(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const loadUrls = async () => {
      await fetchUrls();
    };

    loadUrls();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/urls', 
        { originalUrl, customAlias },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOriginalUrl('');
      setCustomAlias('');
      fetchUrls();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create short URL');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this URL?')) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/urls/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUrls(urls.filter(url => url._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div className="glass-panel" style={{ padding: '32px', marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '24px' }}>Create New Short Link</h2>
        {error && <div className="alert alert-error">{error}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
          <div className="form-group" style={{ flex: '1 1 300px', marginBottom: 0 }}>
            <label className="form-label">Destination URL</label>
            <input 
              type="url" 
              className="form-input" 
              placeholder="https://example.com/long-url"
              value={originalUrl} 
              onChange={(e) => setOriginalUrl(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group" style={{ flex: '1 1 200px', marginBottom: 0 }}>
            <label className="form-label">Custom Alias (Optional)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="my-link"
              value={customAlias} 
              onChange={(e) => setCustomAlias(e.target.value)} 
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ height: '44px' }}>
            <Plus size={18} /> {loading ? 'Creating...' : 'Shorten'}
          </button>
        </form>
      </div>

      <h2 style={{ marginBottom: '24px' }}>Your Links</h2>
      {urls.length === 0 ? (
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
          You haven't created any short links yet.
        </div>
      ) : (
        <div className="card-grid">
          {urls.map(url => (
            <UrlCard key={url._id} url={url} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
