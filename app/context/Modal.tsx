'use client'

import { createContext, useCallback, useRef, useState } from "react";

type Modal = {
    title: string;
    message: string;
}

type ModalContextType = {
    openModal: (modal: Modal) => void;
    waitModal: (modal: Modal) => Promise<boolean>;
}

const ModalContext = createContext<ModalContextType | null>(null);

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
    const [modal, setModal] = useState<Modal | null>(null);
    const resolveRef = useRef<((val: boolean) => void) | null>(null);

    const openModal = useCallback((m: Modal) => {
        setModal(m);
        resolveRef.current = null;
    }, []);

    const waitModal = useCallback((m: Modal): Promise<boolean> => {
        return new Promise((resolve) => {
            setModal(m);
            resolveRef.current = resolve;
        })
    }, []);

    const handleClose = (result: boolean) => {
        if (resolveRef.current) {
            resolveRef.current(result);
            resolveRef.current = null;
        }
        setModal(null);
    }

    return (
        <ModalContext.Provider value={{ openModal, waitModal }}>
            {children}

            {modal && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-sm rounded-sm bg-white p-5 shadow-xl">
                        <h2 className="text-base font-semibold text-slate-800">
                            {modal.title}
                        </h2>
                        <p className="mt-2 text-sm text-slate-600">
                            {modal.message}
                        </p>

                        <div className="mt-5 flex justify-end gap-2">
                            {resolveRef.current && (
                                <button
                                    onClick={() => handleClose(false)}
                                    className="rounded border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
                                >
                                    Hủy
                                </button>
                            )}
                            <button
                                onClick={() => handleClose(true)}
                                className="rounded bg-slate-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700"
                            >
                                {resolveRef.current ? "Xác nhận" : "Đóng"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    )
}

export type { Modal, ModalContextType }
export { ModalContext, ModalProvider }