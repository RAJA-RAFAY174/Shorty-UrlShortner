import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Trash2, ExternalLink, Activity, QrCode } from 'lucide-react';

function UrlCard({ url, onDelete }) {
  const [showQr, setShowQr] = useState(false);
  const shortUrl = `http://localhost:5000/${url.shortId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    // Could add a toast notification here
  };

  return (
    <>
      <div className="glass-panel url-card">
        <div className="url-header">
          <div style={{ overflow: 'hidden' }}>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="url-short">
              {url.shortId} <ExternalLink size={16} />
            </a>
            <div className="url-original mt-2" title={url.originalUrl}>
              {url.originalUrl}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={copyToClipboard} className="btn btn-outline" style={{ padding: '6px' }} title="Copy">
              <Copy size={16} />
            </button>
            <button onClick={() => setShowQr(true)} className="btn btn-outline" style={{ padding: '6px' }} title="QR Code">
              <QrCode size={16} />
            </button>
            <button onClick={() => onDelete(url._id)} className="btn btn-outline" style={{ padding: '6px', color: 'var(--danger)', borderColor: 'var(--danger)' }} title="Delete">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="url-stats">
          <div className="stat-item">
            <Activity size={16} color="var(--secondary)" />
            <span>{url.clicks} clicks</span>
          </div>
          <div className="stat-item" style={{ marginLeft: 'auto' }}>
            <span>{new Date(url.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {showQr && (
        <div className="modal-overlay" onClick={() => setShowQr(false)}>
          <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
            <h3 style={{ marginBottom: '16px' }}>QR Code</h3>
            <div className="qr-container">
              <QRCodeSVG value={shortUrl} size={200} level="H" includeMargin={true} />
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
              Scan to open the shortened link
            </p>
            <button className="btn btn-primary" onClick={() => setShowQr(false)} style={{ width: '100%' }}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UrlCard;
