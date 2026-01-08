import React, { useState } from 'react';
import { Mail, Facebook, Youtube, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for actual subscription logic
    alert(`感謝您的訂閱！電子報將發送至：${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section with Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 pb-12 border-b border-slate-800">
           <div>
              <h3 className="text-2xl font-serif font-bold text-white tracking-tight mb-4">EIC 度化智能學習社群</h3>
              <p className="text-slate-400 leading-relaxed max-w-md">
                匯聚學界菁英與產業領袖，共同探索不確定時代下的決策本質。透過度化學程、實戰專欄與演化活動，打造持續進化的智慧生態系。
              </p>
           </div>
           
           <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
              <h4 className="text-white font-bold mb-2">訂閱電子報</h4>
              <p className="text-slate-400 text-sm mb-4">接收最新的實戰觀點、課程資訊與活動通知。</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                 <input 
                   type="email" 
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="您的 Email 信箱" 
                   required
                   className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:border-brand-500 text-white placeholder-slate-500"
                 />
                 <button type="submit" className="px-6 py-3 bg-brand-700 text-white font-bold rounded-lg hover:bg-brand-600 transition-colors flex items-center justify-center">
                   訂閱
                   <ArrowRight size={18} className="ml-2" />
                 </button>
              </form>
           </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">快速連結</h4>
            <ul className="space-y-2 text-base">
              <li><a href="#/academy" className="hover:text-brand-400 transition-colors">度化學程</a></li>
              <li><a href="#/review" className="hover:text-brand-400 transition-colors">實戰專欄</a></li>
              <li><a href="#/events" className="hover:text-brand-400 transition-colors">演化活動</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">關於我們</h4>
            <ul className="space-y-2 text-base">
               <li><a href="#/philosophy" className="hover:text-brand-400 transition-colors">核心哲學</a></li>
               <li><a href="mailto:wisecaseteam@gmail.com" className="hover:text-brand-400 transition-colors">聯絡團隊</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">追蹤社群</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/share/g/17gBxBS2Gh/" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-brand-700 transition-colors group">
                <Facebook size={20} className="group-hover:text-white" />
              </a>
              <a href="https://www.youtube.com/@wisetalkspro9277" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-brand-700 transition-colors group">
                <Youtube size={20} className="group-hover:text-white" />
              </a>
              <a href="mailto:wisecaseteam@gmail.com" className="p-2 bg-slate-800 rounded-full hover:bg-brand-700 transition-colors group">
                <Mail size={20} className="group-hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} Evolving Intelligence Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
