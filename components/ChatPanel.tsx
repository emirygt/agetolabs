'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Sparkles, Paperclip, FileText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';

type AttachedFile = { name: string; size: number; type: string };

type Message = {
  id: string;
  role: 'user' | 'bot';
  text: string;
  file?: AttachedFile;
};

type LeadStep = 'idle' | 'name' | 'email' | 'message' | 'done';

type Lead = {
  name?: string;
  email?: string;
  message?: string;
  intent?: string;
  files?: AttachedFile[];
  capturedAt?: string;
};

type QuickReply = {
  key: 'products' | 'demo' | 'pricing' | 'contact';
  label: string;
};

const LEADS_STORAGE_KEY = 'agetolabs.leads';
const CHAR_LIMIT = 1000;

const i18n = {
  tr: {
    title: 'agetolabs AI',
    modelBadge: 'beta',
    statusOnline: 'Çevrimiçi',
    statusFooter: 'Tüm sistemler aktif',
    placeholder: 'Sor, paylaş, talep et...',
    welcome:
      'Merhaba! 👋 Ben agetolabs AI. Sana nasıl yardımcı olabilirim?',
    newLineHint: 'Shift + Enter',
    newLineLabel: 'yeni satır',
    attachLabel: 'Dosya ekle',
    fileTooBig: 'Dosya çok büyük. Maksimum 10MB yükleyebilirsin.',
    fileReceived: '✓ Dosyanı aldım. İnceleyip sana döneceğiz.',
    quickReplies: [
      { key: 'products', label: 'Ürünleri göster' },
      { key: 'demo', label: 'Demo iste' },
      { key: 'pricing', label: 'Fiyatlandırma' },
      { key: 'contact', label: 'İletişim' },
    ] as QuickReply[],
    fallback:
      'Bu konuda direkt cevap veremiyorum ama ekibimiz yardımcı olur. Bilgilerini bırakır mısın? Sana özel dönüş yaparız. 👇',
    products:
      'agetolabs 7 otonom ürün geliştirir:\n\n• Structa AI — içerik studio\n• Pharma AI — ilaç & takviye platformu\n• Agento Flow — enterprise orchestration\n• priceCompare — fiyat zekası\n• Autonomous Agent — e-ticaret ajanı\n• Eczaport — B2B eczane platformu\n• WhatsApp Sales — WP otomasyon\n\nDemo görmek ister misin?',
    pricing:
      'Fiyatlandırma ihtiyaca + ölçeğe göre değişir. Sana özel teklif hazırlayabiliriz — bilgilerini alalım mı?',
    lead: {
      askName: 'Harika! 👋 Önce ismini alabilir miyim?',
      askEmail: (name: string) =>
        `Memnun oldum ${name}. E-posta adresini paylaşır mısın?`,
      invalidEmail:
        'Bu e-posta geçerli görünmüyor. Tekrar dener misin?',
      askMessage:
        'Son olarak — kısaca ne yapmak istediğini birkaç cümleyle anlatır mısın?',
      success: (name: string) =>
        `✓ Aldım ${name}! Bilgilerin ekibimize iletildi. 24 saat içinde sana özel dönüş yapacağız. 🚀`,
    },
  },
  en: {
    title: 'agetolabs AI',
    modelBadge: 'beta',
    statusOnline: 'Online',
    statusFooter: 'All systems operational',
    placeholder: 'Ask, share, request...',
    welcome: "Hi there! 👋 I'm agetolabs AI. How can I help?",
    newLineHint: 'Shift + Enter',
    newLineLabel: 'new line',
    attachLabel: 'Attach file',
    fileTooBig: 'File is too large. Maximum size is 10MB.',
    fileReceived: "✓ Got your file. We'll review it and get back to you.",
    quickReplies: [
      { key: 'products', label: 'Show products' },
      { key: 'demo', label: 'Request demo' },
      { key: 'pricing', label: 'Pricing' },
      { key: 'contact', label: 'Contact' },
    ] as QuickReply[],
    fallback:
      "I can't answer that directly, but our team can. Mind sharing your details? We'll get back to you. 👇",
    products:
      'agetolabs builds 7 autonomous products:\n\n• Structa AI — content studio\n• Pharma AI — pharma & supplement platform\n• Agento Flow — enterprise orchestration\n• priceCompare — price intelligence\n• Autonomous Agent — ecommerce agent\n• Eczaport — B2B pharmacy platform\n• WhatsApp Sales — WP automation\n\nWant to see a demo?',
    pricing:
      'Pricing depends on need + scale. We can prepare a custom quote — shall we collect your details?',
    lead: {
      askName: "Great! 👋 First, what's your name?",
      askEmail: (name: string) =>
        `Nice to meet you ${name}. Could you share your email?`,
      invalidEmail:
        "That email doesn't look valid. Want to try again?",
      askMessage:
        'Last one — could you describe in a few sentences what you want to do?',
      success: (name: string) =>
        `✓ Got it ${name}! Your info is with our team. We'll get back to you with a tailored response within 24 hours. 🚀`,
    },
  },
} as const;

const uid = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const isValidEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ACCEPTED_FILES =
  '.pdf,.doc,.docx,.xls,.xlsx,.csv,.txt,.png,.jpg,.jpeg,.webp';

const formatBytes = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

const saveLead = (lead: Lead) => {
  if (typeof window === 'undefined') return;
  try {
    const raw = window.localStorage.getItem(LEADS_STORAGE_KEY);
    const arr: Lead[] = raw ? JSON.parse(raw) : [];
    arr.push({ ...lead, capturedAt: new Date().toISOString() });
    window.localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(arr));
  } catch {
    // ignore
  }
};

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ChatPanel({ open, onClose }: Props) {
  const { lang } = useLanguage();
  const t = i18n[lang];

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [leadStep, setLeadStep] = useState<LeadStep>('idle');
  const [lead, setLead] = useState<Lead>({});
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ id: uid(), role: 'bot', text: t.welcome }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const autosizeTextarea = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  };

  useEffect(() => {
    autosizeTextarea();
  }, [input]);

  const pushBot = (text: string, delay = 600) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: uid(), role: 'bot', text }]);
      setIsTyping(false);
    }, delay + Math.random() * 400);
  };

  const pushUser = (text: string) => {
    setMessages((prev) => [...prev, { id: uid(), role: 'user', text }]);
  };

  const startLeadCapture = (intent: string) => {
    setLead({ intent });
    setLeadStep('name');
    pushBot(t.lead.askName);
  };

  const handleQuickReply = (qr: QuickReply) => {
    pushUser(qr.label);
    if (qr.key === 'products') {
      pushBot(t.products);
    } else if (qr.key === 'pricing') {
      pushBot(t.pricing, 700);
      setTimeout(() => startLeadCapture('pricing'), 1900);
    } else if (qr.key === 'demo' || qr.key === 'contact') {
      startLeadCapture(qr.key);
    }
  };

  const handlePickFile = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    e.target.value = '';
    if (!f) return;
    if (f.size > MAX_FILE_BYTES) {
      pushBot(t.fileTooBig, 400);
      return;
    }
    setPendingFile(f);
  };

  const handleSend = (raw: string) => {
    const text = raw.trim();
    if (!text && !pendingFile) return;

    if (pendingFile) {
      const fileMeta: AttachedFile = {
        name: pendingFile.name,
        size: pendingFile.size,
        type: pendingFile.type,
      };
      setMessages((prev) => [
        ...prev,
        { id: uid(), role: 'user', text: text || pendingFile.name, file: fileMeta },
      ]);
      setLead((l) => ({ ...l, files: [...(l.files ?? []), fileMeta] }));
      setPendingFile(null);
      setInput('');
      pushBot(t.fileReceived, 700);
      if (leadStep === 'idle') {
        setTimeout(() => startLeadCapture('file-upload'), 2000);
      }
      return;
    }

    pushUser(text);
    setInput('');

    if (leadStep === 'name') {
      const name = text.slice(0, 60);
      setLead((l) => ({ ...l, name }));
      setLeadStep('email');
      pushBot(t.lead.askEmail(name));
      return;
    }
    if (leadStep === 'email') {
      if (!isValidEmail(text)) {
        pushBot(t.lead.invalidEmail);
        return;
      }
      const email = text.trim();
      setLead((l) => ({ ...l, email }));
      setLeadStep('message');
      pushBot(t.lead.askMessage);
      return;
    }
    if (leadStep === 'message') {
      const message = text.slice(0, 500);
      const finalLead = { ...lead, message };
      saveLead(finalLead);
      setLead(finalLead);
      setLeadStep('done');
      pushBot(t.lead.success(finalLead.name ?? ''), 900);
      return;
    }

    pushBot(t.fallback, 800);
    setTimeout(() => startLeadCapture('inbound'), 2200);
  };

  const onTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  const showQuickReplies =
    leadStep === 'idle' && messages.length === 1 && !isTyping;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22 }}
          className="hidden md:flex pointer-events-auto fixed bottom-4 right-4 z-[62] flex-col w-[420px] h-[600px] rounded-3xl bg-[#0F1014]/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.85),0_0_60px_-30px_rgba(142,240,181,0.35)] overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#8EF0B5]/25 to-[#a855f7]/20 border border-[#8EF0B5]/40 flex items-center justify-center text-[#8EF0B5] shadow-[0_0_18px_rgba(142,240,181,0.5)]">
                <Sparkles size={14} />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#8EF0B5] border-2 border-[#0F1014] shadow-[0_0_8px_rgba(142,240,181,0.9)]" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white leading-none flex items-center gap-2">
                  {t.title}
                  <span className="text-[9px] uppercase tracking-[0.18em] font-medium px-1.5 py-0.5 rounded-md bg-[#8EF0B5]/12 text-[#8EF0B5] border border-[#8EF0B5]/25">
                    {t.modelBadge}
                  </span>
                </p>
                <p className="text-[10px] mt-1.5 text-gray-400 flex items-center gap-1.5 uppercase tracking-[0.18em]">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] animate-pulse" />
                  {t.statusOnline}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-5 py-5 space-y-3 [scrollbar-width:thin]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[82%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#8EF0B5] text-black rounded-br-md font-medium shadow-[0_0_14px_rgba(142,240,181,0.25)]'
                      : 'bg-[#1A1D24] text-gray-200 rounded-bl-md border border-white/[0.04]'
                  }`}
                >
                  {msg.file && (
                    <div
                      className={`flex items-center gap-2.5 -mx-1 mb-1.5 px-2.5 py-2 rounded-xl ${
                        msg.role === 'user'
                          ? 'bg-black/15 border border-black/10'
                          : 'bg-white/[0.04] border border-white/[0.05]'
                      }`}
                    >
                      <FileText size={16} className="shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold truncate">{msg.file.name}</p>
                        <p className="text-[10px] opacity-60 mt-0.5">
                          {formatBytes(msg.file.size)}
                        </p>
                      </div>
                    </div>
                  )}
                  {msg.text && msg.text !== msg.file?.name && <span>{msg.text}</span>}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#1A1D24] text-gray-200 rounded-2xl rounded-bl-md border border-white/[0.04] px-4 py-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse [animation-delay:200ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse [animation-delay:400ms]" />
                </div>
              </div>
            )}
          </div>

          {showQuickReplies && (
            <div className="px-5 pb-3 flex flex-wrap gap-2">
              {t.quickReplies.map((qr) => (
                <button
                  key={qr.key}
                  type="button"
                  onClick={() => handleQuickReply(qr)}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#1A1D24] text-gray-300 border border-white/[0.06] hover:border-[#8EF0B5]/40 hover:text-white transition-colors"
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          <div className="px-4 pt-3 pb-3 border-t border-white/[0.06] bg-[#0B0C10]/40">
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_FILES}
              onChange={handleFileChange}
              className="hidden"
            />

            {pendingFile && (
              <div className="mb-2 flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#1A1D24] border border-[#8EF0B5]/25">
                <div className="w-8 h-8 rounded-lg bg-[#8EF0B5]/12 border border-[#8EF0B5]/25 flex items-center justify-center text-[#8EF0B5]">
                  <FileText size={14} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold text-white truncate">
                    {pendingFile.name}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-0.5">
                    {formatBytes(pendingFile.size)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPendingFile(null)}
                  aria-label="Remove file"
                  className="w-6 h-6 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <div className="relative rounded-2xl bg-[#1A1D24] border border-white/[0.06] focus-within:border-[#8EF0B5]/40 transition-colors">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value.slice(0, CHAR_LIMIT))}
                onKeyDown={onTextareaKeyDown}
                placeholder={t.placeholder}
                rows={1}
                maxLength={CHAR_LIMIT}
                disabled={leadStep === 'done'}
                className="w-full bg-transparent text-sm text-white placeholder:text-gray-500 pl-4 pr-4 pt-3 pb-9 outline-none resize-none [scrollbar-width:thin] disabled:opacity-50"
                style={{ minHeight: '44px', maxHeight: '120px' }}
              />
              <div className="absolute left-0 right-0 bottom-0 px-3 pb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    type="button"
                    onClick={handlePickFile}
                    aria-label={t.attachLabel}
                    title={t.attachLabel}
                    disabled={leadStep === 'done' || !!pendingFile}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/45 hover:text-[#8EF0B5] hover:bg-white/5 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <Paperclip size={15} />
                  </button>
                  <span className="text-[10px] text-white/25 font-mono">
                    {input.length} / {CHAR_LIMIT}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSend(input)}
                  disabled={(!input.trim() && !pendingFile) || isTyping || leadStep === 'done'}
                  aria-label="Send"
                  className="pointer-events-auto w-8 h-8 rounded-xl bg-[#8EF0B5] text-black flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_18px_rgba(142,240,181,0.4)]"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.18em]">
              <span className="text-white/35">
                <span className="font-mono text-white/55 normal-case tracking-normal">
                  {t.newLineHint}
                </span>{' '}
                · {t.newLineLabel}
              </span>
              <span className="text-[#8EF0B5]/70 flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#8EF0B5] animate-pulse" />
                {t.statusFooter}
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
