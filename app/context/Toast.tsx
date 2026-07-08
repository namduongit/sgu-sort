'use client'

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { v4 as uuidv4 } from 'uuid';

type Toast = {
    id: string;
    type: "success" | "error";
    message: string;
}

type ToastContextType = {
    openToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

const CARD_HEIGHT = 45;
const GAP = 8;
const MAX_PEEK = 3;
const AUTO_DISMISS_MS = 2000;

const ToastItem = ({
    toast,
    index,
    hovered,
    total,
}: {
    toast: Toast;
    index: number;
    hovered: boolean;
    total: number;
}) => {
    const isHidden = !hovered && index >= MAX_PEEK;

    const top = hovered ? index * (CARD_HEIGHT + GAP) : index * 8;
    const scale = hovered ? 1 : Math.max(1 - index * 0.045, 0.86);
    const opacity = hovered ? 1 : isHidden ? 0 : 1 - index * 0.16;
    const zIndex = total - index;

    const isSuccess = toast.type === "success";

    return (
        <div
            style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                height: CARD_HEIGHT,
                transform: `translateY(${top}px) scale(${scale})`,
                transformOrigin: "top center",
                opacity,
                zIndex,
                transition:
                    "transform 300ms cubic-bezier(0.22, 1, 0.36, 1), opacity 250ms ease",
                pointerEvents: isHidden ? "none" : "auto",
            }}
        >
            <div
                className={`h-full flex items-center gap-2 rounded-md bg-white pl-3 pr-4 py-1 border-l-3 ${isSuccess ? "border-green-600" : "border-red-600"
                    }`}
                style={{
                    boxShadow: hovered
                        ? "0 6px 16px rgba(15, 23, 42, 0.10)"
                        : `0 ${2 + index * 2}px ${8 + index * 4}px rgba(15, 23, 42, ${0.14 - index * 0.03
                        })`,
                }}
            >
                {isSuccess ? (
                    <CheckCircleIcon sx={{ fontSize: 18 }} className="text-emerald-500 shrink-0" />
                ) : (
                    <CancelIcon sx={{ fontSize: 18 }} className="text-rose-500 shrink-0" />
                )}
                <p className="text-sm text-slate-700 truncate">{toast.message}</p>
            </div>
        </div>
    );
};

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [hovered, setHovered] = useState(false);
    const timers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        const t = timers.current.get(id);
        if (t) {
            clearTimeout(t);
            timers.current.delete(id);
        }
    }, []);

    const openToast = useCallback((toast: Omit<Toast, "id">) => {
        const id = uuidv4();
        setToasts((prev) => [{ id, ...toast }, ...prev]);
    }, []);

    useEffect(() => {
        if (hovered) {
            timers.current.forEach((t) => clearTimeout(t));
            timers.current.clear();
            return;
        }
        toasts.forEach((toast) => {
            if (!timers.current.has(toast.id)) {
                const t = setTimeout(() => removeToast(toast.id), AUTO_DISMISS_MS);
                timers.current.set(toast.id, t);
            }
        });
    }, [toasts, hovered, removeToast]);

    const containerHeight = useMemo(() => {
        if (toasts.length === 0) return 0;
        return hovered
            ? toasts.length * (CARD_HEIGHT + GAP) - GAP
            : CARD_HEIGHT + Math.min(toasts.length - 1, MAX_PEEK - 1) * 8;
    }, [toasts.length, hovered]);

    return (
        <ToastContext.Provider value={{ openToast }}>
            {children}

            {toasts.length > 0 && (
                <div
                    className="fixed top-4 right-4 z-50 w-80"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div
                        style={{
                            position: "relative",
                            height: containerHeight,
                            transition: "height 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                        }}
                    >
                        {toasts.map((toast, index) => (
                            <ToastItem
                                key={toast.id}
                                toast={toast}
                                index={index}
                                hovered={hovered}
                                total={toasts.length}
                            />
                        ))}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    );
};

export type { Toast, ToastContextType };
export { ToastContext, ToastProvider };