'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Copy,
    Check,
    Zap,
    Trophy,
    ArrowRight,
    Link as LinkIcon
} from 'lucide-react';

export default function ReferralPanelPage() {
    const [copied, setCopied] = useState(false);
    const link = 'https://crawlpilot.io/ref/user123abc';

    const copyLink = () => {
        navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const referralStats = [
        { label: "Total Referrals", value: "0", icon: <Users size={20} />, delay: 0.1 },
        { label: "URLs Earned", value: "0", icon: <Zap size={20} />, delay: 0.2 },
        { label: "Pending", value: "0", icon: <Trophy size={20} />, delay: 0.3 }
    ];

    return (
        <div className="referral-dashboard">
            <div className="panel-page-header">
                <h1 className="panel-page-title">Referral Program</h1>
                <p className="panel-page-subtitle">Help others discover faster and earn URL credits.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="panel-card mb-4"
                style={{ border: '2px dashed var(--primary-light)', background: 'rgba(99, 102, 241, 0.02)' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-light)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justify: 'center' }}>
                        <LinkIcon size={24} />
                    </div>
                    <div>
                        <h3 style={{ margin: 0 }}>Your Referral Link</h3>
                        <p className="text-sm text-muted">Earn 100 URL credits for every friend who starts a free trial.</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1, background: 'var(--bg-light)', padding: '12px 20px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-dark)' }}>
                        {link}
                    </div>
                    <button className="btn btn-primary" style={{ minWidth: '140px' }} onClick={copyLink}>
                        {copied ? <Check size={18} /> : <Copy size={18} />}
                        {copied ? 'Copied' : 'Copy Link'}
                    </button>
                </div>
            </motion.div>

            <div className="panel-stat-grid w-full">
                {referralStats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: stat.delay }}
                        className="panel-stat-card"
                    >
                        <div className="stat-card-header">
                            <div className="stat-card-icon">{stat.icon}</div>
                        </div>
                        <div className="panel-stat-value">{stat.value}</div>
                        <div className="panel-stat-label">{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div className="panel-card mt-4">
                <h3 className="mb-3">How it works</h3>
                <div className="grid grid-3 gap-4" style={{ marginTop: '24px' }}>
                    {[
                        { title: "Share Link", desc: "Send your link to friends or share on social media." },
                        { title: "They Join", desc: "When they create an account and verify their email." },
                        { title: "Get Rewarded", desc: "100 URLs are instantly added to your balance." }
                    ].map((step, i) => (
                        <div key={i} className="text-center" style={{ padding: '20px', background: 'var(--bg-light)', borderRadius: '16px' }}>
                            <div style={{ width: '32px', height: '32px', background: 'var(--primary)', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center', margin: '0 auto 16px', fontWeight: 800, fontSize: '0.8rem' }}>{i + 1}</div>
                            <h4 style={{ marginBottom: '8px' }}>{step.title}</h4>
                            <p className="text-xs text-muted" style={{ margin: 0 }}>{step.desc} <ArrowRight size={10} style={{ marginLeft: '4px' }} /></p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
