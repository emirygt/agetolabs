'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { useLanguage } from '@/components/LanguageContext';

type Props = {
  visible: boolean;
  onClick: () => void;
  onDismiss: () => void;
};

export function ChatBubble({ visible, onClick, onDismiss }: Props) {
  const { lang } = useLanguage();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 12 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.6, opacity: 0, y: 12 }}
          transition={{ type: 'spring', stiffness: 240, damping: 20 }}
          className="pointer-events-auto"
        >
          <div className="relative">
            <button
              type="button"
              onClick={onClick}
              className="relative flex items-center gap-2 max-w-[280px] rounded-2xl rounded-br-md bg-[#13151A] border border-white/[0.08] pl-4 pr-8 py-3 text-left text-sm text-white leading-snug shadow-[0_18px_50px_-12px_rgba(0,0,0,0.6),0_0_30px_-15px_rgba(142,240,181,0.4)] hover:border-[#8EF0B5]/30 transition-colors cursor-pointer"
            >
              <span className="text-base leading-none">👋</span>
              <span>
                {lang === 'tr'
                  ? 'Benimle konuşmak ister misin?'
                  : 'Want to chat with me?'}
              </span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              aria-label="Dismiss"
              className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={11} strokeWidth={2.2} />
            </button>

            <span
              aria-hidden
              className="absolute -bottom-1 right-6 w-3 h-3 rotate-45 bg-[#13151A] border-r border-b border-white/[0.08]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
