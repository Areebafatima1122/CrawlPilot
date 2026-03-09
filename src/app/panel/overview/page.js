'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Zap,
    Search,
    BarChart3,
    Bot,
    ArrowUpRight,
    Clock,
    CheckCircle2,
    Activity
} from 'lucide-react';

export default function OverviewPage() {
    // Zeroed out bars for clean state
    const bars = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    return (
        <>
            <div className="panel-page-header">
                <h1 className="panel-page-title">Overview</h1>
                <p className="panel-page-subtitle">Your indexing activity at a glance.</p>
            </div>

            <div className="panel-stat-grid">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="panel-stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon"><Zap size={20} /></div>
                        <span className="stat-card-trend" style={{ background: 'var(--bg-light)', color: 'var(--text-light)' }}>0% change</span>
                    </div>
                    <div className="panel-stat-value">100</div>
                    <div className="panel-stat-label">URLs Remaining</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="panel-stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon"><Search size={20} /></div>
                        <span className="stat-card-trend" style={{ background: 'var(--bg-light)', color: 'var(--text-light)' }}>0% change</span>
                    </div>
                    <div className="panel-stat-value">0</div>
                    <div className="panel-stat-label">URLs Used</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="panel-stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon"><CheckCircle2 size={20} /></div>
                        <span className="stat-card-trend" style={{ background: 'var(--bg-light)', color: 'var(--text-light)' }}>0% change</span>
                    </div>
                    <div className="panel-stat-value">0</div>
                    <div className="panel-stat-label">Delivered</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="panel-stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon"><Bot size={20} /></div>
                        <span className="stat-card-trend" style={{ background: 'var(--bg-light)', color: 'var(--text-light)' }}>0% change</span>
                    </div>
                    <div className="panel-stat-value">0</div>
                    <div className="panel-stat-label">Bot Signals</div>
                </motion.div>
            </div>

            <div className="panel-card chart-card">
                <div className="chart-header">
                    <div className="chart-info">
                        <h3>Discovery Activity</h3>
                        <p className="text-sm text-muted">Daily bot crawl signals</p>
                    </div>
                    <div className="chart-legend">
                        <div className="legend-item"><span className="dot dot-primary"></span> Primary Crawlers</div>
                        <div className="legend-item"><span className="dot dot-accent"></span> AI Engine Bots</div>
                    </div>
                </div>

                <div className="chart-placeholder">
                    <div className="chart-bars">
                        {bars.map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 1, delay: i * 0.05 }}
                                className="chart-bar"
                            />
                        ))}
                        {/* If all 0, show a subtle prompt */}
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justify: 'center' }}>
                            <p className="text-xs text-muted" style={{ background: 'white', padding: '4px 12px', borderRadius: '12px' }}>Awaiting initial discovery data...</p>
                        </div>
                    </div>
                    <div className="chart-labels">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'].map(day => (
                            <span key={day}>{day}</span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-2 gap-4">
                <div className="panel-card">
                    <h3 className="mb-3">Quick Support</h3>
                    <p className="text-sm text-muted mb-4">Experiencing indexing delays? Our bot experts are here to help you optimize discovery.</p>
                    <Link href="/panel/support" className="btn btn-outline btn-block">Open Ticket</Link>
                </div>
                <div className="panel-card">
                    <h3 className="mb-3">Latest Bot Deliveries</h3>
                    <div className="empty-state" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
                        <Activity size={32} color="var(--border-color)" className="mb-2" />
                        <p className="text-sm text-muted">No activity recorded for this period.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
