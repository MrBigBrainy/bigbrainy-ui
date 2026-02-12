// src/components/Toast/store.ts
import { useSyncExternalStore } from "react";
var toasts = [];
var listeners = [];
function emitChange() {
  listeners.forEach((listener) => listener());
}
function subscribe(listener) {
  listeners.push(listener);
  return () => {
    listeners = listeners.filter((listener2) => listener2 !== listener2);
  };
}
function getSnapShot() {
  return toasts;
}
function addToast(toast2) {
  toasts = [...toasts, toast2];
  emitChange();
}
function removeToast(id) {
  toasts = toasts.filter((toast2) => toast2.id !== id);
  emitChange();
}
function useToastStore() {
  return useSyncExternalStore(subscribe, getSnapShot, getSnapShot);
}

// src/components/Toast/Toaster.tsx
import { createPortal } from "react-dom";
import { jsx } from "react/jsx-runtime";
function Toaster() {
  const toasts2 = useToastStore();
  if (typeof window === "undefined") return null;
  return createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 9999
        },
        children: toasts2.map((toast2) => /* @__PURE__ */ jsx(
          "div",
          {
            onClick: () => removeToast(toast2.id),
            style: {
              padding: "12px 16px",
              borderRadius: "8px",
              color: "white",
              cursor: "pointer",
              background: toast2.type === "success" ? "#16a34a" : toast2.type === "error" ? "#dc2626" : "#333"
            },
            children: toast2.message
          },
          toast2.id
        ))
      }
    ),
    document.body
  );
}

// src/components/Toast/toast.ts
var baseToast = (message, options) => {
  const id = crypto.randomUUID();
  const duration = options?.duration ?? 3e3;
  addToast({
    id,
    message,
    type: options?.type ?? "default",
    duration
  });
  if (duration !== Infinity) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }
};
var toast = baseToast;
toast.success = (message) => toast(message, { type: "success" });
toast.error = (message) => toast(message, { type: "error" });
export {
  Toaster,
  toast
};
