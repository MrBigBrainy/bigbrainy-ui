import { addToast, removeToast } from "./store";
import type { Toast, ToastType } from "./types";

interface ToastOptions {
  type?: ToastType;
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
}

interface ToastFN {
  (message: string, options?: ToastOptions): void;
  success: (message: string) => void;
  error: (message: string) => void;
}

const baseToast = (message: string, options?: ToastOptions) => {
  const id = crypto.randomUUID();
  const duration = options?.duration ?? 3000;

  addToast({
    id,
    message,
    type: options?.type ?? "default",
    duration,
  });

  if (duration !== Infinity) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
};

// Type assertion happens AFTER function is created
export const toast = baseToast as ToastFN;

toast.success = (message: string) => toast(message, { type: "success" });

toast.error = (message: string) => toast(message, { type: "error" });
