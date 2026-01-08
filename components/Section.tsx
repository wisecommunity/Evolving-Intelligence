import React, { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  dark?: boolean;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", id, title, subtitle, dark = false }) => {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="mb-12 md:mb-16 text-center">
            {title && <h2 className={`text-3xl md:text-4xl font-bold font-serif mb-4 ${dark ? 'text-white' : 'text-brand-800'}`}>{title}</h2>}
            {subtitle && <p className={`text-lg md:text-xl max-w-2xl mx-auto ${dark ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>}
            <div className={`h-1 w-24 mx-auto mt-6 ${dark ? 'bg-brand-500' : 'bg-brand-700'}`}></div>
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
