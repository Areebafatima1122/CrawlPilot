'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Zap,
    Github,
    Twitter,
    Linkedin,
    Mail,
    ChevronRight,
    Heart
} from 'lucide-react';
import './Footer.css';

export default function Footer() {
    const pathname = usePathname();
    if (pathname.startsWith('/panel')) return null;

    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <Link href="/" className="logo footer-logo">
                            <Zap className="logo-icon" size={24} fill="currentColor" />
                            Crawl <span>Pilot</span>
                        </Link>
                        <p className="footer-tagline">
                            Empowering search visibility through lightning-fast indexing and real-time crawl intelligence.
                        </p>
                        <div className="social-links">
                            <Link href="https://twitter.com" aria-label="Twitter"><Twitter size={20} /></Link>
                            <Link href="https://linkedin.com" aria-label="LinkedIn"><Linkedin size={20} /></Link>
                            <Link href="https://github.com" aria-label="GitHub"><Github size={20} /></Link>
                        </div>
                    </div>

                    <div className="footer-links">
                        <h4>Solutions</h4>
                        <ul>
                            <li><Link href="/understanding-bots/google"><ChevronRight size={14} /> Google Indexing</Link></li>
                            <li><Link href="/understanding-bots/bing"><ChevronRight size={14} /> Bing Indexing</Link></li>
                            <li><Link href="/understanding-bots/openai"><ChevronRight size={14} /> AI Engine Bots</Link></li>
                            <li><Link href="/api-docs"><ChevronRight size={14} /> API Access</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Support</h4>
                        <ul>
                            <li><Link href="/faq"><ChevronRight size={14} /> Help Center</Link></li>
                            <li><Link href="/support"><ChevronRight size={14} /> Contact Support</Link></li>
                            <li><Link href="/blog"><ChevronRight size={14} /> Engineering Blog</Link></li>
                            <li><Link href="/referral"><ChevronRight size={14} /> Referral Matrix</Link></li>
                        </ul>
                    </div>

                    <div className="footer-links">
                        <h4>Legal</h4>
                        <ul>
                            <li><Link href="/privacy-policy"><ChevronRight size={14} /> Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service"><ChevronRight size={14} /> Terms of Service</Link></li>
                            <li><Link href="/faq#safety"><ChevronRight size={14} /> Data Integrity</Link></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h4>Newsletter</h4>
                        <p>Get latest SEO updates.</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Email address" className="input" />
                            <button className="btn btn-primary btn-icon"><Mail size={16} /></button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} Crawl Pilot. All rights reserved.</p>
                    <div className="made-with">
                        Built with <Heart size={14} fill="#EF4444" color="#EF4444" /> for SEO Engineers worldwide.
                    </div>
                </div>
            </div>
        </footer>
    );
}
