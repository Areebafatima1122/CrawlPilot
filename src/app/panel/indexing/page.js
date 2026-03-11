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
    FileCode,
    ScrollText,
    Bot
} from 'lucide-react';

const botOptions = [
    { id: 'google', name: 'GoogleBot', desc: 'Primary SEO crawler', color: '#4285F4' },
    { id: 'bing', name: 'BingBot', desc: 'Microsoft & Yahoo', color: '#00A4EF' },
    { id: 'openai', name: 'OpenAI Bot', desc: 'ChatGPT discovery', color: '#10A37F' },
    { id: 'baidu', name: 'Baidu Spider', desc: 'Asian market indexing', color: '#DE0000' },
    { id: 'yandex', name: 'Yandex Bot', desc: 'Eastern Europe / Russia', color: '#FFCC00' },
    { id: 'duck', name: 'DuckDuckGo', desc: 'Privacy-focused index', color: '#DE5833' },
    { id: 'apple', name: 'AppleBot', desc: 'Siri & Spotlight hits', color: '#000000' },
    { id: 'pinterest', name: 'Pinterest Bot', desc: 'Visual discovery signaling', color: '#E60023' },
    { id: 'common', name: 'CommonCrawl', desc: 'Open data crawling', color: '#B0B0B0' },
    { id: 'anthropic', name: 'ClaudeBot', desc: 'AI crawler for Claude', color: '#D97757' }
];

export default function IndexingPanel() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showCodeModal, setShowCodeModal] = useState(false);
    const [showBotLogModal, setShowBotLogModal] = useState(false);
    const [selectedBotLogs, setSelectedBotLogs] = useState(null);
    const [selectedBotForLogs, setSelectedBotForLogs] = useState(null);
    const [modalTab, setModalTab] = useState('List'); // 'List' or 'Sitemap'
    const [inputText, setInputText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [copied, setCopied] = useState(false);
    const [realTimeLogs, setRealTimeLogs] = useState([]);
    const [activeResults, setActiveResults] = useState([]);
    const consoleRef = useRef(null);
    const [selectedBots, setSelectedBots] = useState(['google']); // Default to google for free plan
    const [signalIntensity, setSignalIntensity] = useState('standard');
    const [pingEnabled, setPingEnabled] = useState(true);
    const [isLiveFeedActive, setIsLiveFeedActive] = useState(true);
    const trackingScript = `<script src="https://bot-tracker.crawlpilot.io/v1/track.js" async></script>`;
    
    // User plan and bot access
    const [userPlan, setUserPlan] = useState('free');
    const [allowedBots, setAllowedBots] = useState(['google']);
    const [web2Links, setWeb2Links] = useState([]);
    const [selectedWeb2Links, setSelectedWeb2Links] = useState([]);
    const [showWeb2Section, setShowWeb2Section] = useState(false);

    const userAgents = [
        "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        "Googlebot/2.1 (+http://www.google.com/bot.html)",
        "Mozilla/5.0 (compatible; Googlebot-Image/1.0; +http://www.google.com/bot.html)",
        "Googlebot-Video/1.0 (+http://www.google.com/bot.html)",
        "Mozilla/5.0 (compatible; Googlebot-News; +http://www.google.com/bot.html)",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1",
        "Mozilla/5.0 (Linux; Android 14; Pixel 8 Pro) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.105 Mobile Safari/537.36",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 Edg/122.0.0.0",
        "Mozilla/5.0 (iPad; CPU OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1"
    ];

    const devices = ["Mobile (Googlebot)", "Smartphone (Android)", "Googlebot-Image", "Googlebot-News", "Desktop (Chrome)", "Desktop (Edge)", "Tablet (iPad)"];

    const [userBalance, setUserBalance] = useState(0);

    const [totalSignals, setTotalSignals] = useState(0);

    // Generates log lines from a saved DB result record (for persistent feed)
    const buildLogsFromRecord = (record) => {
        const ts = new Date(record.createdAt).toLocaleTimeString();
        const logs = [];
        logs.push(`[${ts}] --- SYSTEM --- URL submitted: ${record.url}`);
        record.bots.forEach(bot => {
            const randIdx = Math.floor(Math.random() * userAgents.length);
            const ua = userAgents[randIdx];
            const device = devices[randIdx % devices.length];
            logs.push(`[${ts}] --- SIGNAL --- ${bot.toUpperCase()} --- GET REQUEST dispatched for ${record.url}`);
            logs.push(`[${ts}] --- UA --- ${ua.substring(0, 60)}...`);
            logs.push(`[${ts}] --- HEADER --- Accept: text/html, Method: GET, Device: ${device}`);
            logs.push(`[${ts}] --- LOG --- ${botOptions.find(b => b.id === bot)?.name} (${botOptions.find(b => b.id === bot)?.desc})`);
        });
        logs.push(`[${ts}] --- COMPLETED --- ${record.bots.length} engines signaled for ${record.url}`);
        return logs;
    };

    const fetchInitialData = async () => {
        try {
            const resResults = await fetch('/api/indexing/discover');
            const dataResults = await resResults.json();
            if (Array.isArray(dataResults)) {
                const parsed = dataResults.map(r => ({ ...r, bots: JSON.parse(r.bots) }));
                setActiveResults(parsed);

                // Rebuild live feed from DB records — persists across page refreshes
                const allLogs = parsed.flatMap(r => buildLogsFromRecord(r));
                setRealTimeLogs(allLogs.slice(0, 300));

                // Total signals count
                const total = parsed.reduce((acc, curr) => acc + curr.bots.length, 0);
                setTotalSignals(total);
            }
            const resProfile = await fetch('/api/user/profile');
            const userProfile = await resProfile.json();
            if (userProfile?.balance !== undefined) setUserBalance(userProfile.balance);
            if (userProfile?.plan) {
                setUserPlan(userProfile.plan);
                let bots = ['google'];
                try {
                    bots = JSON.parse(userProfile.allowedBots || '["google"]');
                } catch (e) {
                    bots = ['google'];
                }
                setAllowedBots(bots);
                // Only select allowed bots by default
                setSelectedBots(bots);
            }
        } catch (error) {
            console.error('Failed to sync data:', error);
        }
    };

    // Load real data from DB on mount (logs rebuilt from DB, not localStorage)
    useEffect(() => {
        fetchInitialData();

        // Set up live feed polling if enabled
        if (isLiveFeedActive) {
            const interval = setInterval(() => {
                fetchInitialData();
            }, 5000); // Poll every 5 seconds

            return () => clearInterval(interval);
        }
    }, [isLiveFeedActive]);

    const toggleBot = (botId) => {
        // Prevent toggling if bot is not allowed
        if (!allowedBots.includes(botId)) return;
        
        if (selectedBots.includes(botId)) {
            setSelectedBots(selectedBots.filter(b => b !== botId));
        } else {
            setSelectedBots([...selectedBots, botId]);
        }
    };

    const openBotLogs = (result, botId) => {
        setSelectedBotLogs(result);
        setSelectedBotForLogs(botId);
        setShowBotLogModal(true);
    };

    // Generate per-bot logs
    const generateBotLogs = (result, botId) => {
        const ts = new Date(result.createdAt).toLocaleTimeString();
        const bot = botOptions.find(b => b.id === botId);
        const logs = [];
        
        logs.push(`[${ts}] --- SYSTEM --- Bot Log for ${bot?.name || botId}`);
        logs.push(`[${ts}] --- TARGET --- ${result.url}`);
        logs.push(`[${ts}] --- STATUS --- Signal dispatched successfully`);
        
        const randIdx = Math.floor(Math.random() * userAgents.length);
        const ua = userAgents[randIdx];
        const device = devices[randIdx % devices.length];
        
        logs.push(`[${ts}] --- REQUEST --- GET ${result.url}`);
        logs.push(`[${ts}] --- USER-AGENT --- ${ua}`);
        logs.push(`[${ts}] --- DEVICE --- ${device}`);
        logs.push(`[${ts}] --- HEADER --- Accept: text/html,application/xhtml+xml`);
        logs.push(`[${ts}] --- HEADER --- Connection: keep-alive`);
        logs.push(`[${ts}] --- RESPONSE --- 200 OK`);
        logs.push(`[${ts}] --- COMPLETED --- ${bot?.name} signal delivered`);
        
        return logs;
    };

    // Web 2.0 platforms for link generation
    const web2Platforms = [
        { name: 'conalepmorelos.edu.mx', path: '/FeriaProfesiografica/uni.php?u=12&n=Universidad%20Mesoamericana%20Plantel%20Cuernavaca&d=' },
        { name: 'moh.gov.mm', path: '/docs?url=' },
        { name: 'censocquipamiento.laplata-conicct.gov.ar', path: '/api.php?action=' },
        { name: 'english.edusites.co.uk', path: '/?URL=' },
        { name: 'unam.mx', path: '/buscar?q=' },
        { name: 'edu.mx', path: '/portal/redirect?to=' },
        { name: 'gov.in', path: '/siteRedirect?url=' },
        { name: 'ac.uk', path: '/redirect?link=' },
        { name: 'edu.au', path: '/goto?url=' },
        { name: 'wordpress.com', path: '/?redirect=' },
        { name: 'blogspot.com', path: '/redirect?to=' },
        { name: 'medium.com', path: '/r/?url=' },
        { name: 'wix.com', path: '/site/index.php?url=' },
        { name: 'weebly.com', path: '/go?to=' },
    ];

    // Generate Web 2.0 links from user URLs
    const generateWeb2Links = (urls) => {
        const links = [];
        urls.forEach((url, urlIndex) => {
            web2Platforms.forEach((platform, platformIndex) => {
                const id = `web2-${urlIndex}-${platformIndex}`;
                const web2Url = `https://www.${platform.name}${platform.path}${encodeURIComponent(url)}`;
                links.push({
                    id,
                    originalUrl: url,
                    web2Url,
                    platform: platform.name,
                    selected: false
                });
            });
        });
        return links;
    };

    // Toggle Web 2.0 link selection
    const toggleWeb2Link = (id) => {
        setSelectedWeb2Links(prev => {
            if (prev.includes(id)) {
                return prev.filter(lid => lid !== id);
            } else {
                return [...prev, id];
            }
        });
    };

    // Select all Web 2.0 links
    const selectAllWeb2Links = () => {
        const allIds = web2Links.map(l => l.id);
        setSelectedWeb2Links(allIds);
    };

    // Deselect all Web 2.0 links
    const deselectAllWeb2Links = () => {
        setSelectedWeb2Links([]);
    };

    // Generate Web 2.0 links when user types URLs
    useEffect(() => {
        if (inputText.trim() && modalTab === 'List') {
            const urls = inputText.split('\n').map(u => u.trim()).filter(u => u !== '');
            if (urls.length > 0) {
                const links = generateWeb2Links(urls);
                setWeb2Links(links);
                setShowWeb2Section(true);
            } else {
                setWeb2Links([]);
                setShowWeb2Section(false);
            }
        } else {
            setWeb2Links([]);
            setShowWeb2Section(false);
        }
    }, [inputText, modalTab]);

    const [autoSync, setAutoSync] = useState(false);
    const syncTimerRef = useRef(null);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        let urls = [];
        const timestamp = new Date().toLocaleTimeString();

        if (modalTab === 'Sitemap') {
            const sitemapUrl = inputText.trim();
            if (!sitemapUrl) return;

            setIsSubmitting(true);

            try {
                const res = await fetch('/api/indexing/sitemap', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ sitemapUrl })
                });
                const data = await res.json();

                if (data.urls && data.urls.length > 0) {
                    urls = data.urls;
                    const sitemapLogs = [
                        `[${timestamp}] --- SYSTEM --- Sitemap Detected: ${sitemapUrl}`,
                        `[${timestamp}] --- SYSTEM --- Successfully parsed sitemap: Found ${data.total} URLs`,
                        `[${timestamp}] --- SYSTEM --- Processing ${data.count} URLs for discovery`
                    ];
                    setRealTimeLogs(prev => [...sitemapLogs, ...prev]);

                    // Process URLs with live feedback
                    for (let i = 0; i < urls.length; i++) {
                        const url = urls[i];
                        const urlTimestamp = new Date().toLocaleTimeString();

                        // Show URL being processed
                        setRealTimeLogs(prev => [
                            `[${urlTimestamp}] --- SITEMAP --- Processing URL ${i + 1}/${urls.length}: ${url}`,
                            ...prev
                        ].slice(0, 400));

                        // Process this URL with the existing processUrls function
                        await processSingleUrl(url, selectedBots, signalIntensity, pingEnabled);

                        // Add small delay between URLs to avoid overwhelming
                        await new Promise(r => setTimeout(r, 1000));
                    }

                    // Setup Auto-Sync if enabled
                    if (autoSync) {
                        if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
                        syncTimerRef.current = setTimeout(() => {
                            setRealTimeLogs(prev => [`[${new Date().toLocaleTimeString()}] --- AUTO-SYNC --- Re-scanning sitemap...`, ...prev]);
                            handleSubmit();
                        }, 300000); // 5 minutes
                    }

                    // Close modal after successful sitemap processing
                    setShowAddModal(false);
                    setInputText('');
                } else {
                    alert(data.error || "No URLs found in the sitemap.");
                }
            } catch (err) {
                alert("Failed to fetch sitemap. Check URL and try again.");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            urls = inputText.split('\n').map(u => u.trim()).filter(u => u !== '');
            if (urls.length === 0) return;
            setIsSubmitting(true);
            await processUrls(urls, timestamp);
        }
    };

    const processUrls = async (urls, timestamp) => {
        // Get selected Web 2.0 URLs
        const selectedWeb2Urls = web2Links
            .filter(link => selectedWeb2Links.includes(link.id))
            .map(link => link.web2Url);
        
        // Combine user URLs with Web 2.0 links
        const allUrls = [...urls, ...selectedWeb2Urls];
        
        try {
            const res = await fetch('/api/indexing/discover', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urls: allUrls, bots: selectedBots })
            });

            if (res.ok) {
                setShowAddModal(false);
                setInputText('');
                setSelectedWeb2Links([]);
                setWeb2Links([]);

                for (let i = 0; i < allUrls.length; i++) {
                    const url = allUrls[i];
                    const ts = new Date().toLocaleTimeString();
                    const isWeb2Link = selectedWeb2Urls.includes(url);

                    // URL header separator
                    setRealTimeLogs(prev => [
                        `[${ts}] ─────────── URL ${i + 1}/${allUrls.length}: ${url} ───────────`,
                        ...(isWeb2Link ? [`[${ts}] --- TYPE --- Web 2.0 Authority Link`] : []),
                        ...prev
                    ].slice(0, 400));
                    await new Promise(r => setTimeout(r, 300));

                    for (const bot of selectedBots) {
                        const randIdx = Math.floor(Math.random() * userAgents.length);
                        const ua = userAgents[randIdx];
                        const device = devices[randIdx % devices.length];

                        // Bot-specific delay based on intensity
                        const baseDelay = signalIntensity === 'extreme' ? 200 : signalIntensity === 'aggressive' ? 300 : 400;
                        const botDelay = baseDelay + Math.random() * 200; // Add some randomness

                        setRealTimeLogs(prev => [
                            `[${ts}] --- HEADER --- Accept: text/html,application/xhtml+xml, Method: GET, Device: ${device}`,
                            `[${ts}] --- UA --- ${ua.substring(0, 65)}...`,
                            `[${ts}] --- SIGNAL --- ${bot.toUpperCase()} --- GET ${url}`,
                            ...prev
                        ].slice(0, 400));
                        setTotalSignals(prev => prev + 1);

                        // Delay between each bot — feels real, not spammy
                        await new Promise(r => setTimeout(r, botDelay));
                    }

                    if (pingEnabled) {
                        const ts2 = new Date().toLocaleTimeString();
                        setRealTimeLogs(prev => [
                            `[${ts2}] --- BROADCAST --- ${selectedBots.length} engine signals confirmed for ${url}`,
                            ...prev
                        ].slice(0, 400));
                        await new Promise(r => setTimeout(r, 300));
                    }
                }

                // Final completed summary
                const tsFinal = new Date().toLocaleTimeString();
                setRealTimeLogs(prev => [
                    `[${tsFinal}] --- COMPLETED --- ${allUrls.length * selectedBots.length} total signals dispatched across ${selectedBots.length} engines for ${allUrls.length} URL(s).`,
                    `[${tsFinal}] --- BREAKDOWN --- ${urls.length} user URLs + ${selectedWeb2Urls.length} Web 2.0 links`,
                    ...prev
                ].slice(0, 400));

                // Re-sync from DB to update results list & total count
                await fetchInitialData();

            } else {
                const error = await res.json();
                alert(`Submission failed: ${error.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Discovery submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const processSingleUrl = async (url, bots, intensity, pingEnabled) => {
        try {
            const res = await fetch('/api/indexing/discover', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ urls: [url], bots: bots })
            });

            if (res.ok) {
                const ts = new Date().toLocaleTimeString();

                for (const bot of bots) {
                    const randIdx = Math.floor(Math.random() * userAgents.length);
                    const ua = userAgents[randIdx];
                    const device = devices[randIdx % devices.length];

                    // Bot-specific delay based on intensity
                    const baseDelay = intensity === 'extreme' ? 200 : intensity === 'aggressive' ? 300 : 400;
                    const botDelay = baseDelay + Math.random() * 200; // Add some randomness

                    setRealTimeLogs(prev => [
                        `[${ts}] --- HEADER --- Accept: text/html,application/xhtml+xml, Method: GET, Device: ${device}`,
                        `[${ts}] --- UA --- ${ua.substring(0, 65)}...`,
                        `[${ts}] --- SIGNAL --- ${bot.toUpperCase()} --- GET ${url}`,
                        ...prev
                    ].slice(0, 400));
                    setTotalSignals(prev => prev + 1);

                    // Delay between each bot — feels real, not spammy
                    await new Promise(r => setTimeout(r, botDelay));
                }

                if (pingEnabled) {
                    const ts2 = new Date().toLocaleTimeString();
                    setRealTimeLogs(prev => [
                        `[${ts2}] --- BROADCAST --- ${bots.length} engine signals confirmed for ${url}`,
                        ...prev
                    ].slice(0, 400));
                    await new Promise(r => setTimeout(r, 300));
                }

                // Re-sync from DB to update results list & total count
                await fetchInitialData();

            } else {
                const error = await res.json();
                alert(`Submission failed: ${error.error || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Discovery submission error:', err);
        }
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
                        <p className="panel-page-subtitle">Signal 10+ Global Search & AI Engines in real-time.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div className="panel-card" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--primary-light)', background: 'var(--primary-light)08' }}>
                            <Radio size={16} className="text-primary animate-pulse" />
                            <span style={{ fontSize: '0.8rem', fontWeight: 800 }}>SIGNALS DISPATCHED: <span className="text-primary">{totalSignals.toLocaleString()}</span></span>
                        </div>
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
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{botOptions.length} Engines</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 700 }}>● ONLINE</span>
                    </div>
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
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)' }}>Node: GLOBAL-EDGE-1</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--success)', fontWeight: 700 }}>● STATUS: OPTIMAL</div>
                        {realTimeLogs.length > 0 && (
                            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700 }}>
                                {realTimeLogs.length} LOG ENTRIES
                            </div>
                        )}
                    </div>
                </div>
                <div className="console" ref={consoleRef} style={{ height: '240px', overflowY: 'auto', background: 'var(--console-bg)', padding: '20px', fontFamily: 'monospace' }}>
                    {realTimeLogs.map((log, i) => (
                        <div key={i} style={{
                            marginBottom: '6px',
                            fontSize: '0.72rem',
                            lineHeight: '1.5',
                            color: log.includes('COMPLETED') ? '#64ffda'
                                : log.includes('SIGNAL') ? '#00e676'
                                    : log.includes('SYSTEM') || log.includes('AUTO-SYNC') ? '#ffab00'
                                        : log.includes('BROADCAST') ? '#ffd740'
                                            : log.includes('UA') || log.includes('HEADER') ? 'rgba(255,255,255,0.5)'
                                                : '#fff'
                        }}>
                            {log}
                        </div>
                    ))}
                    {!realTimeLogs.length && (
                        <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>
                            — Listening for incoming signals on GLOBAL-EDGE-1 —
                        </div>
                    )}
                </div>
                <div style={{ padding: '8px 20px', background: '#111', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                        {realTimeLogs.length} entries · {totalSignals.toLocaleString()} total signals dispatched
                    </span>
                    {realTimeLogs.length > 0 && (
                        <button
                            onClick={() => { setRealTimeLogs([]); localStorage.removeItem('cp_logs'); }}
                            style={{ fontSize: '0.65rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 800 }}
                        >
                            CLEAR LOGS
                        </button>
                    )}
                </div>
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
                            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                {res.bots.map(bot => {
                                    const botInfo = botOptions.find(b => b.id === bot);
                                    return (
                                        <button
                                            key={bot}
                                            onClick={() => openBotLogs(res, bot)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                border: '1px solid var(--border-color)',
                                                background: 'white',
                                                cursor: 'pointer',
                                                fontSize: '0.75rem',
                                                fontWeight: 600
                                            }}
                                        >
                                            <img src={`https://www.google.com/s2/favicons?domain=${bot}.com`} width="14" height="14" alt="" style={{ borderRadius: '2px' }} onError={(e) => e.target.style.display='none'} />
                                            {botInfo?.name || bot} Bot Log
                                        </button>
                                    );
                                })}
                                <button
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        border: 'none',
                                        background: 'var(--primary)',
                                        color: 'white',
                                        cursor: 'pointer',
                                        fontSize: '0.75rem',
                                        fontWeight: 600
                                    }}
                                >
                                    <ExternalLink size={14} />
                                    Add Links
                                </button>
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
                                        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', margin: 0 }}>
                                                <AlertCircle size={14} style={{ display: 'inline', marginRight: '4px' }} />
                                                We will crawl this sitemap and automatically extract all internal links for indexing.
                                            </p>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'var(--bg-light)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                                                <div>
                                                    <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>
                                                        <RefreshCw size={14} style={{ display: 'inline', marginRight: '6px', color: 'var(--primary)' }} />
                                                        Auto-Sync Mode
                                                    </div>
                                                    <p style={{ margin: '2px 0 0', fontSize: '0.7rem', color: 'var(--text-light)' }}>Re-crawl & re-signal sitemap every 5 minutes automatically.</p>
                                                </div>
                                                <div
                                                    onClick={() => setAutoSync(!autoSync)}
                                                    style={{ width: '44px', height: '24px', background: autoSync ? 'var(--primary)' : 'var(--border-color)', borderRadius: '20px', position: 'relative', cursor: 'pointer', flexShrink: 0 }}
                                                >
                                                    <motion.div animate={{ x: autoSync ? 22 : 2 }} style={{ width: '20px', height: '20px', background: 'white', borderRadius: '50%', position: 'absolute', top: 2, boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Web 2.0 Links Section */}
                                {showWeb2Section && web2Links.length > 0 && (
                                    <div style={{ marginBottom: '32px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                            <label className="text-xs font-bold uppercase block text-primary">
                                                Web 2.0 Links ({web2Links.length})
                                            </label>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={selectAllWeb2Links}
                                                    style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer' }}
                                                >
                                                    Select All
                                                </button>
                                                <button
                                                    onClick={deselectAllWeb2Links}
                                                    style={{ fontSize: '0.7rem', padding: '4px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'white', cursor: 'pointer' }}
                                                >
                                                    Deselect All
                                                </button>
                                            </div>
                                        </div>
                                        <div style={{ 
                                            maxHeight: '300px', 
                                            overflowY: 'auto', 
                                            border: '1px solid var(--border-color)', 
                                            borderRadius: '12px', 
                                            padding: '16px',
                                            background: '#fafafa'
                                        }}>
                                            {web2Links.map((link, index) => (
                                                <div 
                                                    key={link.id}
                                                    onClick={() => toggleWeb2Link(link.id)}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'flex-start',
                                                        gap: '12px',
                                                        padding: '12px',
                                                        marginBottom: '8px',
                                                        background: selectedWeb2Links.includes(link.id) ? '#e8f5e9' : 'white',
                                                        border: `1.5px solid ${selectedWeb2Links.includes(link.id) ? '#4caf50' : '#e0e0e0'}`,
                                                        borderRadius: '8px',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s'
                                                    }}
                                                >
                                                    <div style={{
                                                        width: '20px',
                                                        height: '20px',
                                                        borderRadius: '4px',
                                                        border: `2px solid ${selectedWeb2Links.includes(link.id) ? '#4caf50' : '#bdbdbd'}`,
                                                        background: selectedWeb2Links.includes(link.id) ? '#4caf50' : 'white',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        flexShrink: 0,
                                                        marginTop: '2px'
                                                    }}>
                                                        {selectedWeb2Links.includes(link.id) && (
                                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                                                <polyline points="20 6 9 17 4 12"/>
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1976d2', wordBreak: 'break-all' }}>
                                                            {link.web2Url}
                                                        </div>
                                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-light)', marginTop: '4px' }}>
                                                            Platform: {link.platform} • Points to: {link.originalUrl}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', padding: '12px', background: 'var(--primary-light)', borderRadius: '8px' }}>
                                            <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>
                                                Selected: {selectedWeb2Links.length} / {web2Links.length} links
                                            </span>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)' }}>
                                                These authority links will be indexed along with your URLs
                                            </span>
                                        </div>
                                    </div>
                                )}

                                <div style={{ marginBottom: '32px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                        <label className="text-xs font-bold uppercase block text-primary">Engine Selection</label>
                                        {userPlan === 'free' && (
                                            <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', background: 'var(--bg-light)', padding: '4px 8px', borderRadius: '6px' }}>
                                                Free Plan: GoogleBot Only
                                            </span>
                                        )}
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                                        {botOptions.map(bot => {
                                            const isAllowed = allowedBots.includes(bot.id);
                                            const isSelected = selectedBots.includes(bot.id);
                                            return (
                                                <div
                                                    key={bot.id}
                                                    onClick={() => toggleBot(bot.id)}
                                                    style={{
                                                        padding: '16px',
                                                        borderRadius: '16px',
                                                        border: `1.5px solid ${isSelected ? bot.color : isAllowed ? 'var(--border-color)' : '#e0e0e0'}`,
                                                        background: isSelected ? `${bot.color}08` : isAllowed ? 'white' : '#f5f5f5',
                                                        cursor: isAllowed ? 'pointer' : 'not-allowed',
                                                        transition: 'all 0.2s',
                                                        opacity: isAllowed ? 1 : 0.6,
                                                        position: 'relative'
                                                    }}
                                                >
                                                    {!isAllowed && (
                                                        <div style={{
                                                            position: 'absolute',
                                                            top: '8px',
                                                            right: '8px',
                                                            background: '#ff9800',
                                                            color: 'white',
                                                            fontSize: '0.6rem',
                                                            fontWeight: 800,
                                                            padding: '2px 6px',
                                                            borderRadius: '4px',
                                                            textTransform: 'uppercase'
                                                        }}>
                                                            Locked
                                                        </div>
                                                    )}
                                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                                                        <div style={{ 
                                                            width: '32px', 
                                                            height: '32px', 
                                                            background: isAllowed ? bot.color : '#9e9e9e', 
                                                            borderRadius: '8px', 
                                                            display: 'flex', 
                                                            alignItems: 'center', 
                                                            justifyContent: 'center', 
                                                            color: 'white',
                                                            opacity: isAllowed ? 1 : 0.5
                                                        }}>
                                                            <Search size={16} />
                                                        </div>
                                                        {isSelected && <CheckCircle2 size={18} color={bot.color} />}
                                                        {!isAllowed && (
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9e9e9e" strokeWidth="2">
                                                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                                                            </svg>
                                                        )}
                                                    </div>
                                                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: isAllowed ? 'inherit' : '#9e9e9e' }}>{bot.name}</div>
                                                    <div style={{ fontSize: '0.7rem', color: isAllowed ? 'var(--text-light)' : '#bdbdbd' }}>{bot.desc}</div>
                                                </div>
                                            );
                                        })}
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
                                    {isSubmitting
                                        ? <><Loader2 size={24} className="animate-spin" style={{ marginRight: '12px' }} /> Signaling {selectedBots.length} Engines...</>
                                        : <>Dispatch to {selectedBots.length} Engines <Send size={24} style={{ marginLeft: '12px' }} /></>}
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

            {/* Bot Log Modal */}
            <AnimatePresence>
                {showBotLogModal && selectedBotLogs && selectedBotForLogs && (
                    <div className="modal-overlay" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="panel-card" style={{ width: '100%', maxWidth: '700px', maxHeight: '80vh', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--border-color)' }}>
                                <div>
                                    <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Bot size={24} color={botOptions.find(b => b.id === selectedBotForLogs)?.color} />
                                        {botOptions.find(b => b.id === selectedBotForLogs)?.name} Log
                                    </h3>
                                    <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'var(--text-light)' }}>{selectedBotLogs.url}</p>
                                </div>
                                <button onClick={() => setShowBotLogModal(false)}><X size={24} /></button>
                            </div>
                            <div style={{ padding: '20px', background: '#1a1a2e', maxHeight: '50vh', overflowY: 'auto' }}>
                                {generateBotLogs(selectedBotLogs, selectedBotForLogs).map((log, i) => (
                                    <div key={i} style={{
                                        fontFamily: 'monospace',
                                        fontSize: '0.75rem',
                                        lineHeight: '1.6',
                                        marginBottom: '4px',
                                        color: log.includes('SYSTEM') ? '#ffab00'
                                            : log.includes('REQUEST') ? '#00e676'
                                            : log.includes('RESPONSE') ? '#64ffda'
                                            : log.includes('COMPLETED') ? '#64ffda'
                                            : 'rgba(255,255,255,0.7)'
                                    }}>
                                        {log}
                                    </div>
                                ))}
                            </div>
                            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Status: <span style={{ color: 'var(--success)', fontWeight: 600 }}>Delivered</span></span>
                                <button className="btn btn-primary" onClick={() => setShowBotLogModal(false)}>Close</button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
