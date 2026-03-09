'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    User,
    Mail,
    Lock,
    Shield,
    Save,
    Settings,
    Bell,
    HardDrive,
    Loader2
} from 'lucide-react';

export default function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch('/api/user/profile');
                const data = await res.json();
                if (!data.error) setProfile(data);
            } catch (err) {
                console.error("Profile fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        alert('Update functionality (API) will be available in the next release.');
    };

    if (isLoading) {
        return (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 size={32} className="animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="profile-panel">
            <div className="panel-page-header">
                <h1 className="panel-page-title">Identity & Security</h1>
                <p className="panel-page-subtitle">Manage your account credentials and security preferences.</p>
            </div>

            <div className="grid grid-2 gap-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="panel-card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ width: '40px', height: '40px', background: 'var(--primary-light)', color: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justify: 'center' }}>
                            <User size={24} />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Basic Information</h2>
                    </div>

                    <form onSubmit={handleSave}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Full Name</label>
                                <div style={{ position: 'relative' }}>
                                    <input type="text" className="input" defaultValue={profile?.name || ""} style={{ paddingLeft: '40px', width: '100%' }} />
                                    <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-light)' }} />
                                </div>
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Account Email</label>
                                <div style={{ position: 'relative' }}>
                                    <input type="email" className="input" defaultValue={profile?.email || ""} readOnly style={{ paddingLeft: '40px', background: 'var(--bg-light)', width: '100%' }} />
                                    <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-light)' }} />
                                </div>
                                <p className="text-xs text-muted mt-2">To change your email, contact engineering support.</p>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <Save size={16} /> Save Identity Changes
                            </button>
                        </div>
                    </form>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="panel-card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                        <div style={{ width: '40px', height: '40px', background: '#fff3e0', color: '#ff9800', borderRadius: '10px', display: 'flex', alignItems: 'center', justify: 'center' }}>
                            <Lock size={24} />
                        </div>
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Security & Password</h2>
                    </div>

                    <form onSubmit={handleSave}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>Current Password</label>
                                <input type="password" className="input" placeholder="••••••••" style={{ width: '100%' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '0.85rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>New Intelligence Password</label>
                                <input type="password" className="input" placeholder="New strong password" style={{ width: '100%' }} />
                            </div>
                            <button type="submit" className="btn btn-primary btn-outline">
                                <Shield size={16} /> Update Security Key
                            </button>
                        </div>
                    </form>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="panel-card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <Bell size={20} color="var(--primary)" />
                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Notifications</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked /> Email alerts on low URL balance
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', cursor: 'pointer' }}>
                            <input type="checkbox" defaultChecked /> Monthly discovery performance reports
                        </label>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="panel-card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <HardDrive size={20} color="var(--primary)" />
                        <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Data & Privacy</h3>
                    </div>
                    <p className="text-xs text-muted mb-4">Export your crawl logs or delete your account history. This action is permanent and cannot be undone.</p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-ghost btn-sm flex-1">Export Logs</button>
                        <button className="btn btn-outline btn-sm flex-1" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }}>Terminate Account</button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
