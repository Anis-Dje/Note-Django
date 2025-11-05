import React from "react";
import "../styles/LoadingIndicator.css";

export default function LoadingIndicator({ size = 18, color = "#ffffff" }) {
  // size in px, color for the visible part of the spinner
  const borderWidth = Math.max(2, Math.round(size / 6));
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    borderWidth: `${borderWidth}px`,
    borderTopColor: color,
  };

  return <span className="loading-indicator" style={style} aria-hidden="true" />;
}