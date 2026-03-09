'use client';
import { motion } from 'framer-motion';
import {
    Zap,
    Check,
    CreditCard,
    ShieldCheck,
    ArrowRight,
    TrendingUp,
    Star
} from 'lucide-react';
import Link from 'next/link';

const plans = [
    {
        name: "10,000 URLs",
        discount: "15% off",
        price: "$169",
        regular: "$200",
        badge: "Growth",
        color: "var(--primary)",
        features: ["10,000 Premium Discoveries", "Instant Bot Signaling", "Standard API Access", "Email Support", "Live Crawl Logs"]
    },
    {
        name: "100,000 URLs",
        discount: "25% off",
        price: "$1,499",
        regular: "$2,000",
        badge: "Recommended",
        recommended: true,
        color: "var(--accent)",
        features: ["100,000 High-Volume URLs", "Priority Node Routing", "Full API Integration", "Dedicated Support", "Discovery Analytics"]
    },
    {
        name: "1,000,000 URLs",
        discount: "50% off",
        price: "$9,999",
        regular: "$20,000",
        badge: "Scale",
        color: "var(--text-dark)",
        features: ["Enterprise Submission Pool", "Custom Signaling Nodes", "Direct API Consultation", "24/7 Priority Desk", "White-label Reports"]
    },
];

export default function BillingPage() {
    return (
        <div className="billing-panel">
            <div className="panel-page-header">
                <h1 className="panel-page-title">Fuel Discovery</h1>
                <p className="panel-page-subtitle">Refill your URL credits and unlock mass indexing capabilities.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="panel-card mb-4"
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'linear-gradient(90deg, var(--bg-white) 0%, var(--bg-light) 100%)',
                    padding: '32px'
                }}
            >
                <div>
                    <p className="text-sm font-bold text-muted uppercase letter-spacing-1">Current Balance</p>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span className="panel-stat-value" style={{ fontSize: '2.5rem' }}>100</span>
                        <span className="text-primary font-bold">URLs Available</span>
                    </div>
                </div>
                <div style={{ padding: '12px 20px', background: 'var(--success-light)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <TrendingUp size={20} color="var(--success)" />
                    <span className="text-sm font-bold" style={{ color: 'var(--success)' }}>Free Tier Active</span>
                </div>
            </motion.div>

            <div className="grid grid-3 gap-4" style={{ marginTop: '40px' }}>
                {plans.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`panel-card ${p.recommended ? 'is-recommended' : ''}`}
                        style={{
                            padding: 0,
                            overflow: 'hidden',
                            border: p.recommended ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                            position: 'relative'
                        }}
                    >
                        {p.badge && (
                            <div style={{
                                padding: '8px',
                                background: p.recommended ? 'var(--primary)' : 'var(--bg-light)',
                                color: p.recommended ? 'white' : 'var(--text-light)',
                                textAlign: 'center',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                borderBottom: '1px solid var(--border-color)'
                            }}>
                                {p.badge}
                            </div>
                        )}
                        <div style={{ padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <h3 style={{ fontSize: '1.25rem' }}>{p.name}</h3>
                                {p.recommended && <Star size={18} color="var(--primary)" fill="currentColor" />}
                            </div>

                            <div style={{ margin: '24px 0 8px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-dark)' }}>{p.price}</span>
                                <span className="text-sm text-muted"><s>{p.regular}</s></span>
                            </div>
                            <div className="badge badge-success mb-3">{p.discount} SAVINGS</div>

                            <ul style={{ padding: '16px 0', borderTop: '1px solid var(--border-light)', marginTop: '16px' }}>
                                {p.features.map((f, j) => (
                                    <li key={j} style={{ padding: '8px 0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <Check size={14} color="var(--primary)" strokeWidth={3} /> {f}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`btn ${p.recommended ? 'btn-primary' : 'btn-outline'} btn-block`}
                                style={{ marginTop: '16px' }}
                            >
                                Checkout Now <ArrowRight size={16} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div style={{ marginTop: '40px', padding: '24px', background: 'var(--bg-light)', borderRadius: '16px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'center', gap: '40px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <ShieldCheck size={18} color="var(--success)" /> SECURE 256-BIT SSL ENCRYPTION
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-light)', fontSize: '0.85rem', fontWeight: 600 }}>
                    <CreditCard size={18} color="var(--primary)" /> ALL MAJOR CARDS & CRYPTO
                </div>
            </div>
        </div>
    );
}
