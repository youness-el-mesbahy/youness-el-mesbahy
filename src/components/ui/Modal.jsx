import React, { createContext, useContext, useState } from 'react'
import { createPortal } from 'react-dom'

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

function Window({ children, name }) {
  const { openName, close } = useModal();
  const [isRendered, setIsRendered] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (openName === name) {
      setIsRendered(true);
      const timer = setTimeout(() => setIsVisible(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => setIsRendered(false), 200); // Matches duration-400
      return () => clearTimeout(timer);
    }
  }, [openName, name]);

  if (!isRendered) return null;

  return createPortal(
    <div
      onClick={close}
      className={`fixed inset-0 z-[1000] bg-carbon-900/40 backdrop-blur-sm transition-all duration-400 ease-in-out ${isVisible ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
    >
      <div
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
