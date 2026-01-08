import React from 'react';
import { Section } from '../components/Section';
import { LEADERSHIP_SERIES, WORKSHOPS, LUNCH_GATHERINGS } from '../constants';
import { Calendar, User, ExternalLink, CheckCircle2, MessageSquare, Utensils } from 'lucide-react';

export const Events: React.FC = () => {
  return (
    <div className="pt-20">
      <Section 
        title="演化活動 (Evolution in Progress)" 
        subtitle="每一場活動都是一次思維的升級，記錄我們持續進化的軌跡"
      >
        
        {/* --- Leadership Dialogue Series --- */}
        <div className="mb-24">
           <div className="flex items-center mb-8">
              <div className="h-8 w-1.5 bg-brand-700 rounded-full mr-4"></div>
              <h3 className="text-2xl font-bold font-serif text-slate-800">Leadership Dialogue Series</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEADERSHIP_SERIES.map((event) => (
                <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
                   {/* Image Container */}
                   <div className="relative h-48 overflow-hidden bg-slate-200">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-0 right-0 p-3">
                        {event.status === 'upcoming' ? (
                           <span className="bg-brand-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                              即將到來
                           </span>
                        ) : (
                           <span className="bg-slate-800/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                              已結束
                           </span>
                        )}
                      </div>
                   </div>

                   {/* Content */}
                   <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center text-brand-700 text-sm font-bold mb-3">
                         <Calendar size={14} className="mr-2" />
                         {event.date}
                      </div>
                      
                      <h4 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                        {event.title}
                      </h4>
                      
                      <div className="flex items-center text-slate-500 text-sm font-medium mb-6">
                         <User size={14} className="mr-2" />
                         {event.speaker}
                      </div>

                      <div className="mt-auto">
                        {event.link ? (
                          <a 
                            href={event.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:text-brand-700 hover:border-brand-200 transition-all text-sm font-semibold group/btn"
                          >
                             活動紀錄網頁
                             <ExternalLink size={14} className="ml-2 opacity-50 group-hover/btn:opacity-100" />
                          </a>
                        ) : (
                           <button disabled className="w-full py-2.5 px-4 bg-slate-50 text-slate-400 border border-slate-100 rounded-lg text-sm font-semibold cursor-not-allowed">
                             詳細資訊稍後公佈
                           </button>
                        )}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* --- Workshop & Lunch Gathering Split Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
            
            {/* Left: Online Workshops (7 cols) */}
            <div className="lg:col-span-7">
               <div className="flex items-center mb-8">
                  <div className="h-8 w-1.5 bg-blue-600 rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold font-serif text-slate-800">線上工作坊</h3>
               </div>
               
               <div className="space-y-6">
                  {WORKSHOPS.map((ws) => (
                    <div key={ws.id} className="flex flex-col sm:flex-row bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                       <div className="sm:w-1/3 min-h-[160px]">
                          <img src={ws.image} alt={ws.title} className="w-full h-full object-cover" />
                       </div>
                       <div className="p-6 flex-1">
                          <div className="flex items-center text-blue-700 text-sm font-bold mb-2">
                             <Calendar size={14} className="mr-2" />
                             {ws.date}
                          </div>
                          <h4 className="text-lg font-bold text-slate-800 mb-4">{ws.title}</h4>
                          <ul className="space-y-2">
                             {ws.details.map((detail, idx) => (
                               <li key={idx} className="flex items-start text-sm text-slate-600 leading-relaxed">
                                  <CheckCircle2 size={15} className="mr-2 mt-0.5 text-blue-400 shrink-0" />
                                  <span>{detail}</span>
                               </li>
                             ))}
                          </ul>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Right: Lunch Gathering (5 cols) */}
            <div className="lg:col-span-5 flex flex-col h-full">
               <div className="flex items-center mb-8">
                  <div className="h-8 w-1.5 bg-orange-500 rounded-full mr-4"></div>
                  <h3 className="text-2xl font-bold font-serif text-slate-800">交流午餐會</h3>
               </div>

               <div className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex-1 flex flex-col group">
                   <div className="relative h-56 overflow-hidden">
                       <img 
                         src={LUNCH_GATHERINGS.image} 
                         alt="Lunch Gathering" 
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                       <div className="absolute bottom-4 left-6 text-white">
                          <div className="flex items-center mb-1 text-orange-200 text-sm font-bold uppercase tracking-wider">
                             <Utensils size={14} className="mr-2" />
                             Networking Lunch
                          </div>
                          <div className="text-xl font-bold">軟實力：AI無法取代的能力</div>
                       </div>
                   </div>
                   
                   <div className="p-6 flex-1 bg-gradient-to-br from-orange-50/50 to-white">
                       <h4 className="font-bold text-slate-800 mb-4 flex items-center">
                          <Calendar size={18} className="mr-2 text-orange-500" />
                          活動場次
                       </h4>
                       <div className="space-y-3">
                          {LUNCH_GATHERINGS.dates.map((date, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-100 shadow-sm">
                               <span className="text-slate-600 font-medium">{date}</span>
                               <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold">
                                  已結束
                               </span>
                            </div>
                          ))}
                       </div>
                       
                       <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                          在輕鬆的午餐氛圍中，深入探討在人工智慧快速發展的時代，人類最珍貴且無法被演算法取代的核心競爭力。
                       </p>
                   </div>
               </div>
            </div>
        </div>

        {/* --- Ongoing Activities --- */}
        <div className="mt-12">
            <div className="bg-slate-900 rounded-2xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
               {/* Decorative background elements */}
               <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-600 rounded-full opacity-20 blur-3xl"></div>
               <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
               
               <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="md:w-2/3">
                     <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-900 border border-brand-700 text-brand-300 text-xs font-bold uppercase tracking-widest mb-4">
                        <div className="w-2 h-2 bg-brand-500 rounded-full mr-2 animate-pulse"></div>
                        Ongoing Series
                     </div>
                     <h3 className="text-3xl font-bold text-white mb-4 font-serif">
                        Wise Workshop 哈佛個案討論小組
                     </h3>
                     <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                        透過每周兩個哈佛個案的深度剖析，精準定位問題核心。在面對高度不確定性的商業環境下，從產業實務中培養兼具<span className="text-white font-bold">慈悲</span>與<span className="text-white font-bold">智能</span>的判斷維度。
                     </p>
                  </div>
                  
                  <div className="md:w-1/3 flex justify-center md:justify-end">
                     <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full max-w-sm">
                        <div className="flex items-start mb-4">
                           <MessageSquare className="text-brand-400 mt-1 mr-3" size={24} />
                           <div>
                              <div className="text-white font-bold mb-1">深度對話</div>
                              <div className="text-slate-400 text-sm">高強度的思維碰撞</div>
                           </div>
                        </div>
                        <div className="flex items-start">
                           <User className="text-brand-400 mt-1 mr-3" size={24} />
                           <div>
                              <div className="text-white font-bold mb-1">個案實戰</div>
                              <div className="text-slate-400 text-sm">理論與實務的交互驗證</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>

      </Section>
    </div>
  );
};
