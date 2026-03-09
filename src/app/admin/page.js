'use client';
import { motion } from 'framer-motion';
import {
    Users,
    Zap,
    TrendingUp,
    FileText,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    Search,
    Shield
} from 'lucide-react';

export default function AdminOverview() {
    // Zeroed out stats for clean state
    const stats = [
        { label: 'Total Users', value: '4', icon: <Users size={24} />, trend: '0%', isUp: true },
        { label: 'Active Discoveries', value: '0', icon: <Zap size={24} />, trend: '0%', isUp: true },
        { label: 'Total Revenue', value: '$0', icon: <TrendingUp size={24} />, trend: '0%', isUp: true },
        { label: 'Blog Posts', value: '0', icon: <FileText size={24} />, trend: '0%', isUp: true },
    ];

    return (
        <div className="admin-overview">
            <div className="admin-page-header">
                <h1 className="admin-page-title">Admin Dashboard</h1>
                <p className="text-muted">Welcome back, Super Admin. Tracking system health and performance.</p>
            </div>

            <div className="admin-stat-grid">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="admin-card"
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <div style={{ width: '48px', height: '48px', background: 'var(--bg-light)', color: 'var(--admin-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {stat.icon}
                            </div>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                color: '#10b981',
                                background: '#dcfce7',
                                padding: '4px 8px',
                                borderRadius: '8px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                height: 'fit-content'
                            }}>
                                <ArrowUpRight size={14} /> {stat.trend}
                            </div>
                        </div>
                        <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{stat.value}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-light)', fontWeight: 600 }}>{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div className="admin-card">
                    <h3 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>Recent Platform Activity</h3>
                    <div style={{ padding: '40px', textAlign: 'center' }}>
                        <Activity size={40} color="var(--border-color)" className="mb-2" style={{ margin: '0 auto' }} />
                        <p className="text-sm text-muted">Awaiting initial user logs and transactions...</p>
                    </div>
                </div>

                <div className="admin-card">
                    <h3 style={{ marginBottom: '24px', fontSize: '1.1rem' }}>Bot Traffic Share</h3>
                    <div style={{ padding: '20px', textAlign: 'center' }}>
                        <Shield size={32} color="var(--border-color)" className="mb-2" style={{ margin: '0 auto' }} />
                        <p className="text-xs text-muted">No crawling signals detected yet.</p>
                        <div style={{ width: '100%', height: '8px', background: 'var(--bg-light)', borderRadius: '4px', marginTop: '16px' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
