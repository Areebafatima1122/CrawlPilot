'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    Activity,
    Terminal,
    Zap,
    CheckCircle2,
    Globe,
    AlertCircle,
    X,
    FileDown,
    RefreshCw,
    Gift,
    MoreVertical,
    ChevronRight,
    ExternalLink,
    Loader2,
    Send,
    Code2,
    Copy,
    Check,
    Radio,
    ZapOff,
    Settings,
    ShieldAlert,
    Network,
    FileCode
} from 'lucide-react';

export default function IndexingPanel() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [modalTab, setModalTab] = useState('List'); // 'List' or 'Sitemap'
    const [inputText, setInputText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [copied, setCopied] = useState(false);

    // Advanced Features
    const [selectedBots, setSelectedBots] = useState(['google', 'bing', 'openai']);
    const [signalIntensity, setSignalIntensity] = useState('standard');
    const [pingEnabled, setPingEnabled] = useState(true);

    const botOptions = [
        { id: 'google', name: 'GoogleBot', desc: 'Primary SEO crawler', color: '#4285F4' },
        { id: 'bing', name: 'BingBot', desc: 'Microsoft & Yahoo', color: '#00A4EF' },
        { id: 'openai', name: 'OpenAI Bot', desc: 'ChatGPT discovery', color: '#10A37F' },
        { id: 'baidu', name: 'Baidu Spider', desc: 'Asian market indexing', color: '#DE0000' },
        { id: 'yandex', name: 'Yandex Bot', desc: 'Eastern Europe / Russia', color: '#FFCC00' },
        { id: 'apple', name: 'AppleBot', desc: 'Siri & Spotlight hits', color: '#000000' },
        { id: 'pinterest', name: 'Pinterest Bot', desc: 'Visual discovery signaling', color: '#E60023' },
        { id: 'common', name: 'CommonCrawl', desc: 'Open data crawling', color: '#B0B0B0' }
    ];

    const [activeResults, setActiveResults] = useState([]);
    const [realTimeLogs, setRealTimeLogs] = useState([]);
    const consoleRef = useRef(null);

    const trackingScript = `<script src="https://crawlpilot.io/track.js?id=CP-394921" async></script>`;

    // Load data from localStorage on mount
    useEffect(() => {
        const savedResults = localStorage.getItem('cp_results');
        const savedLogs = localStorage.getItem('cp_logs');
        if (savedResults) setActiveResults(JSON.parse(savedResults));
        if (savedLogs) setRealTimeLogs(JSON.parse(savedLogs));
    }, []);

    // Save to localStorage whenever data changes
    useEffect(() => {
        localStorage.setItem('cp_results', JSON.stringify(activeResults));
    }, [activeResults]);

    useEffect(() => {
        localStorage.setItem('cp_logs', JSON.stringify(realTimeLogs));
    }, [realTimeLogs]);

    const toggleBot = (botId) => {
        if (selectedBots.includes(botId)) {
            setSelectedBots(selectedBots.filter(b => b !== botId));
        } else {
            setSelectedBots([...selectedBots, botId]);
        }
    };

    const copyCode = () => {
        navigator.clipboard.writeText(trackingScript);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let urls = [];
        const timestamp = new Date().toLocaleTimeString();

        if (modalTab === 'Sitemap') {
            const sitemapUrl = inputText.trim();
            if (!sitemapUrl) return;

            setIsSubmitting(true);

            // Simulate sitemap crawling
            setTimeout(() => {
                const base = sitemapUrl.split('/').slice(0, 3).join('/');
                urls = [
                    `${base}/about`,
                    `${base}/services`,
                    `${base}/blog/new-post-2026`,
                    `${base}/contact`,
                    `${base}/pricing`
                ];

                const sitemapLogs = [
                    `[${timestamp}] --- SYSTEM --- Sitemap Detected: ${sitemapUrl}`,
                    `[${timestamp}] --- SYSTEM --- Fetching XML structure...`,
                    `[${timestamp}] --- SYSTEM --- Successfully parsed sitemap: Found ${urls.length} URLs`
                ];
                setRealTimeLogs(prev => [...sitemapLogs, ...prev]);

                processUrls(urls, timestamp);
            }, 1200);
        } else {
            urls = inputText.split('\n').map(u => u.trim()).filter(u => u !== '');
            if (urls.length === 0) return;
            setIsSubmitting(true);
            processUrls(urls, timestamp);
        }
    };

    const processUrls = (urls, timestamp) => {
        const pingCycles = signalIntensity === 'extreme' ? 3 : signalIntensity === 'aggressive' ? 2 : 1;

        setTimeout(() => {
            const newItems = urls.map((url, index) => ({
                id: Date.now() + index,
                url: url,
                status: 'Delivered',
                time: 'Just now',
                bots: selectedBots
            }));

            // Prepend new results
            setActiveResults(prev => [...newItems, ...prev]);

            let newLogs = [];
            urls.forEach(url => {
                selectedBots.forEach(bot => {
                    newLogs.push(`[${timestamp}] --- PING --- ${bot.toUpperCase()} SERVICE --- Node Dispatched to ${url}`);
                });
                if (pingEnabled) {
                    newLogs.push(`[${timestamp}] --- BROADCAST --- Pinging Indexing Nodes (${pingCycles} cycles) for ${url}`);
                }
            });

            setRealTimeLogs(prev => [...newLogs, ...prev]);
            setIsSubmitting(false);
            setShowAddModal(false);
            setInputText('');
        }, 1000);
    };

    useEffect(() => {
        if (consoleRef.current) consoleRef.current.scrollTop = 0;
    }, [realTimeLogs]);

    return (
        <div className="indexing-panel">
            <div className="panel-page-header">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 className="panel-page-title">Discovery Console</h1>
                        <p className="panel-page-subtitle">Multi-Bot Indexing & Advanced Ping Signaling Engine.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-outline" onClick={() => setShowCodeModal(true)}>
                            <Code2 size={18} /> JS Tracker
                        </button>
                        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
                            <Plus size={18} /> New Discovery
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-3 gap-4 mb-4">
                <div className="panel-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px', color: 'var(--primary)' }}>
                        <Zap size={18} /> <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>INTENSITY</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-light)', padding: '4px', borderRadius: '12px' }}>
                        {['standard', 'aggressive', 'extreme'].map(lv => (
                            <button
                                key={lv}
                                onClick={() => setSignalIntensity(lv)}
                                style={{
                                    flex: 1,
                                    padding: '8px',
                                    borderRadius: '8px',
                                    fontSize: '0.7rem',
                                    fontWeight: 700,
                                    textTransform: 'uppercase',
                                    background: signalIntensity === lv ? 'white' : 'transparent',
                                    color: signalIntensity === lv ? 'var(--primary)' : 'var(--text-light)',
                                    boxShadow: signalIntensity === lv ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                                }}
                            >
                                {lv}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="panel-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px', color: 'var(--primary)' }}>
                        <Globe size={18} /> <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>ACTIVE BOTS</span>
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>{selectedBots.length} Engines</div>
                </div>
                <div className="panel-card" style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px', color: 'var(--primary)' }}>
                        <Activity size={18} /> <span style={{ fontWeight: 800, fontSize: '0.8rem' }}>AUTO-PING</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{pingEnabled ? 'ACTIVE' : 'DISABLED'}</span>
                        <div
                            onClick={() => setPingEnabled(!pingEnabled)}
                            style={{
                                width: '40px',
                                height: '22px',
                                background: pingEnabled ? 'var(--primary)' : 'var(--border-color)',
                                borderRadius: '20px',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                        >
                            <motion.div animate={{ x: pingEnabled ? 20 : 2 }} style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: 2 }} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="indexing-filters">
                <div className="filter-group">
                    <Search size={18} />
                    <input type="text" placeholder="Search URL..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </div>
                <div className="filter-group" style={{ maxWidth: '200px' }}>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={{ fontWeight: 600 }}>
                        <option>All Status</option>
                        <option>Delivered</option>
                        <option>Pending</option>
                    </select>
                </div>
                <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>Advanced Discovery</button>
            </div>

            <div className="panel-card mb-4" style={{ padding: 0, overflow: 'hidden' }}>
                <div className="indexing-console-header">
                    <div className="real-time-indicator"><div className="indicator-dot"></div> Live Signal Feed</div>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{ fontSize: '0.7rem', color: 'white' }}>Node: GLOBAL-EDGE-1</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--success)' }}>STATUS: OPTIMAL</div>
                    </div>
                </div>
                <div className="console" ref={consoleRef} style={{ height: '220px', overflowY: 'auto', background: 'var(--console-bg)', padding: '20px' }}>
                    {realTimeLogs.map((log, i) => (
                        <div key={i} className="console-line" style={{ marginBottom: '8px', opacity: 0.9, fontSize: '0.75rem', color: log.includes('PING') ? '#00e676' : log.includes('SYSTEM') ? '#ffab00' : '#fff' }}>
                            {log}
                        </div>
                    ))}
                    {!realTimeLogs.length && <div className="console-line opacity-50">Listening for botanical signals...</div>}
                </div>
                {realTimeLogs.length > 0 && (
                    <div style={{ padding: '8px 20px', background: '#1a1a1a', textAlign: 'right' }}>
                        <button
                            onClick={() => {
                                setRealTimeLogs([]);
                                localStorage.removeItem('cp_logs');
                            }}
                            style={{ fontSize: '0.65rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 800 }}
                        >
                            CLEAR LOGS
                        </button>
                    </div>
                )}
            </div>

            <div className="url-result-list">
                {activeResults.filter(r => r.url.toLowerCase().includes(searchQuery.toLowerCase())).map((res) => (
                    <motion.div key={res.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="panel-card url-result-card">
                        <div className="result-main">
                            <div className="result-url">
                                <span className="truncate" style={{ fontSize: '0.95rem', fontWeight: 700 }}>{res.url}</span>
                            </div>
                            <div className="bot-tag-list" style={{ marginTop: '8px' }}>
                                {res.bots.slice(0, 4).map(bot => (
                                    <div key={bot} className="bot-tag" style={{ background: botOptions.find(b => b.id === bot)?.color + '15', color: botOptions.find(b => b.id === bot)?.color }}>
                                        {bot.charAt(0).toUpperCase() + bot.slice(1)} Success
                                    </div>
                                ))}
                                {res.bots.length > 4 && <div className="bot-tag">+{res.bots.length - 4} more</div>}
                            </div>
                        </div>
                        <div className="result-meta">
                            <div className="badge badge-success" style={{ padding: '8px 16px' }}>
                                <CheckCircle2 size={16} /> INDEXING PINGED
                            </div>
                            <span className="text-xs text-muted" style={{ fontWeight: 800 }}>{res.time}</span>
                        </div>
                    </motion.div>
                ))}
                {!activeResults.length && (
                    <div className="panel-card" style={{ padding: '60px', textAlign: 'center', opacity: 0.6 }}>
                        <Network size={40} style={{ margin: '0 auto 16px' }} />
                        <p>No URLs in discovery queue. Submit your first URLs or Sitemap.</p>
                    </div>
                )}
            </div>

            {/* Advanced Discovery Modal */}
            <AnimatePresence>
                {showAddModal && (
                    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 110, display: 'flex', alignItems: 'center', justify: 'center', padding: '20px' }}>
                        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="panel-card" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
                                <h2 style={{ fontSize: '1.4rem' }}>Advanced Discovery Engine</h2>
                                <button onClick={() => setShowAddModal(false)}><X size={24} /></button>
                            </div>

                            <div style={{ padding: '32px' }}>
                                <div style={{ marginBottom: '32px' }}>
                                    <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border-color)', marginBottom: '24px' }}>
                                        {['List', 'Sitemap'].map(tab => (
                                            <button
                                                key={tab}
                                                onClick={() => setModalTab(tab)}
                                                style={{
                                                    padding: '12px 12px',
                                                    fontSize: '0.9rem',
                                                    fontWeight: 800,
                                                    color: modalTab === tab ? 'var(--primary)' : 'var(--text-light)',
                                                    borderBottom: `2px solid ${modalTab === tab ? 'var(--primary)' : 'transparent'}`,
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                {tab === 'List' ? <Plus size={16} style={{ display: 'inline', marginRight: '6px' }} /> : <FileCode size={16} style={{ display: 'inline', marginRight: '6px' }} />}
                                                {tab} Input
                                            </button>
                                        ))}
                                    </div>

                                    <label className="text-xs font-bold uppercase mb-3 block text-primary">
                                        {modalTab === 'List' ? 'Target URLs' : 'Sitemap URL'}
                                    </label>
                                    <textarea
                                        className="input"
                                        rows={modalTab === 'List' ? 6 : 2}
                                        placeholder={modalTab === 'List' ? "e.g. https://site.com/page-1\nhttps://site.com/page-2" : "e.g. https://yoursite.com/sitemap.xml"}
                                        value={inputText}
                                        onChange={(e) => setInputText(e.target.value)}
                                        style={{ width: '100%', border: '1px solid var(--border-color)', padding: '20px', borderRadius: '16px' }}
                                    />
                                    {modalTab === 'Sitemap' && (
                                        <p style={{ marginTop: '12px', fontSize: '0.75rem', color: 'var(--text-light)' }}>
                                            <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                            We will crawl this sitemap and automatically extract all internal links for indexing.
                                        </p>
                                    )}
                                </div>

                                <div style={{ marginBottom: '32px' }}>
                                    <label className="text-xs font-bold uppercase mb-4 block text-primary">Engine Selection</label>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                                        {botOptions.map(bot => (
                                            <div
                                                key={bot.id}
                                                onClick={() => toggleBot(bot.id)}
                                                style={{
                                                    padding: '16px',
                                                    borderRadius: '16px',
                                                    border: `1.5px solid ${selectedBots.includes(bot.id) ? bot.color : 'var(--border-color)'}`,
                                                    background: selectedBots.includes(bot.id) ? `${bot.color}08` : 'white',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s'
                                                }}
                                            >
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                    <div style={{ width: '32px', height: '32px', background: bot.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justify: 'center', color: 'white' }}>
                                                        <Search size={16} />
                                                    </div>
                                                    {selectedBots.includes(bot.id) && <CheckCircle2 size={18} color={bot.color} />}
                                                </div>
                                                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>{bot.name}</div>
                                                <div style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>{bot.desc}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ padding: '24px', background: 'var(--bg-light)', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <Settings size={18} />
                                            <span style={{ fontWeight: 800 }}>Signal Intensity</span>
                                        </div>
                                        <p className="text-xs text-muted mt-1">Increasing intensity sends multiple pings to discovery nodes.</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {['standard', 'aggressive', 'extreme'].map(lv => (
                                            <button
                                                key={lv}
                                                onClick={() => setSignalIntensity(lv)}
                                                style={{
                                                    padding: '8px 16px',
                                                    borderRadius: '10px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 800,
                                                    background: signalIntensity === lv ? 'var(--primary)' : 'white',
                                                    color: signalIntensity === lv ? 'white' : 'var(--text-dark)',
                                                    border: '1px solid var(--border-color)'
                                                }}
                                            >
                                                {lv[0].toUpperCase() + lv.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    className="btn btn-primary btn-block btn-lg mt-8"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !inputText.trim() || selectedBots.length === 0}
                                    style={{ height: '64px', borderRadius: '16px', fontSize: '1.1rem' }}
                                >
                                    {isSubmitting ? <Loader2 size={24} className="animate-spin" /> : <>Initiate Multi-Bot Signal Dispatched <Send size={24} style={{ marginLeft: '12px' }} /></>}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Tracker Modal */}
            <AnimatePresence>
                {showCodeModal && (
                    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 110, display: 'flex', alignItems: 'center', justify: 'center', padding: '20px' }}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="panel-card" style={{ width: '100%', maxWidth: '600px', padding: '32px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                                <h3 style={{ margin: 0 }}>Install Bot Tracker</h3>
                                <button onClick={() => setShowCodeModal(false)}><X size={24} /></button>
                            </div>
                            <pre style={{ background: '#121212', color: '#00e676', padding: '24px', borderRadius: '12px', overflow: 'auto' }}>{trackingScript}</pre>
                            <button className="btn btn-primary btn-block mt-4" onClick={copyCode}>{copied ? 'Copied!' : 'Copy Snippet'}</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
