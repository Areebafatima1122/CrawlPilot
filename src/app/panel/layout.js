'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Search,
    Code,
    CreditCard,
    History,
    User,
    Gift,
    Users,
    LifeBuoy,
    LogOut,
    ArrowLeft,
    Menu,
    X,
    Zap,
    Bell
} from 'lucide-react';
import './panel.css';

const navItems = [
    { href: '/panel/overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { href: '/panel/indexing', label: 'Indexing', icon: <Search size={20} /> },
    { href: '/panel/api', label: 'API Integration', icon: <Code size={20} /> },
    { href: '/panel/billing', label: 'Balance Top-Up', icon: <CreditCard size={20} /> },
    { href: '/panel/payments', label: 'Payment history', icon: <History size={20} /> },
    { href: '/panel/profile', label: 'My profile', icon: <User size={20} /> },
    { href: '/panel/earn', label: 'Earn URLs', icon: <Gift size={20} />, badge: 'BONUS' },
    { href: '/panel/referral', label: 'Referral program', icon: <Users size={20} /> },
    { href: '/panel/support', label: 'Support', icon: <LifeBuoy size={20} /> },
];

export default function PanelLayout({ children }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="panel-layout">
            {/* Mobile overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="panel-overlay"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`panel-sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="panel-sidebar-header">
                    <Link href="/" className="logo sidebar-logo">
                        <Zap className="logo-icon" size={24} fill="currentColor" />
                        Crawl <span>Pilot</span>
                    </Link>
                    <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)}>
                        <X size={20} />
                    </button>
                </div>

                <nav className="panel-nav">
                    <div className="nav-group-title">Discovery Engine</div>
                    {navItems.slice(0, 3).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`panel-nav-item ${pathname === item.href ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                            {item.badge && <span className="panel-nav-badge">{item.badge}</span>}
                        </Link>
                    ))}

                    <div className="nav-group-title">Organization</div>
                    {navItems.slice(3, 10).map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`panel-nav-item ${pathname === item.href ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                            {item.badge && <span className="panel-nav-badge">{item.badge}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="panel-sidebar-footer">
                    <Link href="/authorize" className="panel-nav-item">
                        <LogOut size={20} />
                        <span>Sign Out</span>
                    </Link>
                    <Link href="/" className="panel-nav-item back-btn">
                        <ArrowLeft size={20} />
                        <span>Back to Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main Container */}
            <main className="panel-main">
                <header className="panel-header">
                    <div className="header-left">
                        <button className="sidebar-toggle-btn" onClick={() => setSidebarOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <div className="breadcrumb">
                            <span>Dashboard</span>
                            <span className="separator">/</span>
                            <span className="current-page">{navItems.find(i => i.href === pathname)?.label || 'Overview'}</span>
                        </div>
                    </div>

                    <div className="header-right">
                        <Link href="/admin" className="btn btn-ghost btn-sm mr-2" style={{ color: 'var(--primary)', fontWeight: 800 }}>
                            Admin Center
                        </Link>
                        <button className="header-icon-btn"><Bell size={20} /></button>
                        <div className="panel-user-profile">
                            <div className="user-avatar">AD</div>
                            <div className="user-info">
                                <span className="user-name">Admin</span>
                                <span className="user-email">admin@crawlpilot.io</span>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="panel-content-area">
                    <motion.div
                        key={pathname}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
