import React from "react";

// Bassirou's mark: four rounded bars, the second split near the middle.
// Traced from the original logo PNG; uses currentColor so each page can tint it.
export default function Logo({ size = 28, className = "", title }) {
  return (
    <svg
      className={`logo ${className}`}
      viewBox="0 0 45 44"
      width={size}
      height={size}
      fill="currentColor"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : "true"}
    >
      {title && <title>{title}</title>}
      <rect x="0" y="0" width="8" height="44" rx="4" />
      <rect x="13" y="0" width="7.5" height="21" rx="3.75" />
      <rect x="13" y="24" width="7.5" height="20" rx="3.75" />
      <rect x="25" y="0" width="8" height="44" rx="4" />
      <rect x="37" y="0" width="8" height="44" rx="4" />
    </svg>
  );
}
