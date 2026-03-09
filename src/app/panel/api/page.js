'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Key,
    Copy,
    Check,
    RefreshCw,
    AlertTriangle,
    ArrowRight,
    Code,
    Terminal,
    ExternalLink
} from 'lucide-react';
import Link from 'next/link';

export default function ApiPanelPage() {
    const [copied, setCopied] = useState(false);
    const token = '463d3d9f7b956f5539a56d9e0c98bbf8';

    const copyToken = () => {
        navigator.clipboard.writeText(token);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const endpoints = [
        { method: 'GET', endpoint: '/balance', desc: 'Retrieve your current URL quota and submission limits.' },
        { method: 'GET', endpoint: '/index', desc: 'Trigger an immediate crawler discovery signal for a single URL.' },
        { method: 'POST', endpoint: '/index/bulk', desc: 'Perform high-volume multi-engine discovery via JSON batch.' },
        { method: 'GET', endpoint: '/index/status', desc: 'Query the last seen timestamp and status for a specific URL.' },
    ];

    return (
        <div className="api-panel">
            <div className="panel-page-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="panel-page-title">Developer Access</h1>
                        <p className="panel-page-subtitle">Integrate Crawl Pilot discovery engine into your stack.</p>
                    </div>
                    <Link href="/api-docs" target="_blank" className="btn btn-outline btn-sm">
                        Full Docs <ExternalLink size={14} style={{ marginLeft: '4px' }} />
                    </Link>
                </div>
            </div>

            <div className="panel-card mb-4">
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                        <Key size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0 }}>Core API Authentication</h3>
                        <p className="text-sm text-light">Include this token as a <code className="code">token</code> query parameter in every request.</p>
                    </div>
                </div>

                <div className="token-display-box" style={{ background: 'var(--bg-light)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <div style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '1.1rem', letterSpacing: '1px', color: 'var(--text-dark)', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        ••••••••••••••••••••••••••••••••
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn btn-primary" onClick={copyToken}>
                            {copied ? <Check size={18} /> : <Copy size={18} />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                        <button className="btn btn-outline" title="Reset Token (Warning: This will break existing integrations)">
                            <RefreshCw size={18} />
                        </button>
                    </div>
                </div>

                <div style={{ marginTop: '20px', padding: '16px', background: 'var(--warning-light)', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <AlertTriangle size={20} color="var(--warning)" />
                    <p className="text-xs" style={{ margin: 0, color: 'var(--text-body)' }}>
                        <strong>Security Alert:</strong> This token grants full administrative access to your URL balance. Keep it secure and rotate it if leaked.
                    </p>
                </div>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Fast Integration</h2>

            <div className="grid grid-2 gap-4">
                {endpoints.map((ep, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="panel-card"
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                            <span style={{
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.7rem',
                                fontWeight: 800,
                                background: ep.method === 'GET' ? 'var(--success-light)' : 'var(--primary-light)',
                                color: ep.method === 'GET' ? 'var(--success)' : 'var(--primary)'
                            }}>
                                {ep.method}
                            </span>
                            <code style={{ fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 600 }}>{ep.endpoint}</code>
                        </div>
                        <p className="text-sm" style={{ marginBottom: 0, minHeight: '40px' }}>{ep.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="panel-card mt-4" style={{ background: 'var(--console-bg)', color: 'white', border: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Terminal size={18} color="var(--primary)" />
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Quick cURL Test</span>
                </div>
                <pre style={{ margin: 0, padding: '16px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--success)', overflowX: 'auto' }}>
                    curl -X GET "https://api.crawlpilot.io/balance?token={token.slice(0, 8)}..."
                </pre>
            </div>
        </div>
    );
}
