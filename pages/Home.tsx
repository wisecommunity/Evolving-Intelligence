import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../components/Section';
import { ArrowRight, BookOpen, Users, Radio, ArrowUpRight, Target, Sparkles, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { STATS } from '../constants';

const CountUpAnimation = ({ end, duration = 2000, suffix = '' }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };
    
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return <span ref={elementRef} className="tabular-nums">{count}{suffix}</span>;
};

export const Home: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes synapse-flow {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes brain-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-synapse {
          stroke-dasharray: 20 500;
          stroke-dashoffset: 500;
          animation: synapse-flow 3s linear infinite;
        }
        .animate-synapse-slow {
          stroke-dasharray: 50 800;
          stroke-dashoffset: 800;
          animation: synapse-flow 7s linear infinite;
        }
        .animate-brain-pulse {
          animation: brain-pulse 6s ease-in-out infinite;
        }
      `}</style>

      {/* 1. Hero Section - Neural Network Theme */}
      <div className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden bg-slate-900">
        
        {/* Background: Neural Network / Brain Synapses */}
        <div className="absolute inset-0 z-0">
            {/* Using a high-quality biological/neural network image */}
            <img 
                src="https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=3870&auto=format&fit=crop" 
                alt="Neural Network Background" 
                className="w-full h-full object-cover opacity-40 animate-brain-pulse origin-center"
            />
             {/* Gradient Overlay for text readability - mixing deep slate with a hint of brand red */}
             <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-brand-900/10 mix-blend-multiply"></div>
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/50 to-slate-900"></div>
        </div>

        {/* Animated Brain Wave/Synapse Elements (SVG Overlay) */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
             <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                   {/* Gradient for the firing synapse effect - bright head, fading tail */}
                   <linearGradient id="grad-synapse" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="#ef4444" /> {/* Brand Red */}
                      <stop offset="100%" stopColor="#ffffff" /> {/* White hot tip */}
                   </linearGradient>
                   
                   <linearGradient id="grad-synapse-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="#3b82f6" /> 
                      <stop offset="100%" stopColor="#ffffff" />
                   </linearGradient>
                </defs>
                
                {/* Organic Curves representing neural pathways */}
                {/* Path 1: Main thought process */}
                <path d="M-10,50 C20,40 40,80 60,40 S110,60 110,60" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <path d="M-10,50 C20,40 40,80 60,40 S110,60 110,60" fill="none" stroke="url(#grad-synapse)" strokeWidth="0.3" className="animate-synapse-slow" />

                {/* Path 2: Intersecting idea */}
                <path d="M20,110 C30,70 50,50 80,40 S110,10 110,10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                <path d="M20,110 C30,70 50,50 80,40 S110,10 110,10" fill="none" stroke="url(#grad-synapse)" strokeWidth="0.3" className="animate-synapse" style={{animationDelay: '1s'}} />

                {/* Path 3: Subtle background connection */}
                <path d="M-10,20 C30,30 50,10 70,50 S110,80 110,80" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.4" />
                <path d="M-10,20 C30,30 50,10 70,50 S110,80 110,80" fill="none" stroke="url(#grad-synapse-blue)" strokeWidth="0.2" className="animate-synapse-slow" style={{animationDelay: '3s', animationDuration: '10s'}} />
                
                {/* Path 4: Rapid firing neuron */}
                <path d="M40,-10 Q50,40 90,60 T110,90" fill="none" stroke="url(#grad-synapse)" strokeWidth="0.4" className="animate-synapse" style={{animationDuration: '4s'}} />
             </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 relative pt-16">
          <div className="max-w-4xl">
               <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 mb-8 border border-white/10 shadow-lg group hover:bg-white/10 transition-colors">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                  </span>
                  <span className="text-sm font-semibold text-brand-100 tracking-wide uppercase">Evolving Intelligence Club</span>
               </div>
               
               <h1 className="text-5xl md:text-7xl font-bold font-serif text-white leading-[1.1] mb-8 drop-shadow-2xl">
                 在腦思路的迷宮中<br/>
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 via-brand-200 to-white">找到唯一路徑</span>
               </h1>
               
               <p className="text-xl md:text-2xl text-slate-200 leading-relaxed mb-12 border-l-4 border-brand-600 pl-6 max-w-3xl font-light shadow-black drop-shadow-md">
                 我們致力於培養具有改變世界的領導者。透過度化智能，讓你在生活與工作決策更得心應手，共創價值，一同致力於值得的改變。
               </p>

               <div className="flex flex-col sm:flex-row gap-5">
                 <Link to="/academy" className="inline-flex items-center justify-center px-8 py-4 bg-brand-700 text-white rounded-lg font-bold shadow-xl hover:bg-brand-600 transition-all hover:-translate-y-1 group border border-brand-600 backdrop-blur-sm bg-opacity-90">
                   加入度化學程
                   <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                 </Link>
                 <Link to="/review" className="inline-flex items-center justify-center px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 rounded-lg font-bold hover:bg-white/10 transition-all hover:-translate-y-1 hover:border-white/40">
                   閱讀實戰觀點
                 </Link>
               </div>
          </div>
        </div>
      </div>

      {/* 2. The Brand Strip - Simplified Background (No pattern) */}
      <div className="w-full h-24 md:h-32 bg-brand-900 relative flex items-center border-y border-brand-800 shadow-2xl z-20">
        
        <div className="max-w-7xl mx-auto px-4 w-full flex justify-between items-center relative z-10">
           <span className="hidden md:block text-brand-200/60 font-serif italic text-lg">Navigating Complexity</span>
           
           <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-600 to-transparent mx-8 opacity-50"></div>
           
           <div className="flex flex-col items-center">
               <span className="text-white font-bold text-xl md:text-3xl tracking-[0.25em] uppercase font-serif drop-shadow-md text-center">Evolving Intelligence</span>
           </div>
           
           <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-brand-600 to-transparent mx-8 opacity-50"></div>
           
           <span className="hidden md:block text-brand-200/60 font-serif italic text-lg">Creating Impact</span>
        </div>
      </div>

      {/* 3. Three Strategic Pillars */}
      <Section className="bg-slate-50 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white skew-y-1 transform origin-top-left -z-10"></div>
        
        <div className="text-center mb-16">
           <h2 className="text-3xl md:text-4xl font-bold font-serif text-slate-900 mb-4">社群核心引擎</h2>
           <p className="text-slate-600 max-w-2xl mx-auto">透過學程、專欄與活動的有機循環，打造持續進化的智慧生態系</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: Academy (Mentors Focus) */}
          <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Users size={120} />
             </div>
             <div className="w-14 h-14 bg-brand-50 text-brand-700 rounded-xl flex items-center justify-center mb-6">
                <Users size={28} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-3">度化學程</h3>
             <h4 className="text-sm font-bold text-brand-600 uppercase tracking-wider mb-4">匯聚領袖 · 傳承智慧</h4>
             <p className="text-slate-600 mb-8 leading-relaxed flex-1">
               我們不僅培育學生，更邀請產學界菁英加入<span className="font-bold text-slate-800">業師陣容</span>。在這裡，理論與實務深度碰撞，您的經驗將成為引領下一代領導者的燈塔。
             </p>
             <Link to="/academy" className="inline-flex items-center text-slate-800 font-bold hover:text-brand-700 group-hover:translate-x-2 transition-transform">
               成為合作業師 / 學員
               <ArrowRight size={18} className="ml-2" />
             </Link>
          </div>

          {/* Card 2: Review (Daily Interaction Focus) */}
          <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Radio size={120} />
             </div>
             <div className="w-14 h-14 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-6">
                <BookOpen size={28} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-3">實戰專欄</h3>
             <h4 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-4">每日更新 · 眾智共享</h4>
             <p className="text-slate-600 mb-8 leading-relaxed flex-1">
               社群知識的流動中心。透過<span className="font-bold text-slate-800">每日更新</span>的實戰文章，我們剖析時事、分享洞見，與社群成員進行高頻率的思維激盪與對話。
             </p>
             <Link to="/review" className="inline-flex items-center text-slate-800 font-bold hover:text-blue-700 group-hover:translate-x-2 transition-transform">
               瀏覽最新觀點
               <ArrowRight size={18} className="ml-2" />
             </Link>
          </div>

          {/* Card 3: Events (Connection Focus) */}
          <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Sparkles size={120} />
             </div>
             <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle size={28} />
             </div>
             <h3 className="text-2xl font-bold text-slate-900 mb-3">演化活動</h3>
             <h4 className="text-sm font-bold text-orange-600 uppercase tracking-wider mb-4">深度連結 · 跨域交流</h4>
             <p className="text-slate-600 mb-8 leading-relaxed flex-1">
               不僅是課程，更是<span className="font-bold text-slate-800">人脈生態系</span>。從工作坊到午餐會，我們創造場景，讓不同領域的靈魂在此相遇、連結，共同演化。
             </p>
             <Link to="/events" className="inline-flex items-center text-slate-800 font-bold hover:text-orange-600 group-hover:translate-x-2 transition-transform">
               參與近期活動
               <ArrowRight size={18} className="ml-2" />
             </Link>
          </div>

        </div>
      </Section>

      {/* 4. Impact Stats */}
      <div className="bg-slate-900 text-white py-20 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {STATS.map((stat, idx) => {
              const match = stat.value.match(/^(\d+)(.*)$/);
              const number = match ? parseInt(match[1], 10) : 0;
              const suffix = match ? match[2] : "";
              
              return (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-brand-500 blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="text-5xl md:text-6xl font-bold mb-3 text-white font-serif">
                      {match ? <CountUpAnimation end={number} suffix={suffix} /> : stat.value}
                    </div>
                    <div className="text-xl font-bold text-brand-400 mb-2">{stat.label}</div>
                    <div className="text-sm text-slate-400 max-w-xs mx-auto">{stat.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. Call to Action */}
      <div className="bg-white py-24 px-4">
        <div className="max-w-5xl mx-auto bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-200 relative overflow-hidden text-center">
           <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-600 via-brand-400 to-brand-600"></div>
           
           <h2 className="text-3xl md:text-5xl font-bold font-serif text-slate-900 mb-6">
             準備好開始您的度化之旅了嗎？
           </h2>
           <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto">
             無論您是尋求突破的創業者、渴望傳承的資深領袖，或是追求卓越的學習者，EIC 都是您最佳的演化基地。
           </p>
           
           <div className="flex flex-col sm:flex-row justify-center gap-4">
             <a href="mailto:wisecaseteam@gmail.com" className="px-10 py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
               聯絡我們
               <ArrowUpRight size={20} className="ml-2" />
             </a>
             <Link to="/philosophy" className="px-10 py-4 bg-white text-slate-900 border border-slate-300 rounded-xl font-bold hover:bg-slate-100 transition-all flex items-center justify-center">
               深入了解核心哲學
             </Link>
           </div>
        </div>
      </div>
    </>
  );
};
