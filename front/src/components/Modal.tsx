import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, title, children }: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const el = document.getElementById("modal-root");
  if (!el) return null;

  return ReactDOM.createPortal(
    <div className="modal__backdrop" onClick={onClose} aria-hidden="true">
      <div
        className="modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__header">
          {title && <h2 id="modal-title">{title}</h2>}
          <button className="modal__close" onClick={onClose} aria-label="Fechar">×</button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>,
    el
  );
}
