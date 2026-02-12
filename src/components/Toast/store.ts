import { useSyncExternalStore } from "react";
import type { Toast } from "./types";

let toasts: Toast[] = [];
let listeners: (() => void)[] = [];

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: () => void) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((listener) => listener !== listener);
  };
}

export function getSnapShot() {
  return toasts;
}
export function addToast(toast: Toast) {
  toasts = [...toasts, toast];
  emitChange();
}

export function removeToast(id: string) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emitChange();
}

export function useToastStore() {
  return useSyncExternalStore(subscribe, getSnapShot, getSnapShot);
}
