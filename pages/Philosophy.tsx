import React from 'react';
import { Section } from '../components/Section';
import { LOGIC_COMPARISON, MANTRAS } from '../constants';
import { ArrowRight, ArrowLeftRight, MoveHorizontal, Cpu, GitBranch, Layers, ChevronRight, TrendingUp, ArrowDown } from 'lucide-react';

// Component for the logic flow visualization (Left Column)
const LogicFlow = ({ 
  from, 
  to, 
  bidirectional = false 
}: { 
  from: 'causation' | 'effectuation', 
  to: 'causation' | 'effectuation', 
  bidirectional?: boolean 
}) => {
  const config = {
    causation: { 
      label: '因果邏輯\n(Causation)', 
      style: 'bg-green-100 text-green-800 border-green-200 shadow-sm' 
    },
    effectuation: { 
      label: '效果邏輯\n(Effectuation)', 
      style: 'bg-orange-100 text-orange-800 border-orange-200 shadow-sm' 
    }
  };

  return (
    <div className="flex flex-col justify-center h-full w-full">
      <div className="flex flex-row items-center justify-between space-x-2 w-full bg-slate-50/50 p-2 rounded-xl border border-slate-100 h-full">
        <div className={`flex-1 py-1 px-1 rounded-lg text-[10px] lg:text-[11px] font-bold text-center border leading-tight whitespace-pre-line flex items-center justify-center h-full min-h-[60px] ${config[from].style}`}>
            {config[from].label}
        </div>
        <div className="text-slate-400 flex flex-col items-center justify-center px-0.5 shrink-0">
            {bidirectional ? (
                <ArrowLeftRight className="text-slate-400" size={16} strokeWidth={2.5} />
            ) : (
                <ArrowRight className="text-slate-400" size={18} strokeWidth={3} />
            )}
        </div>
        <div className={`flex-1 py-1 px-1 rounded-lg text-[10px] lg:text-[11px] font-bold text-center border leading-tight whitespace-pre-line flex items-center justify-center h-full min-h-[60px] ${config[to].style}`}>
            {config[to].label}
        </div>
      </div>
    </div>
  );
};

// Component for individual mantra cards
const MantraCard = ({ item, footerColor }: { item: { phrase: string, intent: string }, footerColor: string }) => (
  <div className="flex flex-col h-full group">
    <div className="bg-white rounded-xl shadow border border-slate-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col relative">
      <div className="p-4 lg:p-5 flex-grow flex items-center justify-center text-center">
        <div className="text-lg lg:text-xl font-bold text-slate-800 tracking-wide">{item.phrase}</div>
      </div>
      <div className={`py-2 px-2 text-center text-sm font-bold tracking-wider ${footerColor}`}>
        {item.intent}
      </div>
    </div>
  </div>
);

export const Philosophy: React.FC = () => {
  // Styles for the card footers corresponding to columns
  const colColors = [
    'bg-blue-100 text-blue-900',  // 理思路 - 藍色
    'bg-slate-200 text-slate-800', // 做溝通 - 灰色
    'bg-orange-100 text-orange-900' // 定志業 - 橘色
  ];

  return (
    <div className="pt-20">
      <Section title="核心哲學" subtitle="什麼是度化智能 (Evolving Intelligence)">
        <div className="mx-auto text-center max-w-3xl mb-16 space-y-4">
          <p className="text-lg text-slate-600 leading-relaxed">
            我們的旅程，始於「度」——理解世界運行的底層邏輯，終於「化」——將自己升維，成為能夠創造新局的人。
          </p>
          <p className="text-lg font-semibold text-brand-800 leading-relaxed">
            度化智能是我們的決策思維，透過「因果邏輯」(Causation) 與「效果邏輯」(Effectuation) 的切換，是領導者在複雜變局中持續進化的關鍵。
          </p>
        </div>

        {/* Model Comparison Table */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            {/* Desktop Header */}
            <div className="hidden md:grid grid-cols-12 bg-slate-900 text-white py-4 px-2 lg:px-6 text-sm lg:text-base font-bold text-center items-center tracking-wide">
              <div className="col-span-2">決策視角</div>
              <div className="col-span-3">核心原則</div>
              <div className="col-span-7 grid grid-cols-2 gap-4">
                <div className="text-blue-300">效果推理 (Effectuation)</div>
                <div className="text-green-400">因果推理 (Causation)</div>
              </div>
            </div>

            {/* Rows */}
            {LOGIC_COMPARISON.map((row, idx) => (
              <div key={idx} className="flex flex-col md:grid md:grid-cols-12 border-b border-slate-100 hover:bg-slate-50 transition-colors last:border-none">
                 {/* Mobile Title Strip */}
                 <div className="md:hidden flex items-center justify-between bg-slate-100 px-4 py-3 border-b border-slate-200">
                     <span className="font-bold text-slate-800">視角：{row.perspective}</span>
                     <span className="text-xs font-mono text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">{row.concept.split('\n')[0]}</span>
                 </div>

                 {/* Perspective Column (Desktop) */}
                 <div className="hidden md:flex col-span-2 items-center justify-center p-4 bg-slate-50 text-slate-900 font-bold border-r border-slate-100">
                     {row.perspective}
                 </div>

                 {/* Principle Column */}
                 <div className="p-4 col-span-3 flex flex-col justify-center items-center text-center border-r border-slate-100">
                     <div className="font-bold text-slate-800 whitespace-pre-line">{row.concept}</div>
                 </div>

                 {/* Comparison Columns */}
                 <div className="col-span-7 grid grid-cols-2 w-full">
                     <div className="p-4 flex flex-col justify-center items-center text-center bg-blue-50/20 md:bg-transparent border-r border-slate-100 md:border-none relative">
                         <span className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-blue-400 font-bold uppercase tracking-wider">Effectuation</span>
                         <div className="text-slate-700 whitespace-pre-line mt-4 md:mt-0">{row.effectuation}</div>
                     </div>
                     <div className="p-4 flex flex-col justify-center items-center text-center bg-green-50/20 md:bg-transparent relative">
                         <span className="md:hidden absolute top-2 left-1/2 -translate-x-1/2 text-[10px] text-green-500 font-bold uppercase tracking-wider">Causation</span>
                         <div className="text-slate-700 whitespace-pre-line mt-4 md:mt-0">{row.causation}</div>
                     </div>
                 </div>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-400 mt-4">創業決策模型：從五個維度看效果推理與因果推理的差異</p>
        </div>

        {/* Mantras Grid */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-center mb-10 font-serif text-slate-800">
            思維切換手法：實務行動九大口訣
          </h3>
          <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto text-lg">
            每一句口訣，都是提醒我們做出一個行動，承擔責任，創造改變。
          </p>
          
          <div className="max-w-6xl mx-auto px-0 lg:px-4">
            
            {/* Scrollable Container for small screens to maintain relative positions */}
            <div className="overflow-x-auto pb-6 px-4 lg:px-0 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                <div className="min-w-[850px] lg:min-w-0">
                    
                    {/* Headers */}
                    <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-4 lg:gap-6 mb-4 items-end">
                        <div className="text-center text-sm text-slate-400 pb-2">邏輯轉換與應用</div>
                        <div className="bg-brand-800 text-white font-bold py-3 px-4 rounded-lg text-center shadow-md text-xl tracking-widest border-b-4 border-brand-900">理思路</div>
                        <div className="bg-brand-800 text-white font-bold py-3 px-4 rounded-lg text-center shadow-md text-xl tracking-widest border-b-4 border-brand-900">做溝通</div>
                        <div className="bg-brand-800 text-white font-bold py-3 px-4 rounded-lg text-center shadow-md text-xl tracking-widest border-b-4 border-brand-900">定志業</div>
                    </div>

                    <div className="space-y-6">
                        
                        {/* Row 1: Causation -> Effectuation */}
                        <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-4 lg:gap-6 items-stretch">
                            <LogicFlow from="causation" to="effectuation" />
                            <MantraCard item={MANTRAS[0]} footerColor={colColors[0]} />
                            <MantraCard item={MANTRAS[3]} footerColor={colColors[1]} />
                            <MantraCard item={MANTRAS[6]} footerColor={colColors[2]} />
                        </div>

                        {/* Row 2: Causation <-> Effectuation */}
                        <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-4 lg:gap-6 items-stretch">
                            <LogicFlow from="causation" to="effectuation" bidirectional={true} />
                            <MantraCard item={MANTRAS[1]} footerColor={colColors[0]} />
                            <MantraCard item={MANTRAS[4]} footerColor={colColors[1]} />
                            <MantraCard item={MANTRAS[7]} footerColor={colColors[2]} />
                        </div>

                        {/* Row 3: Effectuation -> Causation */}
                        <div className="grid grid-cols-[220px_1fr_1fr_1fr] gap-4 lg:gap-6 items-stretch">
                            <LogicFlow from="effectuation" to="causation" />
                            <MantraCard item={MANTRAS[2]} footerColor={colColors[0]} />
                            <MantraCard item={MANTRAS[5]} footerColor={colColors[1]} />
                            <MantraCard item={MANTRAS[8]} footerColor={colColors[2]} />
                        </div>

                    </div>
                </div>
            </div>
            
            {/* Mobile Scroll Hint */}
            <div className="lg:hidden flex items-center justify-center text-sm text-slate-400 mt-2 animate-pulse">
                <MoveHorizontal size={16} className="mr-2" />
                左右滑動查看完整架構
            </div>
          </div>
        </div>

        {/* --- Logic Bridge Section --- */}
        <div className="mt-24 mb-10">
             {/* Core Engine Node */}
             <div className="flex flex-col items-center relative z-10">
                <div className="bg-slate-900 text-white p-6 md:p-8 rounded-2xl shadow-xl border-4 border-white max-w-3xl text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Cpu size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center bg-brand-600 text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 uppercase">
                            Core Operating System
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-3 font-serif tracking-wide">
                            度化智能 (Evolving Intelligence)
                        </h3>
                        <p className="text-lg text-slate-300 font-medium mb-4">
                            核心決策大腦 · 底層操作系統 · 決策引擎
                        </p>
                        <hr className="border-slate-700 w-1/3 mx-auto mb-4" />
                        <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
                            這不僅是一套思維，更是驅動所有行動的「決策引擎」。它根據情境，在不確定的環境中靈活調度資源與邏輯。
                        </p>
                    </div>
                </div>

                {/* Connecting Lines */}
                <div className="flex flex-col items-center w-full max-w-4xl">
                     {/* Main vertical trunk */}
                     <div className="h-12 w-1 bg-slate-300"></div>
                     {/* Horizontal split branch */}
                     <div className="w-[85%] md:w-3/4 h-1 bg-slate-300 rounded-full relative">
                         {/* Downward pointers */}
                         <div className="absolute left-0 top-0 h-8 w-1 bg-slate-300"></div>
                         <div className="absolute right-0 top-0 h-8 w-1 bg-slate-300"></div>
                         
                         {/* Center Node Dot */}
                         <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-slate-400 border-2 border-white rounded-full"></div>
                     </div>
                </div>
             </div>
        </div>

        {/* 0 to 1 and 1 to N */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative z-10 items-start">
            
            {/* 0 to 1 Card */}
            <div className="flex flex-col h-full">
                {/* Visual Connector Header */}
                <div className="flex justify-center mb-[-20px] relative z-20">
                    <div className="bg-brand-100 text-brand-800 p-3 rounded-full border-4 border-white shadow-sm">
                        <GitBranch size={28} />
                    </div>
                </div>

                <div className="bg-brand-50 pt-10 pb-8 px-6 md:px-8 rounded-3xl flex flex-col h-full border-t-0 shadow-sm relative overflow-hidden">
                    <div className="text-center mb-6 relative z-10">
                        <h4 className="text-2xl font-bold text-brand-900 mb-2">從 0 到 1：創業家思維</h4>
                        <p className="text-brand-700 font-bold text-sm uppercase tracking-wide mb-4">
                            突破與創新 (BREAKTHROUGH)
                        </p>
                        
                        <p className="text-slate-700 text-base leading-relaxed text-justify mb-6 px-1">
                            <span className="font-bold text-brand-800">運用度化智能來解決「從 0 到 1」的突破創新問題。</span>
                            這個不斷推進的升維賦能，是讓有創意的點子形成創新的模式，透過一系列領導的過程，帶領組織團隊在商業或挑戰上實踐價值，並進一步直面如何能持續下去，成為創造長期的時間價值。
                        </p>

                        <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-brand-100 text-center mb-8 shadow-sm">
                             <p className="text-[14px] md:text-[15px] font-bold text-slate-800 leading-snug flex flex-wrap justify-center items-center gap-1 md:gap-2">
                                <span>創業家思維</span>
                                <span>=</span>
                                <span className="flex items-center whitespace-nowrap">領導力 <ArrowRight size={14} className="mx-1 text-brand-400"/></span>
                                <span className="flex items-center whitespace-nowrap">創業力 <ArrowRight size={14} className="mx-1 text-brand-400"/></span>
                                <span className="whitespace-nowrap">創業家志業</span>
                             </p>
                        </div>
                    </div>

                    {/* Desktop Visual Diagram (Grid Based Staircase) */}
                    <div className="hidden lg:grid lg:grid-cols-5 h-[400px] items-stretch gap-2 mb-8 w-full">
                         {/* 1. Leadership - Bottom */}
                         <div className="col-span-1 flex flex-col justify-end pb-4">
                            <div className="w-full bg-orange-100 border-2 border-orange-200 p-4 rounded-lg text-center shadow-md hover:scale-105 transition-transform">
                                <h5 className="text-lg font-bold text-slate-900 border-b border-orange-200 pb-1 mb-2">領導力</h5>
                                <ul className="text-slate-700 text-sm font-medium space-y-1">
                                    <li>組織團隊</li>
                                    <li>解決問題</li>
                                </ul>
                            </div>
                         </div>

                         {/* 2. Arrow 1 (Ascending) */}
                         <div className="col-span-1 flex flex-col justify-center items-center translate-y-12">
                             <span className="text-[10px] font-bold bg-white/80 px-1 rounded mb-1 text-brand-600 shadow-sm whitespace-nowrap">升維</span>
                             <TrendingUp size={32} className="text-brand-400 transform -rotate-12" strokeWidth={2.5} />
                         </div>

                         {/* 3. Entrepreneurship - Center */}
                         <div className="col-span-1 flex flex-col justify-center">
                             <div className="w-full bg-blue-100 border-2 border-blue-200 p-5 rounded-[1.5rem] text-center shadow-md hover:scale-105 transition-transform">
                                <h5 className="text-lg font-bold text-slate-900 border-b border-blue-200 pb-1 mb-2">創業力</h5>
                                <ul className="text-slate-700 text-sm font-medium space-y-1">
                                    <li className="text-blue-700 font-bold">創造機會</li>
                                    <li>組織團隊</li>
                                    <li>解決<span className="text-red-500 font-bold mx-0.5">難</span>題</li>
                                </ul>
                            </div>
                         </div>

                         {/* 4. Arrow 2 (Ascending) */}
                         <div className="col-span-1 flex flex-col justify-center items-center -translate-y-12">
                             <span className="text-[10px] font-bold bg-white/80 px-1 rounded mb-1 text-brand-600 shadow-sm whitespace-nowrap">升維</span>
                             <TrendingUp size={32} className="text-brand-400 transform -rotate-12" strokeWidth={2.5} />
                         </div>

                         {/* 5. Vocation - Top */}
                         <div className="col-span-1 flex flex-col justify-start pt-4">
                             <div className="w-full bg-green-100 border-2 border-green-200 p-4 rounded-[30px] text-center shadow-md hover:scale-105 transition-transform flex flex-col justify-center py-8">
                                <h5 className="text-lg font-bold text-slate-900 border-b border-green-200 pb-1 mb-2">創業家志業</h5>
                                <ul className="text-slate-700 text-sm font-medium space-y-1">
                                    <li className="text-blue-700 font-bold">創造機會</li>
                                    <li>組織團隊</li>
                                    <li>解決<span className="text-red-500 font-bold mx-0.5">難</span>題</li>
                                    <li className="text-orange-600 font-bold pt-1">傳承價值</li>
                                </ul>
                            </div>
                         </div>
                    </div>

                    {/* Mobile/Tablet Visual Diagram (Vertical Stack) */}
                    <div className="lg:hidden flex flex-col items-center space-y-6 mb-8 w-full max-w-[300px] mx-auto">
                         {/* Leadership */}
                         <div className="w-full bg-orange-100 border-2 border-orange-200 p-4 rounded-lg text-center shadow-sm">
                            <h5 className="text-lg font-bold text-slate-900 border-b border-orange-200 pb-1 mb-2">領導力</h5>
                            <ul className="text-slate-700 text-sm font-medium space-y-1">
                                <li>組織團隊</li>
                                <li>解決問題</li>
                            </ul>
                        </div>
                        
                        {/* Arrow */}
                        <div className="flex flex-col items-center text-brand-400">
                             <span className="text-[10px] font-bold bg-white/50 px-1 rounded mb-0.5">升維</span>
                             <ArrowDown size={20} />
                        </div>

                         {/* Entrepreneurship */}
                         <div className="w-full bg-blue-100 border-2 border-blue-200 p-5 rounded-[1.5rem] text-center shadow-sm">
                            <h5 className="text-lg font-bold text-slate-900 border-b border-blue-200 pb-1 mb-2">創業力</h5>
                            <ul className="text-slate-700 text-sm font-medium space-y-1">
                                <li className="text-blue-700 font-bold">創造機會</li>
                                <li>組織團隊</li>
                                <li>解決<span className="text-red-500 font-bold mx-0.5">難</span>題</li>
                            </ul>
                        </div>

                        {/* Arrow */}
                        <div className="flex flex-col items-center text-brand-400">
                             <span className="text-[10px] font-bold bg-white/50 px-1 rounded mb-0.5">升維</span>
                             <ArrowDown size={20} />
                        </div>

                         {/* Vocation */}
                         <div className="w-full bg-green-100 border-2 border-green-200 p-6 rounded-[3rem] text-center shadow-sm">
                            <h5 className="text-lg font-bold text-slate-900 border-b border-green-200 pb-1 mb-2">創業家志業</h5>
                            <ul className="text-slate-700 text-sm font-medium space-y-1">
                                <li className="text-blue-700 font-bold">創造機會</li>
                                <li>組織團隊</li>
                                <li>解決<span className="text-red-500 font-bold mx-0.5">難</span>題</li>
                                <li className="text-orange-600 font-bold pt-1">傳承價值</li>
                            </ul>
                        </div>
                    </div>
                    
                    {/* Detailed Definition List */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-brand-100 mb-2 relative z-10">
                        <div className="flex items-center mb-3">
                           <span className="bg-brand-100 text-brand-800 text-xs font-bold px-2 py-1 rounded mr-2">核心內涵說明</span>
                           <h5 className="font-bold text-brand-900">創業家志業</h5>
                        </div>
                        <ul className="space-y-3 text-[15px] text-slate-700">
                             <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                <strong className="text-blue-700 min-w-[70px] whitespace-nowrap">創造機會</strong>
                                <span className="text-slate-600 text-sm leading-snug">除了辨識機會，更要創造機會</span>
                            </li>
                            <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                <strong className="text-slate-800 min-w-[70px] whitespace-nowrap">組織團隊</strong>
                                <span className="text-slate-600 text-sm leading-snug">夥伴選擇</span>
                            </li>
                            <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                <strong className="text-slate-800 min-w-[70px] whitespace-nowrap">解決<span className="text-red-600">難</span>題</strong>
                                <span className="text-slate-600 text-sm leading-snug">辨識是技術性問題，還是挑戰性的難題</span>
                            </li>
                            <li className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                <strong className="text-orange-600 min-w-[70px] whitespace-nowrap">傳承價值</strong>
                                <span className="text-slate-600 text-sm leading-snug">領導的意義不止於掌握權力，而是當你放下它時，這份力量依然在延續，依然在帶動著變革</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 1 to N Card */}
            <div className="flex flex-col h-full mt-10 lg:mt-0">
                {/* Visual Connector Header */}
                <div className="flex justify-center mb-[-20px] relative z-20">
                    <div className="bg-slate-200 text-slate-700 p-3 rounded-full border-4 border-white shadow-sm">
                        <Layers size={28} />
                    </div>
                </div>

                <div className="bg-slate-100 pt-10 pb-8 px-6 md:px-8 rounded-3xl flex flex-col h-full border-t-0 shadow-sm">
                    <div className="mb-6 text-center">
                        <h4 className="text-2xl font-bold text-slate-900 mb-2">從 1 到 N：多面向思維</h4>
                        <p className="text-slate-600 font-bold text-sm uppercase tracking-wide mb-4">
                            升維與迭代 (SCALING & EVOLUTION)
                        </p>
                        <p className="text-slate-700 text-base leading-relaxed text-justify mb-4">
                            <span className="font-bold text-slate-900">將智能擴展至從 1 到 100 的宏觀升維與迭代。</span>
                            這是度化智能的一種「螺旋升維」表現，讓我們跳脫單一維度，看清 AI、地緣政治等宏觀變數，掌握跨域真實。
                        </p>

                        {/* Formula */}
                        <div className="bg-white/70 backdrop-blur-sm p-3 rounded-xl border border-slate-200 text-center mb-2 shadow-sm">
                             <div className="text-[14px] md:text-[15px] font-bold text-slate-800 leading-snug flex flex-wrap justify-center items-center gap-x-1 gap-y-2">
                                <span className="whitespace-nowrap">多面向思維</span>
                                <span>=</span>
                                <span className="flex items-center whitespace-nowrap">察覺變局 <ArrowRight size={14} className="mx-0.5 text-slate-400"/></span>
                                <span className="flex items-center whitespace-nowrap">洞悉見識 <ArrowRight size={14} className="mx-0.5 text-slate-400"/></span>
                                <span className="flex items-center whitespace-nowrap">跨域協同 <ArrowRight size={14} className="mx-0.5 text-slate-400"/></span>
                                <span className="flex items-center whitespace-nowrap">聚焦成長 <ArrowRight size={14} className="mx-0.5 text-slate-400"/></span>
                                <span className="whitespace-nowrap">螺旋升維</span>
                             </div>
                        </div>
                    </div>
                    
                    {/* Tools Details */}
                    <div className="space-y-4 mb-2">
                         <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                             <div className="flex items-center mb-3">
                                <span className="bg-slate-200 text-slate-800 text-xs font-bold px-2 py-1 rounded mr-2">核心工具</span>
                                <h5 className="font-bold text-slate-900">AI-X-Gs 模型</h5>
                             </div>
                             <ul className="text-[15px] text-slate-700 space-y-2">
                                <li className="flex items-start">
                                    <span className="font-bold text-slate-900 min-w-[30px]">AI</span>
                                    <span className="text-slate-600 text-sm leading-snug">以 AI-First 為核心，理解新興運算架構與決策自動化</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-bold text-slate-900 min-w-[30px]">X</span>
                                    <span className="text-slate-600 text-sm leading-snug">跨領域 (Cross-discipline) 整合能力</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="font-bold text-slate-900 min-w-[30px]">Gs</span>
                                    <span className="text-slate-600 text-sm leading-snug">
                                        洞察五大劇場：<br/>
                                        Government (政府)、Geopolitics (地緣政治)、Generations (世代)、Gender (性別)、Green (永續)
                                    </span>
                                </li>
                             </ul>
                         </div>

                         <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                             <div className="flex items-center mb-2">
                                <span className="bg-slate-200 text-slate-800 text-xs font-bold px-2 py-1 rounded mr-2">核心工具</span>
                                <h5 className="font-bold text-slate-900">新世代管理框架 S.O.F.T.</h5>
                             </div>
                             <p className="text-slate-600 text-sm leading-relaxed">
                                 提出以 <strong className="text-slate-800">Strategy (策略)</strong>、<strong className="text-slate-800">Organization (組織發展)</strong>、<strong className="text-slate-800">Finance (財務與資源配置)</strong>、<strong className="text-slate-800">Technology (技術與平台)</strong> 取代過時的「產銷人發財資」框架，強調這四者的跨維度耦合與動態協作。
                             </p>
                         </div>

                         <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                             <div className="flex items-center mb-2">
                                <span className="bg-slate-200 text-slate-800 text-xs font-bold px-2 py-1 rounded mr-2">決策工具</span>
                                <h5 className="font-bold text-slate-900">C.L.E.A.R.</h5>
                             </div>
                             <p className="text-slate-600 text-sm leading-relaxed">
                                 在複雜情境下保持清晰的決策步驟：<br/>
                                 <strong className="text-slate-800">Context (情境)</strong> <ArrowRight size={12} className="inline mx-0.5" /> 
                                 <strong className="text-slate-800">Listen/Logic (傾聽邏輯)</strong> <ArrowRight size={12} className="inline mx-0.5" /> 
                                 <strong className="text-slate-800">Explore (探索)</strong> <ArrowRight size={12} className="inline mx-0.5" /> 
                                 <strong className="text-slate-800">Act (行動)</strong> <ArrowRight size={12} className="inline mx-0.5" /> 
                                 <strong className="text-slate-800">Review (檢視)</strong>
                             </p>
                         </div>
                    </div>
                </div>
            </div>
        </div>

      </Section>
    </div>
  );
};