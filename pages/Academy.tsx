import React from 'react';
import { Section } from '../components/Section';
import { COURSES } from '../constants';
import { BookOpen, ExternalLink, GraduationCap, CheckCircle2 } from 'lucide-react';

export const Academy: React.FC = () => {
  return (
    <div className="pt-20">
      <Section title="度化學程 (EIC Academy)" subtitle="高學術 × 高實務並重：融合嚴謹的學術理論與來自業界前沿的實務探索">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {COURSES.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
              <div className="bg-slate-900 p-6">
                <div className="flex justify-between items-start">
                  <div className="inline-block px-3 py-1 bg-brand-600 text-white text-[13px] font-bold rounded-full mb-3 tracking-wide">
                    {course.code}
                  </div>
                  {course.highlight && (
                    <span className="text-brand-300 text-[13px] italic">{course.highlight}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white leading-tight">{course.title}</h3>
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <p className="text-slate-600 mb-6 leading-relaxed text-base">
                  {course.description}
                </p>

                <div className="mb-8">
                  <h4 className="text-[15px] font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center">
                    <GraduationCap size={16} className="mr-2 text-brand-600"/>
                    核心概念
                  </h4>
                  <ul className="space-y-2">
                    {course.coreConcepts.map((concept, idx) => (
                      <li key={idx} className="flex items-start text-base text-slate-600">
                        <CheckCircle2 size={16} className="mr-2 mt-0.5 text-brand-500 shrink-0" />
                        <span>{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100">
                  {course.link ? (
                    <a href={course.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-brand-700 font-semibold hover:text-brand-900 transition-colors text-base">
                      <BookOpen size={18} className="mr-2" />
                      課程專頁 / 紀錄
                      <ExternalLink size={14} className="ml-1 opacity-60" />
                    </a>
                  ) : (
                     <span className="text-slate-400 text-base flex items-center cursor-not-allowed">
                        <BookOpen size={18} className="mr-2" />
                        課程詳情即將更新
                     </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-slate-50 p-8 rounded-2xl text-center border border-slate-200">
           <h3 className="text-2xl font-bold text-slate-800 mb-4">核心教學場域</h3>
           <p className="text-slate-600 max-w-3xl mx-auto text-base">
             自2019年起，於哈佛大學、臺灣大學、北京大學、東華大學、臺北藝術大學與東吳大學，開設「創業家思維」、「多面向思維」、「動態競爭」、「當代藝術創業」、「創新與創業心理」與「全球健康發展政策」學等相關領域的課程
           </p>
        </div>

      </Section>
    </div>
  );
};