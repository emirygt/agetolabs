'use client';

import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { Product } from '@/constants/products';
import Link from 'next/link';
import { useLanguage } from '@/components/LanguageContext';

export function ProductCard({ product }: { product: Product }) {
  const { t, lang } = useLanguage();
  const IconComponent = (Icons as any)[product.icon] || Icons.Box;
  const SecondaryIconComponent = product.secondaryIcon ? (Icons as any)[product.secondaryIcon] : null;

  const glowStyles = {
    purple: 'shadow-[0_0_20px_rgba(168,85,247,0.4)] border-purple-500/60',
    green: 'shadow-[0_0_20px_rgba(110,231,183,0.4)] border-[#8EF0B5]/60',
    none: 'border-white/[0.08] hover:border-white/[0.15]',
  };

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className={`relative flex flex-col justify-between p-5 rounded-2xl bg-[#13151A] border transition-all duration-300 h-full min-h-[180px] ${glowStyles[product.glow]}`}
      >
        <div className="flex justify-between items-start mb-4">
          <div className={`w-10 h-10 flex items-center justify-center ${product.iconColor}`}>
            <IconComponent size={32} strokeWidth={1.5} />
          </div>
          
          {SecondaryIconComponent && (
            <div className={`flex flex-col items-center ${product.secondaryIconColor}`}>
              <SecondaryIconComponent size={24} strokeWidth={1.5} />
              {product.id === 'otonom-agent' && <span className="text-[10px] font-bold mt-1">GA4</span>}
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <h3 className="text-lg font-semibold text-white mb-1">{lang === 'tr' && product.nameTr ? product.nameTr : product.name}</h3>
          <p className="text-[#9CA3AF] text-xs leading-relaxed mb-4 min-h-[32px]">{lang === 'tr' && product.descriptionTr ? product.descriptionTr : product.description}</p>
          
          <span className="text-[#8EF0B5] text-xs font-medium hover:text-white transition-colors">
            {t('learnMore')}
          </span>
        </div>
      </motion.div>
    </Link>
  );
}
