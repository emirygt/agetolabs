'use client';

import React, {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  forwardRef,
} from 'react';
import {
  motion,
  AnimatePresence,
  MotionConfig,
  type Transition,
  type Variant,
} from 'motion/react';
import { cn } from '@/lib/utils';
import { XIcon, Plus } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

interface DialogContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  uniqueId: string;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

const DialogContext = React.createContext<DialogContextType | null>(null);

function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within a DialogProvider');
  }
  return context;
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

type DialogProviderProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function DialogProvider({ children, transition }: DialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const uniqueId = useId();
  const triggerRef = useRef<HTMLDivElement | null>(null);

  const contextValue = useMemo(
    () => ({ isOpen, setIsOpen, uniqueId, triggerRef }),
    [isOpen, uniqueId]
  );

  return (
    <DialogContext.Provider value={contextValue}>
      <MotionConfig transition={transition}>{children}</MotionConfig>
    </DialogContext.Provider>
  );
}

type DialogProps = {
  children: React.ReactNode;
  transition?: Transition;
};

function Dialog({ children, transition }: DialogProps) {
  return (
    <DialogProvider transition={transition}>{children}</DialogProvider>
  );
}

/* ------------------------------------------------------------------ */
/*  Trigger                                                            */
/* ------------------------------------------------------------------ */

type DialogTriggerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogTrigger({ children, className, style }: DialogTriggerProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();

  const handleClick = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen, setIsOpen]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setIsOpen(!isOpen);
      }
    },
    [isOpen, setIsOpen]
  );

  return (
    <motion.div
      ref={triggerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('relative cursor-pointer', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={style}
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      aria-controls={`dialog-content-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Content                                                            */
/* ------------------------------------------------------------------ */

type DialogContentProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogContent({ children, className, style }: DialogContentProps) {
  const { setIsOpen, isOpen, uniqueId, triggerRef } = useDialog();
  const containerRef = useRef<HTMLDivElement>(null);
  const [firstFocusableElement, setFirstFocusableElement] =
    useState<HTMLElement | null>(null);
  const [lastFocusableElement, setLastFocusableElement] =
    useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      if (event.key === 'Tab') {
        if (!firstFocusableElement || !lastFocusableElement) return;
        if (event.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setIsOpen, firstFocusableElement, lastFocusableElement]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
      const focusableElements = containerRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements && focusableElements.length > 0) {
        setFirstFocusableElement(focusableElements[0] as HTMLElement);
        setLastFocusableElement(
          focusableElements[focusableElements.length - 1] as HTMLElement
        );
        (focusableElements[0] as HTMLElement).focus();
      }
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      triggerRef.current?.focus();
    }
  }, [isOpen, triggerRef]);

  return (
    <motion.div
      ref={containerRef}
      layoutId={`dialog-${uniqueId}`}
      className={cn('overflow-hidden', className)}
      style={style}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`dialog-title-${uniqueId}`}
      aria-describedby={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Container (backdrop + portal-style mount)                          */
/* ------------------------------------------------------------------ */

type DialogContainerProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogContainer({ children, className }: DialogContainerProps) {
  const { isOpen, setIsOpen, uniqueId } = useDialog();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence initial={false} mode="sync">
      {isOpen && (
        <>
          <motion.div
            key={`backdrop-${uniqueId}`}
            className="fixed inset-0 h-full z-50 w-full bg-white/40 backdrop-blur-sm dark:bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
          <div className={cn('fixed inset-0 z-50 w-fit mx-auto', className)}>
            {children}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Title / Subtitle / Description / Image / Close                     */
/* ------------------------------------------------------------------ */

type DialogTitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogTitle({ children, className, style }: DialogTitleProps) {
  const { uniqueId } = useDialog();
  return (
    <motion.div
      layoutId={`dialog-title-container-${uniqueId}`}
      className={className}
      style={style}
      layout
    >
      {children}
    </motion.div>
  );
}

type DialogSubtitleProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

function DialogSubtitle({ children, className, style }: DialogSubtitleProps) {
  const { uniqueId } = useDialog();
  return (
    <motion.div
      layoutId={`dialog-subtitle-container-${uniqueId}`}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

type DialogDescriptionProps = {
  children: React.ReactNode;
  className?: string;
  disableLayoutAnimation?: boolean;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function DialogDescription({
  children,
  className,
  variants,
  disableLayoutAnimation,
}: DialogDescriptionProps) {
  const { uniqueId } = useDialog();
  return (
    <motion.div
      key={`dialog-description-${uniqueId}`}
      layoutId={
        disableLayoutAnimation
          ? undefined
          : `dialog-description-content-${uniqueId}`
      }
      variants={variants}
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      id={`dialog-description-${uniqueId}`}
    >
      {children}
    </motion.div>
  );
}

type DialogImageProps = {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
};

function DialogImage({ src, alt, className, style }: DialogImageProps) {
  const { uniqueId } = useDialog();
  return (
    <motion.img
      src={src}
      alt={alt}
      className={cn(className)}
      layoutId={`dialog-img-${uniqueId}`}
      style={style}
    />
  );
}

type DialogCloseProps = {
  children?: React.ReactNode;
  className?: string;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
};

function DialogClose({ children, className, variants }: DialogCloseProps) {
  const { setIsOpen, uniqueId } = useDialog();
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <motion.button
      onClick={handleClose}
      type="button"
      aria-label="Close dialog"
      key={`dialog-close-${uniqueId}`}
      className={cn('absolute right-6 top-6', className)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
    >
      {children || <XIcon size={24} />}
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
/*  Grid Component (default export)                                    */
/* ------------------------------------------------------------------ */

export interface LinearCardItem {
  id: number | string;
  url: { src: string };
  title: string;
  description: string;
  tags?: string[];
}

interface ComponentProps {
  items: LinearCardItem[];
  className?: string;
}

const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ items, className }, ref) => {
    return (
      <div ref={ref} className={cn('flex gap-4', className)}>
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <Dialog
              transition={{
                type: 'spring',
                bounce: 0.05,
                duration: 0.5,
              }}
            >
              <DialogTrigger
                style={{ borderRadius: '14px' }}
                className="flex w-full flex-col overflow-hidden border border-white/[0.08] bg-[#0d0e12] hover:bg-[#13151b] transition-colors shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)]"
              >
                <DialogImage
                  src={item.url.src}
                  alt={item.title}
                  className="h-56 w-full object-cover"
                />
                <div className="flex flex-grow flex-row items-end justify-between p-4">
                  <DialogTitle className="text-zinc-50 text-base md:text-lg font-semibold tracking-tight">
                    {item.title}
                  </DialogTitle>
                  <button
                    aria-label="Show description"
                    className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#8EF0B5]/15 text-[#8EF0B5] hover:bg-[#8EF0B5]/25 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </DialogTrigger>

              <DialogContainer className="pt-16">
                <DialogContent
                  style={{ borderRadius: '24px' }}
                  className="relative flex h-full mx-auto flex-col overflow-y-auto border border-white/[0.08] bg-[#0d0e12] lg:w-[900px] w-[92%] max-h-[85vh]"
                >
                  <DialogImage
                    src={item.url.src}
                    alt={item.title}
                    className="h-[42vh] object-cover w-full"
                  />
                  <div className="p-7">
                    <DialogTitle className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                      {item.title}
                    </DialogTitle>
                    <DialogDescription
                      disableLayoutAnimation
                      variants={{
                        initial: { opacity: 0, scale: 0.95, y: -20 },
                        animate: { opacity: 1, scale: 1, y: 0 },
                        exit: { opacity: 0, scale: 0.95, y: -20 },
                      }}
                    >
                      <p className="mt-3 text-zinc-300/80 text-base md:text-lg leading-relaxed">
                        {item.description}
                      </p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#8EF0B5] border border-[#8EF0B5]/25 bg-[#8EF0B5]/[0.06] rounded-full px-2.5 py-1"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </DialogDescription>
                  </div>
                  <DialogClose className="text-white bg-white/10 hover:bg-white/15 p-3 rounded-full backdrop-blur-sm" />
                </DialogContent>
              </DialogContainer>
            </Dialog>
          </React.Fragment>
        ))}
      </div>
    );
  }
);

Component.displayName = 'LinearCardComponent';

export default Component;
export {
  Dialog,
  DialogTrigger,
  DialogContainer,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogSubtitle,
  DialogDescription,
  DialogImage,
};
