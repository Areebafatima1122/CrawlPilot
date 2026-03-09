'use client';
import { motion } from 'framer-motion';
import {
    Star,
    Twitter,
    Linkedin,
    Users,
    PenTool,
    Gift,
    ArrowRight,
    Sparkles
} from 'lucide-react';

const tasks = [
    {
        title: "Trustpilot Review",
        desc: "Write an honest review about your Crawl Pilot experience.",
        reward: "+50 URLs",
        icon: <Star size={24} />,
        color: "#00b67a"
    },
    {
        title: "X (Twitter) Share",
        desc: "Share Crawl Pilot's discovery engine with your followers.",
        reward: "+25 URLs",
        icon: <Twitter size={24} />,
        color: "#000000"
    },
    {
        title: "LinkedIn Post",
        desc: "Write a professional post about Crawl Pilot on LinkedIn.",
        reward: "+25 URLs",
        icon: <Linkedin size={24} />,
        color: "#0077b5"
    },
    {
        title: "Refer a Peer",
        desc: "Invite colleagues to optimize their crawl budgets.",
        reward: "+100 URLs",
        icon: <Users size={24} />,
        color: "var(--primary)"
    },
    {
        title: "Blog Review",
        desc: "Write a detailed case study or review on your blog.",
        reward: "+250 URLs",
        icon: <PenTool size={24} />,
        color: "var(--accent)"
    },
];

export default function EarnPage() {
    return (
        <div className="earn-panel">
            <div className="panel-page-header">
                <h1 className="panel-page-title">Rewards Hub</h1>
                <p className="panel-page-subtitle">Boost your indexing power by completing simple community tasks.</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="panel-card mb-4"
                style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
                    color: 'white',
                    border: 'none',
                    padding: '40px'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <Gift size={20} /> <span style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Limited Time Bonus</span>
                        </div>
                        <h2 style={{ color: 'white', fontSize: '1.8rem', margin: 0 }}>Earn Extra 500 URLs</h2>
                        <p style={{ margin: '8px 0 0', opacity: 0.8, fontSize: '0.95rem' }}>Complete all featured tasks this month and unlock the Community Pioneer badge.</p>
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justify: 'center' }}
                    >
                        <Sparkles size={40} />
                    </motion.div>
                </div>
            </motion.div>

            <div className="task-list">
                {tasks.map((task, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="panel-card mb-3"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '24px'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '12px',
                                background: 'var(--bg-light)',
                                color: task.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid var(--border-color)'
                            }}>
                                {task.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{task.title}</h3>
                                <p className="text-xs text-muted" style={{ margin: 0 }}>{task.desc}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)' }}>{task.reward}</span>
                                <span className="text-xs text-muted">CREDITS</span>
                            </div>
                            <button className="btn btn-primary btn-sm">
                                Start Task <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
