"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

const MotionSettingsContext = createContext(true);

/** Feeds the admin's site-wide animation toggle down to client components. */
export function MotionSettingsProvider({
  animationsEnabled,
  children,
}: {
  animationsEnabled: boolean;
  children: ReactNode;
}) {
  return (
    <MotionSettingsContext.Provider value={animationsEnabled}>{children}</MotionSettingsContext.Provider>
  );
}

/**
 * True when motion should be skipped/reduced — either because the admin
 * turned animations off site-wide, or the user's OS asked for reduced
 * motion. Drop-in replacement for framer-motion's own `useReducedMotion()`.
 */
export function useMotionSetting() {
  const animationsEnabled = useContext(MotionSettingsContext);
  const osReducedMotion = useReducedMotion();
  return !animationsEnabled || !!osReducedMotion;
}
