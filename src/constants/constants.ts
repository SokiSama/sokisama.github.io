export const PAGE_SIZE = 8;

export const LIGHT_MODE = "light" as const;
export const DARK_MODE = "dark" as const;
export const SYSTEM_MODE = "system" as const;
export type ThemeMode = typeof LIGHT_MODE | typeof DARK_MODE | typeof SYSTEM_MODE;
export const DEFAULT_THEME: ThemeMode = SYSTEM_MODE;

// Banner height unit: vh
export const BANNER_HEIGHT = 35;
export const BANNER_HEIGHT_EXTEND = 40;
export const BANNER_HEIGHT_HOME: number = BANNER_HEIGHT + BANNER_HEIGHT_EXTEND;

// The height the main panel overlaps the banner, unit: rem
export const MAIN_PANEL_OVERLAPS_BANNER_HEIGHT = 3.5;

// Page width: rem
export const PAGE_WIDTH = 90;

// Category constants
export const UNCATEGORIZED = "uncategorized";

// Wallpaper mode constants
export const WALLPAPER_BANNER = "banner";
export const WALLPAPER_FULLSCREEN = "fullscreen";
export const WALLPAPER_NONE = "none";
