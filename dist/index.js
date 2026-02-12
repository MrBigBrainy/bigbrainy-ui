"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/components/Toast/index.ts
var index_exports = {};
__export(index_exports, {
  Toaster: () => Toaster,
  toast: () => toast
});
module.exports = __toCommonJS(index_exports);

// src/components/Toast/store.ts
var import_react = require("react");
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
  return (0, import_react.useSyncExternalStore)(subscribe, getSnapShot, getSnapShot);
}

// src/components/Toast/Toaster.tsx
var import_react_dom = require("react-dom");
var import_jsx_runtime = require("react/jsx-runtime");
function Toaster() {
  const toasts2 = useToastStore();
  if (typeof window === "undefined") return null;
  return (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        children: toasts2.map((toast2) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Toaster,
  toast
});
