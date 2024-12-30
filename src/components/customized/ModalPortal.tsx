"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Global Components
import { Button } from "@/components/common";
// Icons
import { MenuCloseIcon } from "@/utils/icons";

// <body>: <div id="modal-portal-root"></div>

interface ModalPortalProps {
  children?: React.ReactNode;
  modalTitle: string;
  actionButtonText: string;
  leftButtonIcon?: React.ReactElement | string | undefined;
  rightButtonIcon?: React.ReactElement | string | undefined;
  stylesButton?: string;
};

const ModalPortal: React.FC<ModalPortalProps> = ({
  children,
  modalTitle,
  actionButtonText = "Open Modal",
  leftButtonIcon,
  rightButtonIcon,
  stylesButton,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleOpenModal = () => {
    modalRef.current?.showModal();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
    setOpenModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openModal) {
        handleCloseModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openModal]);

  const { tones } = useThemeController();

  const dialogContent = (
    <dialog
      ref={modalRef}
      className="bg-stone-950/90 fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-20"
      onCancel={handleCloseModal}
    >
      <div className={`${tones.outlineColor.normal} bg-stone-200 dark:bg-stone-900 outline shadow-lg w-[90%] md:w-[60%] p-0 rounded-lg overflow-hidden transition-all`}>
        <header className={`${tones.bgColor.dark} border-b-4 ${tones.borderColor.normal} flex justify-between items-center px-4 py-2`}>
          <h2 className="text-stone-200 text-xl font-bold capitalize">
            {modalTitle}
          </h2>

          <Button
            title={"cerrar menú (Esc)"}
            text={"cerrar"}
            rightIcon={<MenuCloseIcon />}
            styles={"self-end"}
            onClick={handleCloseModal}
          />
        </header>

        <section className="p-4 overflow-y-auto max-h-[70vh] text-stone-900 dark:text-stone-200">
          {children}
        </section>
      </div>
    </dialog>
  );

  return (
    <>
      <Button
        title={modalTitle}
        text={actionButtonText}
        rightIcon={rightButtonIcon}
        leftIcon={leftButtonIcon}
        styles={stylesButton}
        onClick={handleOpenModal}
      />

      {openModal && createPortal(dialogContent, document.getElementById("modal-portal-root")!)}
    </>
  );
};

export { ModalPortal };
