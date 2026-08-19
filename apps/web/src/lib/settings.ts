import { getDB } from "@/lib/db";

export const DEFAULT_SETTINGS = {
  colorPrimary: "#2c3873",
  colorTurquoise: "#00d4c8",
  colorYellow: "#ffd93d",
  colorOrange: "#ff8a3d",
  colorGrape: "#8b5cf6",
  colorMint: "#7ce2b5",
  colorSky: "#7cc5ff",
  colorInk: "#1a1033",
  colorCloud: "#fff9f2",
  animationsEnabled: true,
};

/** Curated combinations an admin can apply in one click from /admin/appearance. */
export const PALETTE_PRESETS: { name: string; colors: Omit<SiteSettingsData, "animationsEnabled"> }[] = [
  {
    name: "Classic Playground",
    colors: {
      colorPrimary: "#2c3873",
      colorTurquoise: "#00d4c8",
      colorYellow: "#ffd93d",
      colorOrange: "#ff8a3d",
      colorGrape: "#8b5cf6",
      colorMint: "#7ce2b5",
      colorSky: "#7cc5ff",
      colorInk: "#1a1033",
      colorCloud: "#fff9f2",
    },
  },
  {
    name: "Bubblegum Pastel",
    colors: {
      colorPrimary: "#5b4b8a",
      colorTurquoise: "#5fd8d1",
      colorYellow: "#ffe28a",
      colorOrange: "#ff9e80",
      colorGrape: "#b48af0",
      colorMint: "#9ce8c4",
      colorSky: "#a8d8ff",
      colorInk: "#2e2540",
      colorCloud: "#fff6f8",
    },
  },
  {
    name: "Carnival Bold",
    colors: {
      colorPrimary: "#d6336c",
      colorTurquoise: "#00b8a9",
      colorYellow: "#ffc93c",
      colorOrange: "#ff6b35",
      colorGrape: "#7048e8",
      colorMint: "#63e6be",
      colorSky: "#4dabf7",
      colorInk: "#1a1033",
      colorCloud: "#fffaf0",
    },
  },
  {
    name: "Jungle Adventure",
    colors: {
      colorPrimary: "#2f6a4f",
      colorTurquoise: "#12b8a6",
      colorYellow: "#f4c95d",
      colorOrange: "#e8734a",
      colorGrape: "#6a5acd",
      colorMint: "#8fd9a8",
      colorSky: "#79c7c0",
      colorInk: "#1c2b22",
      colorCloud: "#f6faf4",
    },
  },
  {
    name: "Candy Sky",
    colors: {
      colorPrimary: "#3b4d9c",
      colorTurquoise: "#22c1e0",
      colorYellow: "#ffd166",
      colorOrange: "#ff8fa3",
      colorGrape: "#9d4edd",
      colorMint: "#7ee8c9",
      colorSky: "#8ecae6",
      colorInk: "#1b1f3b",
      colorCloud: "#f5f9ff",
    },
  },
];

export type SiteSettingsData = typeof DEFAULT_SETTINGS;

/**
 * Loads the singleton SiteSettings row, falling back to defaults if the
 * database isn't reachable yet so the site never breaks over this.
 */
type SettingsRow = {
  colorPrimary: string;
  colorTurquoise: string;
  colorYellow: string;
  colorOrange: string;
  colorGrape: string;
  colorMint: string;
  colorSky: string;
  colorInk: string;
  colorCloud: string;
  animationsEnabled: number;
};

export async function getSiteSettings(): Promise<SiteSettingsData> {
  try {
    const db = getDB();
    const row = await db
      .prepare("SELECT * FROM SiteSettings WHERE id = 'default'")
      .first<SettingsRow>();
    if (!row) return DEFAULT_SETTINGS;
    return {
      colorPrimary: row.colorPrimary,
      colorTurquoise: row.colorTurquoise,
      colorYellow: row.colorYellow,
      colorOrange: row.colorOrange,
      colorGrape: row.colorGrape,
      colorMint: row.colorMint,
      colorSky: row.colorSky,
      colorInk: row.colorInk,
      colorCloud: row.colorCloud,
      animationsEnabled: !!row.animationsEnabled,
    };
  } catch (err) {
    console.warn("[settings] failed to load site settings:", err);
    return DEFAULT_SETTINGS;
  }
}

/** "#2c3873" -> "44 56 115" (space-separated RGB channels for CSS `rgb(var(...) / <alpha>)`). */
export function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return "0 0 0";
  return `${r} ${g} ${b}`;
}
