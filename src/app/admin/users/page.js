'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    Plus,
    X,
    TrendingUp,
    Zap,
    History,
    MoreVertical,
    Check
} from 'lucide-react';

export default function ManageUsersPage() {
    const [showTopupModal, setShowTopupModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [topupAmount, setTopupAmount] = useState('1000');
    const [isProcessing, setIsProcessing] = useState(false);

    const [users, setUsers] = useState([
        { id: 1, name: 'Jack SEO', email: 'jack@example.com', plan: 'Free', balance: 100, joined: '2 days ago' },
        { id: 2, name: 'Shane SEO', email: 'shane.seo@gmail.com', plan: 'Growth', balance: 10240, joined: '1 week ago' },
        { id: 3, name: 'Alice Markets', email: 'alice@agency.io', plan: 'Agency', balance: 85200, joined: '1 month ago' },
        { id: 4, name: 'Bob Builder', email: 'bob@stack.com', plan: 'Enterprise', balance: 1200000, joined: '2 months ago' },
    ]);

    const handleTopup = (e) => {
        e.preventDefault();
        setIsProcessing(true);

        setTimeout(() => {
            setUsers(users.map(u =>
                u.id === selectedUser.id
                    ? { ...u, balance: u.balance + parseInt(topupAmount) }
                    : u
            ));
            setIsProcessing(false);
            setShowTopupModal(false);
            alert(`Successfully added ${topupAmount} URLs to ${selectedUser.email}`);
        }, 1200);
    };

    return (
        <div className="manage-users">
            <div className="admin-page-header">
                <h1 className="admin-page-title">User Management</h1>
                <p className="text-muted">Monitor user activity and manage credit top-ups.</p>
            </div>

            <div className="admin-card mb-8">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                    <div style={{ position: 'relative', width: '320px' }}>
                        <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} size={18} />
                        <input
                            type="text"
                            placeholder="Find user by email or name..."
                            style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '12px', border: '1px solid var(--border-color)' }}
                        />
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Plan</th>
                                <th>Balance</th>
                                <th>Joined</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div style={{ width: '36px', height: '36px', background: 'var(--bg-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem', color: 'var(--admin-primary)' }}>
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div style={{ fontWeight: 700 }}>{user.name}</div>
                                                <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`admin-badge ${user.plan === 'Free' ? 'badge-success' : 'badge-primary'}`} style={{
                                            background: user.plan === 'Enterprise' ? '#f5f3ff' : '',
                                            color: user.plan === 'Enterprise' ? '#7c3aed' : ''
                                        }}>
                                            {user.plan}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 700 }}>{user.balance.toLocaleString()}</div>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>URLs available</div>
                                    </td>
                                    <td style={{ color: 'var(--text-light)' }}>{user.joined}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <button
                                                className="admin-btn admin-btn-primary"
                                                style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                                                onClick={() => {
                                                    setSelectedUser(user);
                                                    setShowTopupModal(true);
                                                }}
                                            >
                                                <Plus size={14} /> Top-up
                                            </button>
                                            <button className="admin-btn" style={{ background: 'var(--bg-light)', padding: '6px' }}>
                                                <History size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Top-up Modal */}
            <AnimatePresence>
                {showTopupModal && selectedUser && (
                    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justify: 'center', padding: '20px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="admin-card"
                            style={{ width: '100%', maxWidth: '400px' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ margin: 0 }}>Add URL Credits</h3>
                                <button onClick={() => setShowTopupModal(false)}><X size={20} /></button>
                            </div>

                            <div style={{ marginBottom: '24px', padding: '16px', background: 'var(--admin-primary-light)', borderRadius: '12px', border: '1px solid var(--admin-primary)' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--admin-primary)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>Target Account</div>
                                <div style={{ fontWeight: 700 }}>{selectedUser.name}</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{selectedUser.email}</div>
                            </div>

                            <form onSubmit={handleTopup}>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px' }}>URL Amount</label>
                                    <input
                                        type="number"
                                        className="input"
                                        value={topupAmount}
                                        onChange={(e) => setTopupAmount(e.target.value)}
                                        style={{ width: '100%', border: '1px solid var(--border-color)' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                    {['100', '1000', '10000', '100000'].map(amt => (
                                        <button
                                            key={amt}
                                            type="button"
                                            className="admin-btn"
                                            onClick={() => setTopupAmount(amt)}
                                            style={{
                                                fontSize: '0.75rem',
                                                background: topupAmount === amt ? 'var(--admin-primary)' : 'var(--bg-light)',
                                                color: topupAmount === amt ? 'white' : 'var(--text-dark)'
                                            }}
                                        >
                                            +{parseInt(amt).toLocaleString()}
                                        </button>
                                    ))}
                                </div>

                                <button type="submit" className="admin-btn admin-btn-primary" style={{ width: '100%', padding: '12px', justifyContent: 'center' }} disabled={isProcessing}>
                                    {isProcessing ? 'Processing Transaction...' : 'Confirm Top-up'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
