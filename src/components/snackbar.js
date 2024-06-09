import React from "react";

export default function Snackbar({ message, open, good }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: good ? "green" : "red",
        color: "white",
        padding: "1em",
      }}
    >
      {message}
    </div>
  );
}
