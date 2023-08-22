import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

interface ModalComponent extends React.FC<ModalProps> {
  Title: typeof ModalTitle;
  Description: typeof ModalDescription;
}

const Modal: ModalComponent = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsVisible(false);
    onClose();
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed inset-0 flex items-center justify-center z-50"
        >
          <div className="fixed inset-0 bg-black opacity-50 blur-sm"></div>
          <div
            ref={modalRef}
            className="bg-[#16171a] rounded-lg p-4 w-full text-white max-w-md relative"
          >
            <button
              className="absolute top-2 right-2 text-white"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface ModalTitleProps {
  children: React.ReactNode;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ children }) => {
  return <h2 className="text-xl font-semibold mb-2 pl-5">{children}</h2>;
};

interface ModalDescriptionProps {
  children: React.ReactNode;
}

const ModalDescription: React.FC<ModalDescriptionProps> = ({ children }) => {
  return <>{children}</>;
};

Modal.Title = ModalTitle;
Modal.Description = ModalDescription;

export default Modal;
