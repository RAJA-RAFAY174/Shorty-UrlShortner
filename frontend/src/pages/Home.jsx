
import { Link } from 'react-router-dom';
import { Zap, BarChart2, Shield } from 'lucide-react';

function Home() {
  return (
    <div className="min-h-screen">
      <header className="hero container">
        <h1 className="hero-title">Short links, big results</h1>
        <p className="hero-subtitle">
          A powerful URL shortener with analytics and QR codes. Create short links, share them anywhere, and track your success.
        </p>
        <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.2rem', padding: '16px 32px' }}>
          Start for Free
        </Link>
      </header>
      
      <section className="container" style={{ padding: '80px 24px' }}>
        <div className="card-grid">
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
            <Zap size={48} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Lightning Fast</h3>
            <p style={{ color: 'var(--text-muted)' }}>Create short links instantly and redirect your users without delay.</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
            <BarChart2 size={48} color="var(--secondary)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Detailed Analytics</h3>
            <p style={{ color: 'var(--text-muted)' }}>Track every click and understand your audience engagement.</p>
          </div>
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center' }}>
            <Shield size={48} color="var(--success)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>Secure & Reliable</h3>
            <p style={{ color: 'var(--text-muted)' }}>Your links are safe with us, utilizing modern security standards.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
