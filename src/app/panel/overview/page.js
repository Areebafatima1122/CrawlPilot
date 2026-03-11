'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
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
    const [stats, setStats] = useState({
        balance: 0,
        used: 0,
        delivered: 0,
        botSignals: 0
    });
    const [bars, setBars] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [recentResults, setRecentResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch comprehensive stats from new API (no 50 record limit)
                const resStats = await fetch('/api/user/stats');
                const statsData = await resStats.json();

                // Fetch recent results for the list
                const resResults = await fetch('/api/indexing/discover');
                const results = await resResults.json();

                if (statsData && !statsData.error) {
                    setStats({
                        balance: statsData.balance || 0,
                        used: statsData.totalUrls || 0,
                        delivered: statsData.delivered || 0,
                        botSignals: statsData.totalBotSignals || 0
                    });

                    // Calculate bars from daily stats
                    if (statsData.dailyStats) {
                        const dailyCounts = new Array(14).fill(0);
                        const today = new Date();

                        statsData.dailyStats.forEach(stat => {
                            const date = new Date(stat.createdAt);
                            const diffDays = Math.floor((today - date) / (1000 * 60 * 60 * 24));
                            if (diffDays >= 0 && diffDays < 14) {
                                dailyCounts[13 - diffDays] += stat._count.id;
                            }
                        });

                        const maxVal = Math.max(...dailyCounts);
                        const relativeBars = dailyCounts.map(v => maxVal === 0 ? 0 : Math.max(15, (v / maxVal) * 80));
                        setBars(relativeBars);
                    }
                }

                if (Array.isArray(results)) {
                    setRecentResults(results.slice(0, 3));
                }
            } catch (err) {
                console.error("Failed to load overview data:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();

        // Set up polling for real-time updates
        const interval = setInterval(() => {
            fetchStats();
        }, 5000); // Poll every 5 seconds

        return () => clearInterval(interval);
    }, []);

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
                    <div className="panel-stat-value">{isLoading ? '...' : stats.balance.toLocaleString()}</div>
                    <div className="panel-stat-label">URLs Remaining</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="panel-stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon"><Search size={20} /></div>
                        <span className="stat-card-trend" style={{ background: 'var(--bg-light)', color: 'var(--text-light)' }}>+0.00%</span>
                    </div>
                    <div className="panel-stat-value">{isLoading ? '...' : stats.used}</div>
                    <div className="panel-stat-label">URLs Used</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="panel-stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon"><CheckCircle2 size={20} /></div>
                        <span className="stat-card-trend" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)' }}>100% Success</span>
                    </div>
                    <div className="panel-stat-value">{isLoading ? '...' : stats.delivered}</div>
                    <div className="panel-stat-label">Delivered</div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="panel-stat-card">
                    <div className="stat-card-header">
                        <div className="stat-card-icon"><Bot size={20} /></div>
                        <span className="stat-card-trend" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>Live Signal</span>
                    </div>
                    <div className="panel-stat-value">{isLoading ? '...' : stats.botSignals}</div>
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
                        {!isLoading && bars.every(h => h === 0) && (
                            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justify: 'center' }}>
                                <p className="text-xs text-muted" style={{ background: 'white', padding: '4px 12px', borderRadius: '12px' }}>Awaiting initial discovery data...</p>
                            </div>
                        )}
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
                    {recentResults.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {recentResults.map((res, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: 'var(--bg-light)', borderRadius: '12px' }}>
                                    <div style={{ wordBreak: 'break-all', fontSize: '0.8rem', fontWeight: 600 }}>
                                        {res.url.substring(0, 30)}{res.url.length > 30 ? '...' : ''}
                                    </div>
                                    <div className="badge badge-success" style={{ fontSize: '0.7rem' }}>Live</div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state" style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '120px' }}>
                            <Activity size={32} color="var(--border-color)" className="mb-2" />
                            <p className="text-sm text-muted">No activity recorded for this period.</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
