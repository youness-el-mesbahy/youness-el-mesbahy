import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

const ModalContext = createContext(null)

function Modal({ children }) {
  const [openName, setOpenName] = useState('')

  const open = name => setOpenName(name)
  const close = () => setOpenName('')

  return <ModalContext.Provider value={{ openName, open, close }}>{children}</ModalContext.Provider>
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('Modal components must be used inside <Modal>')
  }
  return context
}

function Open({ children, opens }) {
  const { open } = useModal()

  return React.cloneElement(children, {
    onClick: () => open(opens),
  })
}

function Window({ children, name, ariaLabel = "Dialog" }) {
  const { openName, close } = useModal();
  const [isRendered, setIsRendered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const panelRef = useRef(null);
  const previousFocusRef = useRef(null);

  const trapFocus = useCallback((e) => {
    if (e.key === 'Escape') {
      close();
      return;
    }
    if (e.key !== 'Tab') return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll(FOCUSABLE_SELECTOR);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [close]);

  useEffect(() => {
    if (openName === name) {
      previousFocusRef.current = document.activeElement;
      setIsRendered(true);
      const renderTimer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(renderTimer);
    } else {
      setIsVisible(false);
      const hideTimer = setTimeout(() => {
        setIsRendered(false);
        previousFocusRef.current?.focus();
        previousFocusRef.current = null;
      }, 200);
      return () => clearTimeout(hideTimer);
    }
  }, [openName, name]);

  useEffect(() => {
    if (!isVisible) return;

    const panel = panelRef.current;
    if (!panel) return;

    const firstFocusable = panel.querySelector(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [isVisible, trapFocus]);

  if (!isRendered) return null;

  return createPortal(
    <div
      onClick={close}
      className={`fixed inset-0 z-[1000] bg-carbon-900/40 backdrop-blur-sm transition-all duration-400 ease-in-out ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
        className={`fixed bottom-0 left-1/2 h-[85vh] w-[calc(100vw-1.875rem)] -translate-x-1/2 rounded-t-2xl border border-carbon-200 bg-white p-8 dark:border-carbon-800 dark:bg-carbon-950 transform transition-all duration-400 ease-in-out ${isVisible ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

Modal.Open = Open
Modal.Window = Window

export default Modal
