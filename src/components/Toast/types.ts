export type ToastType = "default" | "success" | "error";

export interface Toast {
  id: string;
  message: string;
  type?: ToastType;
  duration?: number;
}
