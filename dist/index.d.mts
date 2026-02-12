import * as react from 'react';

declare function Toaster(): react.ReactPortal | null;

type ToastType = "default" | "success" | "error";

interface ToastOptions {
    type?: ToastType;
    duration?: number;
    position?: "top-left" | "top-right" | "top-center" | "bottom-left" | "bottom-right" | "bottom-center";
}
interface ToastFN {
    (message: string, options?: ToastOptions): void;
    success: (message: string) => void;
    error: (message: string) => void;
}
declare const toast: ToastFN;

export { Toaster, toast };
