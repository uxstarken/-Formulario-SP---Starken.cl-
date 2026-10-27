import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumb({ items = [{ label: 'Inicio', href: '#' }, { label: 'Registro Somos Partner', active: true }] }) {
  return (
    <nav aria-label="Breadcrumb" className="w-full pb-3 sm:pb-4 font-['Nunito',sans-serif]">
      <ol className="flex items-center flex-wrap gap-2 text-[13px] sm:text-[14px]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {item.active || isLast ? (
                <span className="font-semibold text-[#009239]">
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href || '#'}
                  className="text-[#666666] hover:text-[#009239] transition-colors"
                >
                  {item.label}
                </a>
              )}
              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 text-[#999999] stroke-[2.2]" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
