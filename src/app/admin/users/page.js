'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Search,
    Plus,
    X,
    TrendingUp,
    Zap,
    History
} from 'lucide-react';

export default function ManageUsersPage() {
    const [showTopupModal, setShowTopupModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [topupAmount, setTopupAmount] = useState('1000');
    const [isProcessing, setIsProcessing] = useState(false);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/admin/users');
            const data = await res.json();
            if (Array.isArray(data)) setUsers(data);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleTopup = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: selectedUser.id, amount: topupAmount })
            });

            if (res.ok) {
                await fetchUsers(); // Refresh the list
                setShowTopupModal(false);
            } else {
                alert('Top-up failed');
            }
        } catch (error) {
            console.error('Top-up failed:', error);
        } finally {
            setIsProcessing(false);
        }
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
