import { useToastStore, removeToast } from "./store";
import { createPortal } from "react-dom";

export function Toaster() {
  const toasts = useToastStore();

  if (typeof window === "undefined") return null;

  return createPortal(
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        zIndex: 9999,
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            color: "white",
            cursor: "pointer",
            background:
              toast.type === "success"
                ? "#16a34a"
                : toast.type === "error"
                  ? "#dc2626"
                  : "#333",
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>,
    document.body,
  );
}
