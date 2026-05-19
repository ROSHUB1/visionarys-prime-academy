import React, { useState, useEffect, useRef } from 'react';

// --- Mga SVG Icons para sa premium cinematic aura ---
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
const CloseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const PlayIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>;
const CheckIcon = ({ className = "text-emerald-500" }) => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>;
const CrossIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-500/40"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const StarIcon = ({ filled = true, className = "text-yellow-500" }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className={className}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);
const ChevronDownIcon = ({ className }) => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="6 9 12 15 18 9"></polyline></svg>;
const SunIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const TargetIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const ZapIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const UploadIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>;

// --- Scroll Reveal Logic ---
const useScrollReveal = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { 
      threshold: 0.05, 
      rootMargin: "-40px 0px -40px 0px", 
      ...options 
    });

    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, [options]);

  return [ref, isVisible];
};

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0 scale-100 filter blur-0' : 'opacity-0 translate-y-16 scale-95 filter blur-[2px]'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Custom Reusable Premium VPG Gold Text Badge Logo ---
const Logo = () => {
  return (
    <div className="flex items-center justify-center bg-gradient-to-br from-[#1C1C1E] to-[#0A0A0A] border border-[#D4AF37]/30 w-11 h-11 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.25)] shrink-0 transition-transform duration-300 hover:scale-105">
      <span className="font-black text-sm tracking-widest bg-clip-text text-transparent bg-gradient-to-b from-[#FFEBB5] via-[#D4AF37] to-[#AA7C11]">
        VPG
      </span>
    </div>
  );
};

// --- Atomic Layout Units ---
const GoldText = ({ children }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F5D898] via-[#C69C55] to-[#F5D898]">
    {children}
  </span>
);

const ButtonPrimary = ({ children, className = "", onClick, styleType = "gold" }) => {
  const backgroundMap = {
    gold: "from-[#D4AF37] to-[#A67C00] text-black hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]",
    blue: "from-[#2563EB] to-[#1D4ED8] text-white hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]",
    purple: "from-[#7C3AED] to-[#6D28D9] text-white hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]",
    green: "from-[#10B981] to-[#047857] text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]",
  };
  
  return (
    <button 
      onClick={onClick}
      className={`relative overflow-hidden group bg-gradient-to-b ${backgroundMap[styleType] || backgroundMap.gold} font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 ${className}`}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-500 ease-in-out"></div>
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const ButtonSecondary = ({ children, className = "", onClick }) => (
  <button 
    onClick={onClick}
    className={`bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 ${className}`}
  >
    {children}
  </button>
);

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-[#151515]/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 hover:border-white/10 transition-colors duration-500 ${className}`}>
    {children}
  </div>
);

export default function App() {
  const canvasRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currency, setCurrency] = useState('PHP'); 
  const [geoStatus, setGeoStatus] = useState('Detecting location...');
  const [isPriceTransitioning, setIsPriceTransitioning] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  // Modal control para sa paggawa ng review
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  const DISCORD_SUPPORT_CHANNEL_LINK = "https://discord.gg/ukdnFSKSQP"; 

  // ============================================
  // REAL MEMBERS REVIEWS LOGIC (LOCALSTORAGE)
  // ============================================
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('vpa_real_reviews');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return []; // Empty list as requested (no fake cards)
  });

  useEffect(() => {
    localStorage.setItem('vpa_real_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Form Input States
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('Student Member');
  const [formRating, setFormRating] = useState(5);
  const [formQuote, setFormQuote] = useState('');
  const [formProfilePhoto, setFormProfilePhoto] = useState('');
  const [formProofPhoto, setFormProofPhoto] = useState('');
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState(false);

  // Profile Photo File Converter
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormProfilePhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Proof Image File Converter
  const handleProofPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormProofPhoto(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Submit Handler
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formQuote.trim()) {
      setFormError('Please fill out your Name and Review text.');
      return;
    }
    if (!formProfilePhoto) {
      setFormError('Required: Please upload your profile photo.');
      return;
    }

    const newReview = {
      id: `rev-${Date.now()}`,
      name: formName,
      role: formRole,
      rating: formRating,
      quote: formQuote,
      profilePhoto: formProfilePhoto,
      proofPhoto: formProofPhoto || null,
      date: "Just now"
    };

    setReviews([newReview, ...reviews]);
    setFormName('');
    setFormQuote('');
    setFormProfilePhoto('');
    setFormProofPhoto('');
    setFormError('');
    setFormSuccess(true);
    setTimeout(() => {
      setFormSuccess(false);
      setIsWriteReviewOpen(false); // Close review modal on completion
    }, 1500);
  };

  // Simulated live roster queue
  const [liveRegisteredUsers, setLiveRegisteredUsers] = useState([
    { id: "usr-9", name: "Vincent R.", emailMasked: "vin***@gmail.com" },
    { id: "usr-8", name: "Kristian M.", emailMasked: "kri***@outlook.com" },
    { id: "usr-7", name: "Angela T.", emailMasked: "ang***@yahoo.com" },
    { id: "usr-6", name: "Erick S.", emailMasked: "eri***@proton.me" }
  ]);

  // ============================================
  // GOLD SPACE CANVAS BACKGROUND ENGINE
  // ============================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isLowEnd = false;
    let isMediumEnd = false;
    
    function detectPerformanceTier() {
        const cores = navigator.hardwareConcurrency || 2;
        const memory = navigator.deviceMemory || 4;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (cores <= 2 || memory < 2 || isMobile) { isLowEnd = true; } 
        else if (cores <= 4 || memory < 4) { isMediumEnd = true; }
    }
    
    let STAR_COUNT, DUST_COUNT, NEBULA_COUNT, STAR_MAX_RADIUS;
    
    function setQualitySettings() {
        if (isLowEnd) { STAR_COUNT = 100; DUST_COUNT = 40; NEBULA_COUNT = 2; STAR_MAX_RADIUS = 1.6; } 
        else if (isMediumEnd) { STAR_COUNT = 200; DUST_COUNT = 80; NEBULA_COUNT = 3; STAR_MAX_RADIUS = 2.0; } 
        else { STAR_COUNT = 350; DUST_COUNT = 150; NEBULA_COUNT = 4; STAR_MAX_RADIUS = 2.4; }
    }
    
    const ctx = canvas.getContext('2d');
    let width, height, time = 0, lastTimestamp = 0, animationId = null;
    let stars = [], dustParticles = [], nebulae = [];
    
    function randomRange(min, max) { return min + Math.random() * (max - min); }
    
    function initStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random(), y: Math.random(),
                radius: randomRange(0.5, STAR_MAX_RADIUS),
                brightness: randomRange(0.4, 1.0),
                driftSpeed: randomRange(0.0003, 0.0015),
                twinkleSpeed: randomRange(0.8, 2.0),
                twinklePhase: randomRange(0, Math.PI * 2),
                goldTone: randomRange(0.5, 1.0)
            });
        }
    }
    
    function initDust() {
        dustParticles = [];
        for (let i = 0; i < DUST_COUNT; i++) {
            dustParticles.push({
                x: Math.random(), y: Math.random(), radius: randomRange(1.0, 3.0),
                alpha: randomRange(0.2, 0.6), vx: randomRange(-0.0004, 0.0004), vy: randomRange(-0.0004, 0.0004),
                phase: randomRange(0, Math.PI * 2), goldIntensity: randomRange(0.6, 1.0)
            });
        }
    }
    
    class Nebula {
        constructor(x, y, radiusRel, r, g, b, driftX, driftY) {
            this.x = x; this.y = y; this.radiusRel = radiusRel;
            this.r = r; this.g = g; this.b = b; this.driftX = driftX; this.driftY = driftY;
            this.pulseSpeed = randomRange(0.2, 0.7); this.pulsePhase = randomRange(0, Math.PI * 2);
        }
        update(deltaTime) {
            this.x += this.driftX * deltaTime; this.y += this.driftY * deltaTime;
            if (this.x < -0.3) this.x = 1.3; if (this.x > 1.3) this.x = -0.3;
            if (this.y < -0.3) this.y = 1.3; if (this.y > 1.3) this.y = -0.3;
        }
        draw(ctx, w, h, globalTime) {
            const centerX = this.x * w; const centerY = this.y * h;
            const radius = this.radiusRel * Math.min(w, h) * 0.65; if (radius <= 5) return;
            const intensity = 0.5 + 0.35 * Math.sin(globalTime * this.pulseSpeed + this.pulsePhase);
            const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
            gradient.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, ${0.45 * intensity})`);
            gradient.addColorStop(1, 'rgba(0,0,0,0)');
            ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(centerX, centerY, radius, 0, Math.PI * 2); ctx.fill();
        }
    }
    
    function initNebulae() {
        nebulae = [];
        const cfg = [
            { x: 0.3, y: 0.5, radius: 0.55, r: 255, g: 190, b: 70, dx: 0.00008, dy: -0.00006 },
            { x: 0.7, y: 0.35, radius: 0.52, r: 245, g: 175, b: 60, dx: -0.0001, dy: 0.00007 }
        ];
        cfg.forEach(c => nebulae.push(new Nebula(c.x, c.y, c.radius, c.r, c.g, c.b, c.dx, c.dy)));
    }
    
    function drawDeepSpace(w, h) {
        const grad = ctx.createLinearGradient(0, 0, w * 0.8, h);
        grad.addColorStop(0, '#0a0507'); grad.addColorStop(0.5, '#110906'); grad.addColorStop(1, '#030101');
        ctx.fillStyle = grad; ctx.fillRect(0, 0, w, h);
    }
    
    function drawStars(w, h, now) {
        stars.forEach(s => {
            const ox = (now * s.driftSpeed) % 1; const oy = (now * s.driftSpeed * 0.6) % 1;
            const x = ((s.x + ox) % 1) * w; const y = ((s.y + oy) % 1) * h;
            const twinkle = 0.55 + 0.45 * Math.sin(now * s.twinkleSpeed + s.twinklePhase);
            const r = Math.min(255, 210 + 55 * s.goldTone);
            ctx.beginPath(); ctx.arc(x, y, s.radius * (0.7 + twinkle * 0.4), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${Math.floor(r)}, 180, 80, ${s.brightness * twinkle * 0.8})`;
            ctx.fill();
        });
    }

    function resizeCanvas() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; }
    
    function animate(nowMs) {
        let dt = Math.min(0.033, (nowMs - lastTimestamp) / 1000); lastTimestamp = nowMs; time += dt * 0.95;
        if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) resizeCanvas();
        ctx.clearRect(0, 0, width, height); drawDeepSpace(width, height);
        nebulae.forEach(n => { n.update(dt); n.draw(ctx, width, height, time); });
        drawStars(width, height, time); animationId = requestAnimationFrame(animate);
    }
    
    detectPerformanceTier(); setQualitySettings(); initStars(); initDust(); initNebulae(); resizeCanvas();
    window.addEventListener('resize', resizeCanvas); lastTimestamp = performance.now(); animationId = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(animationId); window.removeEventListener('resize', resizeCanvas); };
  }, []);

  // Location Detector
  useEffect(() => {
    fetch('https://ipapi.co/json/').then(res => res.json()).then(data => {
      if (data.country_code === 'PH') { setCurrency('PHP'); setGeoStatus('Detected Location: Philippines (PHP pricing applied)'); } 
      else { setCurrency('USD'); setGeoStatus(`Detected Location: ${data.country_name || 'Global'} (USD pricing applied)`); }
    }).catch(() => { setCurrency('USD'); setGeoStatus('Location blocked. Defaulted to global USD pricing.'); });
  }, []);

  const triggerCurrencyChange = (targetCurrency) => {
    setIsPriceTransitioning(true);
    setTimeout(() => { setCurrency(targetCurrency); setIsPriceTransitioning(false); }, 280);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRedirectToDiscord = () => { window.open(DISCORD_SUPPORT_CHANNEL_LINK, '_blank'); };

  const navLinks = [
    { name: 'Refund Policy', action: () => setIsRefundModalOpen(true) },
    { name: 'Courses', url: '#courses' },
    { name: 'Reviews', url: '#reviews' },
    { name: 'Pricing', url: '#pricing' },
    { name: 'FAQ', url: '#faq' }
  ];
  
  const masterFeatures = [
    { key: "warmup", label: "Step-by-step account warm-up guide" },
    { key: "campaigns", label: "Access to legit $1+ campaigns" },
    { key: "tips", label: "Custom TikTok tips & Niche guides" },
    { key: "times", label: "Optimized / Strategic posting times" },
    { key: "tools_mid", label: "TikTok Growth Tools & Dashboards" },
    { key: "hashtags", label: "Verified Viral Hashtags" },
    { key: "povs", label: "Viral POV ideas & templates" },
    { key: "admin_warmup", label: "Admin-verified warm-up tips" },
    { key: "audience", label: "U.S. Car Audience setup" },
    { key: "best_days", label: "Best Days to Post schedule" },
    { key: "video_struct", label: "Optimized video format master structures" },
    { key: "full_suite", label: "Full Tool Suite (TikTok, IG, YT)" },
    { key: "youtube", label: "YouTube Automation insider tips" },
    { key: "whop", label: "Secret Whop monetization strategies" }
  ];

  const SUBSCRIPTION_PLANS = [
    {
      id: "basic",
      name: "BASIC",
      phpPrice: 200,
      usdPrice: 4,
      duration_text: "7 Days",
      role_name: "Basic User",
      emoji: "🟢",
      color: "green",
      accentGlow: "shadow-[0_0_30px_rgba(16,185,129,0.15)]",
      features: {
        warmup: true,
        campaigns: true,
        tips: true,
        times: true,
        tools_mid: false,
        hashtags: false,
        povs: false,
        admin_warmup: false,
        audience: false,
        best_days: false,
        video_struct: false,
        full_suite: false,
        youtube: false,
        whop: false
      }
    },
    {
      id: "premium",
      name: "PREMIUM",
      phpPrice: 400,
      usdPrice: 7,
      duration_text: "16 Days",
      role_name: "Premium User",
      emoji: "🔵",
      color: "blue",
      accentGlow: "shadow-[0_0_30px_rgba(37,99,235,0.15)]",
      features: {
        warmup: true,
        campaigns: true,
        tips: true,
        times: true,
        tools_mid: true,
        hashtags: true,
        povs: true,
        admin_warmup: true,
        audience: false,
        best_days: false,
        video_struct: false,
        full_suite: false,
        youtube: false,
        whop: false
      }
    },
    {
      id: "elite",
      name: "ELITE",
      phpPrice: 600,
      usdPrice: 11,
      duration_text: "30 Days",
      role_name: "Elite User",
      emoji: "🟣",
      color: "purple",
      accentGlow: "shadow-[0_0_55px_rgba(124,58,237,0.5)] z-10",
      isPopular: true,
      features: {
        warmup: true,
        campaigns: true,
        tips: true,
        times: true,
        tools_mid: true,
        hashtags: true,
        povs: true,
        admin_warmup: true,
        audience: true,
        best_days: true,
        video_struct: true,
        full_suite: false,
        youtube: false,
        whop: false
      }
    },
    {
      id: "vip",
      name: "VIP",
      phpPrice: 2000,
      usdPrice: 36,
      duration_text: "1 Year",
      role_name: "VIP User",
      emoji: "👑",
      color: "gold",
      accentGlow: "shadow-[0_0_50px_rgba(212,175,55,0.25)] border-[#D4AF37]/50",
      features: {
        warmup: true,
        campaigns: true,
        tips: true,
        times: true,
        tools_mid: true,
        hashtags: true,
        povs: true,
        admin_warmup: true,
        audience: true,
        best_days: true,
        video_struct: true,
        full_suite: true,
        youtube: true,
        whop: true
      }
    }
  ];

  return (
    <div className="min-h-screen text-white font-sans selection:bg-[#D4AF37] selection:text-black relative overflow-x-hidden bg-black">
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full block z-0 pointer-events-none" />

      <div className="relative z-10">
        {/* --- Navbar --- */}
        <nav className="fixed top-0 w-full z-40 bg-[#0A0A0A] border-b border-white/5 py-4">
          <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Logo />
              <span className="font-extrabold tracking-wider text-xs sm:text-sm bg-clip-text text-transparent bg-gradient-to-r from-white via-[#F5D898] to-white">
                VISIONARY PRIME ACADEMY
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-gray-400">
              {navLinks.map((link) => (
                <button key={link.name} onClick={link.action ? link.action : () => { window.location.href = link.url; }} className="hover:text-white transition-all relative group">
                  {link.name}<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
            <div className="hidden lg:flex items-center gap-6">
              <ButtonPrimary className="py-2.5 px-6 text-sm" onClick={handleRedirectToDiscord}>Join Discord</ButtonPrimary>
            </div>
            <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(true)}><MenuIcon /></button>
          </div>
        </nav>

        {/* --- Mobile Menu --- */}
        <div className={`fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl transition-all duration-500 lg:hidden flex flex-col justify-between ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="w-full px-6 py-6 border-b border-white/5 bg-[#0F0F0F] flex items-center justify-between">
            <div className="flex items-center gap-3"><Logo /><span className="font-extrabold text-sm text-white">VISIONARY PRIME ACADEMY</span></div>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-white p-2 rounded-full bg-white/5"><CloseIcon /></button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-8 gap-6 text-left">
            {navLinks.map((link) => (
              <button key={link.name} onClick={() => { setIsMobileMenuOpen(false); link.action ? link.action() : window.location.href = link.url; }} className="text-3xl font-bold text-gray-300 hover:text-white transition-all">{link.name}</button>
            ))}
          </div>
          <div className="px-8 pb-10"><ButtonPrimary onClick={handleRedirectToDiscord} className="w-full py-4">Go to Discord</ButtonPrimary></div>
        </div>

        {/* --- Hero Section --- */}
        <section className="relative min-h-screen flex items-center justify-center pt-36 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
              <Reveal delay={100}>
                <div className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 mb-6 uppercase tracking-widest">The New Standard of Creator Education</div>
              </Reveal>
              <Reveal delay={200}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">Turn Your Vision <br /><GoldText>Into Income.</GoldText></h1>
              </Reveal>
              <Reveal delay={300}>
                <p className="text-gray-400 text-base sm:text-lg max-w-xl mb-10 leading-relaxed">Build high-income skills, leverage elite automation toolkits, and build a world-class personal brand with 7-figure creators.</p>
              </Reveal>
              <Reveal delay={400} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <ButtonPrimary className="w-full sm:w-auto" onClick={() => window.location.href = '#pricing'}>View Subscription Plans</ButtonPrimary>
                <ButtonSecondary className="w-full sm:w-auto" onClick={handleRedirectToDiscord}><PlayIcon /> Join Server</ButtonSecondary>
              </Reveal>
            </div>

            {/* Live Connect Dashboard */}
            <div className="relative h-[450px] hidden lg:block">
              <div className="absolute top-10 right-10 w-[380px] h-[400px] bg-[#0A0A0A]/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col justify-between backdrop-blur-md">
                <div className="h-12 border-b border-white/5 flex items-center px-4 justify-between bg-white/[0.02]">
                  <span className="text-xs font-bold text-gray-300 tracking-wider">LIVE ROSTER: DISCORD DATABASE</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <div className="flex-1 p-5 space-y-4 font-mono text-left">
                  {liveRegisteredUsers.map((regUser, idx) => (
                    <div key={regUser.id} className="flex justify-between items-center bg-white/[0.02] border border-white/5 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-bold text-neutral-600">{idx + 1}.</span>
                        <div className="text-xs">
                          <div className="font-bold text-white">{regUser.name}</div>
                          <div className="text-[10px] text-gray-500">{regUser.emailMasked}</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded">ONLINE</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Courses Section --- */}
        <section id="courses" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">What You'll Learn</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-sm">Acquire critical high-income abilities verified to convert. Built directly for fast execution.</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: <TargetIcon />, title: "Content Creation", desc: "Build systems that convert viewer attention into highly active monetization pipelines." },
                { icon: <ZapIcon />, title: "AI Tools", desc: "Automate raw repetitive workflows with production-grade premium AI structures." },
                { icon: <SunIcon />, title: "Monetization", desc: "Deploy campaigns and direct product pipelines natively tailored to scale." }
              ].map((skill, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="bg-[#111111]/80 border border-white/5 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all text-left h-full">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-[#D4AF37] mb-6">{skill.icon}</div>
                    <h3 className="text-lg font-semibold mb-3">{skill.title}</h3>
                    <p className="text-gray-400 text-sm">{skill.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================
            INTERACTIVE REAL MEMBER REVIEWS SECTION
        ============================================ */}
        <section id="reviews" className="py-24 bg-[#0F0F0F]/40 border-y border-white/5 relative">
          <div className="max-w-7xl mx-auto px-6">
            
            <Reveal className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Reviews</h2>
              <button 
                onClick={() => setIsWriteReviewOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-b from-[#D4AF37] to-[#A67C00] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-black font-bold text-xs py-3.5 px-8 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105"
              >
                ✍️ Make a Review
              </button>
            </Reveal>

            {/* Conditionally centered output feed */}
            {reviews.length === 0 ? (
              <Reveal>
                <div className="max-w-md mx-auto py-12 px-6 rounded-2xl border border-white/5 bg-[#111]/80 text-center">
                  <span className="text-3xl block mb-3">⭐</span>
                  <h4 className="text-sm font-bold text-gray-300 mb-1">No Reviews Yet</h4>
                  <p className="text-xs text-gray-500 mb-6">Be the first verified member to share your live success proof!</p>
                  <ButtonPrimary onClick={() => setIsWriteReviewOpen(true)} className="py-2 px-5 text-[11px]" styleType="gold">
                    Write First Review
                  </ButtonPrimary>
                </div>
              </Reveal>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {reviews.map((rev) => (
                  <Reveal key={rev.id}>
                    <GlassCard className="h-full flex flex-col justify-between border-white/5 hover:border-[#D4AF37]/30 transition-all p-6 text-left relative overflow-hidden bg-[#131313]/90">
                      
                      <div className="absolute top-4 right-4 text-[10px] text-gray-500 font-mono">
                        {rev.date}
                      </div>

                      <div>
                        {/* Rating Stars render dynamically */}
                        <div className="flex gap-0.5 mb-4">
                          {[...Array(5)].map((_, starIdx) => (
                            <StarIcon key={starIdx} filled={starIdx < rev.rating} className={starIdx < rev.rating ? "text-yellow-500" : "text-gray-700"} />
                          ))}
                        </div>

                        <p className="text-gray-300 text-sm italic mb-6 leading-relaxed">"{rev.quote}"</p>

                        {/* Earnings/Analytics Screenshot Proof Display */}
                        {rev.proofPhoto && (
                          <div className="mb-6 rounded-lg overflow-hidden border border-white/10 bg-black/40">
                            <div className="text-[9px] uppercase tracking-wider font-mono text-gray-500 px-3 py-1 bg-white/[0.02] border-b border-b-white/5">📷 ATTACHED PROOF:</div>
                            <img src={rev.proofPhoto} className="w-full max-h-48 object-cover" alt="Member proof attachment" />
                          </div>
                        )}
                      </div>

                      {/* Profile Footer Layout */}
                      <div className="flex items-center gap-3 border-t border-white/5 pt-4">
                        <img 
                          src={rev.profilePhoto} 
                          className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/30 shrink-0 bg-neutral-800" 
                          alt={`${rev.name} avatar`} 
                        />
                        <div>
                          <div className="font-semibold text-white text-sm flex items-center gap-1.5">
                            {rev.name}
                            <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-1 rounded border border-emerald-500/20 font-bold uppercase scale-90">VERIFIED</span>
                          </div>
                          <div className="text-xs text-gray-500">{rev.role}</div>
                        </div>
                      </div>

                    </GlassCard>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- Why Choose VPA --- */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <Reveal><h2 className="text-3xl font-bold mb-12">Why Choose VPA</h2></Reveal>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Reveal delay={100}>
                <div className="bg-[#111] border border-white/5 rounded-2xl p-6 opacity-65 text-left">
                  <h3 className="text-lg font-bold mb-4 text-gray-400">Traditional Methods</h3>
                  <ul className="space-y-3 text-sm text-gray-500">
                    <li>✕ Zero interactive tools provided</li>
                    <li>✕ Outdated structures years behind trends</li>
                    <li>✕ No verified community dashboards</li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <div className="bg-[#111] border border-[#D4AF37]/30 rounded-2xl p-6 text-left">
                  <h3 className="text-lg font-bold mb-4 text-white">VPA Pro Ecosystem</h3>
                  <ul className="space-y-3 text-sm text-gray-200">
                    <li className="flex gap-2 text-gray-300"><CheckIcon /> Instant software dashboard simulator tools</li>
                    <li className="flex gap-2 text-gray-300"><CheckIcon /> Active algorithm schedules & strategic guides</li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- Subscription Plans --- */}
        <section id="pricing" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Subscription Plans</h2>
              <p className="text-gray-400 text-xs font-mono text-amber-500">{geoStatus}</p>
            </Reveal>

            <Reveal className="mb-12 max-w-xs mx-auto">
              <div className="flex bg-black p-1 rounded-xl border border-white/5">
                <button onClick={() => triggerCurrencyChange('PHP')} className={`flex-1 text-xs py-1.5 rounded-lg font-bold ${currency === 'PHP' ? 'bg-[#D4AF37] text-black' : 'text-gray-400'}`}>PHP (₱)</button>
                <button onClick={() => triggerCurrencyChange('USD')} className={`flex-1 text-xs py-1.5 rounded-lg font-bold ${currency === 'USD' ? 'bg-[#D4AF37] text-black' : 'text-gray-400'}`}>USD ($)</button>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {SUBSCRIPTION_PLANS.map((plan, i) => (
                <Reveal key={plan.id} delay={i * 100} className="flex">
                  <div className={`relative flex flex-col justify-between w-full bg-[#111111]/90 border rounded-3xl p-6 ${plan.color === 'gold' ? 'border-[#D4AF37]/50 shadow-[0_0_30px_rgba(212,175,55,0.15)]' : 'border-white/5'}`}>
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-xs font-bold uppercase">{plan.emoji} {plan.name}</span>
                        <span className="text-[10px] text-gray-500">{plan.role_name}</span>
                      </div>
                      <div className="mb-6 text-left">
                        <span className={`text-3xl font-bold transition-all duration-300 block ${isPriceTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
                          {currency === 'PHP' ? `₱${plan.phpPrice.toLocaleString()}` : `$${plan.usdPrice}`}
                        </span>
                        <span className="text-gray-500 text-[10px] block mt-1">Duration: {plan.duration_text}</span>
                      </div>
                      <ul className="space-y-2 border-t border-white/5 pt-4 text-left text-xs text-gray-300">
                        {masterFeatures.map((feat) => {
                          const isIncluded = plan.features[feat.key];
                          return (
                            <li key={feat.key} className={`flex items-start gap-2.5 transition-all duration-300 ${isIncluded ? 'text-gray-100' : 'text-gray-600'}`}>
                              <span className="shrink-0 mt-0.5">
                                {isIncluded ? <CheckIcon className="text-[#D4AF37]" /> : <CrossIcon />}
                              </span>
                              <span className={isIncluded ? 'font-medium' : 'line-through text-gray-600'}>
                                {feat.label}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <ButtonPrimary onClick={handleRedirectToDiscord} className="w-full text-xs py-2.5 mt-6" styleType={plan.color}>Buy {plan.name}</ButtonPrimary>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* --- FAQ Section --- */}
        <section id="faq" className="py-24 bg-[#0F0F0F]/40 border-t border-white/5">
          <div className="max-w-3xl mx-auto px-6">
            <Reveal className="text-center mb-12"><h2 className="text-3xl font-bold">FAQ</h2></Reveal>
            <div className="space-y-4 text-left">
              {[
                { q: "Is this program for absolute beginners?", a: "Yes. VPA is optimized to guide you from zero knowledge up to executing your first dollar generation online, and scaling thereafter." },
                { q: "How much time do I need to commit weekly?", a: "We recommend dedicating at least 5-7 hours per week to consume the curriculum modules and immediately execute." },
                { q: "What is your refund policy?", a: "All digital access purchases are final. Please review our specific Refund Policy window in the menu dashboard." },
                { q: "How active is the inner community?", a: "Extremely. It is the core heartbeat of VPA. Members exchange active feedback loops, strategies, and networking assets daily." }
              ].map((faq, i) => {
                const [isOpen, setIsOpen] = useState(false);
                return (
                  <div key={i} className="border border-white/10 rounded-2xl bg-[#111]">
                    <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left font-medium text-sm">
                      <span>{faq.q}</span>
                      <ChevronDownIcon className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#D4AF37]' : 'text-gray-500'}`} />
                    </button>
                    {isOpen && <div className="px-6 pb-5 text-gray-400 text-xs sm:text-sm leading-relaxed">{faq.a}</div>}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="py-12 border-t border-white/10 text-center text-xs text-gray-500 bg-[#0A0A0A]">
          <div>© 2026 Visionary Prime Academy. All rights reserved.</div>
        </footer>
      </div>

      {/* --- Premium Glassmorphism Make Review Form Modal --- */}
      {isWriteReviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out_forwards]">
          <div className="relative w-full max-w-md bg-[#0F0F0F]/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 backdrop-blur-2xl">
            <button 
              onClick={() => setIsWriteReviewOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <CloseIcon />
            </button>

            <div className="text-center mb-6">
              <Logo />
              <h3 className="text-xl font-bold tracking-tight mt-3">Leave a Verified Review</h3>
              <p className="text-xs text-gray-500">Ibahagi ang iyong naging tagumpay sa ating academy.</p>
            </div>

            {formError && <div className="p-3 mb-4 rounded-lg bg-red-950/50 border border-red-500/30 text-xs text-red-400 text-left">{formError}</div>}
            {formSuccess && <div className="p-3 mb-4 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-xs text-emerald-400 text-left">✔ Posted successfully to live feed!</div>}

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Full Name *</label>
                <input 
                  type="text" 
                  value={formName} 
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g., Geo Galario" 
                  className="w-full bg-black border border-white/10 rounded-lg py-2 px-3 text-xs focus:border-[#D4AF37] outline-none text-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Status</label>
                  <select 
                    value={formRole} 
                    onChange={(e) => setFormRole(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-lg py-2 px-2 text-xs focus:border-[#D4AF37] outline-none text-white transition-colors"
                  >
                    <option value="Student Member">Student Member</option>
                    <option value="Premium User">Premium User</option>
                    <option value="Elite Member">Elite Member</option>
                    <option value="7-Figure Creator">7-Figure Creator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Stars</label>
                  <div className="flex gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((starNum) => (
                      <button 
                        type="button" 
                        key={starNum} 
                        onClick={() => setFormRating(starNum)}
                        className="transform hover:scale-125 transition-transform"
                      >
                        <StarIcon filled={starNum <= formRating} className="w-5 h-5" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Profile Photo *</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] py-1.5 px-3 rounded-lg font-medium transition-colors">
                    <UploadIcon /> Upload Photo
                    <input type="file" accept="image/*" onChange={handleProfilePhotoChange} className="hidden" />
                  </label>
                  {formProfilePhoto ? (
                    <img src={formProfilePhoto} className="w-8 h-8 rounded-full object-cover border border-[#D4AF37]" alt="Preview" />
                  ) : (
                    <span className="text-[10px] text-red-500 font-mono">No file chosen</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Earnings Proof (Optional)</label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] py-1.5 px-3 rounded-lg font-medium transition-colors">
                    <UploadIcon /> Upload Screenshot
                    <input type="file" accept="image/*" onChange={handleProofPhotoChange} className="hidden" />
                  </label>
                  {formProofPhoto && (
                    <img src={formProofPhoto} className="w-10 h-7 rounded object-cover border border-white/20" alt="Proof Preview" />
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Review Message *</label>
                <textarea 
                  rows="3"
                  value={formQuote} 
                  onChange={(e) => setFormQuote(e.target.value)}
                  placeholder="Kumusta ang naging resulta ng modules sa iyo?"
                  className="w-full bg-black border border-white/10 rounded-lg py-2 px-3 text-xs focus:border-[#D4AF37] outline-none text-white transition-colors resize-none"
                />
              </div>

              <button type="submit" className="w-full bg-gradient-to-b from-[#D4AF37] to-[#A67C00] text-black text-xs font-bold py-3 rounded-lg uppercase tracking-wider shadow-lg hover:scale-[1.02] transition-transform">
                Submit Verified Review
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- Premium Glassmorphism Refund Policy Modal (RESTORED EXACT TRANSCRIPTION) --- */}
      {isRefundModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-[fadeIn_0.3s_ease-out_forwards]">
          <div className="relative w-full max-w-2xl bg-[#0F0F0F]/95 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 backdrop-blur-2xl">
            <button 
              onClick={() => setIsRefundModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <CloseIcon />
            </button>

            <div className="text-center mb-6">
              <Logo />
              <h3 className="text-2xl font-bold tracking-tight mt-3">Refund Policy</h3>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Last Updated: May 15, 2026</p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-300 text-left overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin">
              <p className="leading-relaxed font-semibold text-white">
                We value every member of Visionary Prime Academy, and our goal is to deliver real, actionable results from day one. Before joining, please read this policy carefully.
              </p>

              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-red-400 flex items-center gap-2">
                  <span>🚫</span> No Refunds for Digital Products
                </h4>
                <p className="text-xs leading-relaxed text-gray-400">
                  All purchases of Visionary Prime Academy passes are final and non-refundable. Once you gain access to our private community, digital resources, and training materials, you immediately receive the full value of the product — which cannot be returned.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-white block">We do not offer refunds for:</span>
                <ul className="list-disc pl-5 space-y-1.5 text-gray-400 text-xs">
                  <li>Change of mind or personal reasons</li>
                  <li>"I didn't have time" or "I didn't start yet" situations</li>
                  <li>Lack of results due to inaction or failure to follow the program steps</li>
                </ul>
                <p className="text-xs text-gray-500 italic">Our content, resources, and community access are delivered instantly — making refunds impossible once access is granted.</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 space-y-2">
                <h4 className="font-bold text-emerald-400 flex items-center gap-2">
                  <span>✅</span> Our Fair Commitment
                </h4>
                <p className="text-xs leading-relaxed text-gray-400">
                  We stand by the quality of our systems and mentorship. If you experience technical issues accessing the platform, contact support within 48 hours. If we are unable to deliver access after confirmation of payment, a full refund will be issued.
                </p>
              </div>

              <div className="border-t border-white/5 pt-4 text-center">
                <span className="text-gray-500 block text-xs">Need help? Email us directly:</span>
                <a href="mailto:visionaryprimeacademy@gmail.com" className="text-[#D4AF37] hover:underline font-bold text-sm block mt-1">
                  visionaryprimeacademy@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-6">
              <ButtonPrimary 
                onClick={() => setIsRefundModalOpen(false)}
                className="w-full text-xs py-3"
                styleType="gold"
              >
                I Understand & Accept Terms
              </ButtonPrimary>
            </div>
          </div>
        </div>
      )}

    </div>
  );
  }
