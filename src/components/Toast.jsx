import { useState, useEffect } from "react";

export default function Toast({ message, type = "success", duration = 3000, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return {
          backgroundColor: "#10b981",
          icon: "✓"
        };
      case "error":
        return {
          backgroundColor: "#dc2626",
          icon: "✕"
        };
      case "warning":
        return {
          backgroundColor: "#f59e0b",
          icon: "⚠"
        };
      case "info":
        return {
          backgroundColor: "#3b82f6",
          icon: "ℹ"
        };
      default:
        return {
          backgroundColor: "#6b7280",
          icon: "•"
        };
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: styles.backgroundColor,
        color: "white",
        padding: "16px 20px",
        borderRadius: "8px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        fontWeight: "600",
        fontSize: "14px",
        animation: "slideIn 0.3s ease",
        zIndex: 9999,
        maxWidth: "400px",
        wordWrap: "break-word"
      }}
    >
      <span style={{ fontSize: "18px", fontWeight: "700" }}>{styles.icon}</span>
      <span>{message}</span>
    </div>
  );
}
