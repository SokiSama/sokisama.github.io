import {
	DARK_MODE,
	DEFAULT_THEME,
	LIGHT_MODE,
	SYSTEM_MODE,
} from "@constants/constants";
import { expressiveCodeConfig } from "@/config";
import type { LIGHT_DARK_MODE } from "@/types/config";

let systemMql: MediaQueryList | null = null;
let systemMqlHandler: ((e: MediaQueryListEvent) => void) | null = null;

function ensureSystemThemeListener() {
	if (typeof window === "undefined") return;
	if (!systemMql) {
		systemMql = window.matchMedia("(prefers-color-scheme: dark)");
	}
	if (!systemMqlHandler) {
		systemMqlHandler = () => {
			// Only react when current mode is system
			const current = getStoredTheme();
			if (current === SYSTEM_MODE) {
				applyThemeToDocument(SYSTEM_MODE);
			}
		};
		try {
			// Modern browsers
			systemMql.addEventListener("change", systemMqlHandler);
		} catch (err) {
			// Safari < 14
			// @ts-ignore
			systemMql.addListener(systemMqlHandler);
		}
	}
}

function removeSystemThemeListener() {
	if (!systemMql || !systemMqlHandler) return;
	try {
		systemMql.removeEventListener("change", systemMqlHandler);
	} catch (err) {
		// Safari < 14
		// @ts-ignore
		systemMql.removeListener(systemMqlHandler);
	}
	systemMqlHandler = null;
}

export function getDefaultHue(): number {
	const fallback = "250";
	const configCarrier = document.getElementById("config-carrier");
	return Number.parseInt(configCarrier?.dataset.hue || fallback);
}

export function getHue(): number {
	const stored = localStorage.getItem("hue");
	return stored ? Number.parseInt(stored) : getDefaultHue();
}

export function setHue(hue: number): void {
	localStorage.setItem("hue", String(hue));
	const r = document.querySelector(":root") as HTMLElement;
	if (!r) {
		return;
	}
	r.style.setProperty("--hue", String(hue));
}

export function applyThemeToDocument(theme: LIGHT_DARK_MODE) {
	// 获取当前主题状态的完整信息
	const currentIsDark = document.documentElement.classList.contains("dark");
	const currentTheme = document.documentElement.getAttribute("data-theme");

	// 计算目标主题状态
	let targetIsDark = currentIsDark; // 默认保持当前，避免闪烁
	if (theme === LIGHT_MODE) {
		targetIsDark = false;
	} else if (theme === DARK_MODE) {
		targetIsDark = true;
	} else if (theme === SYSTEM_MODE) {
		const prefersDark = typeof window !== "undefined"
			? window.matchMedia("(prefers-color-scheme: dark)").matches
			: false;
		targetIsDark = prefersDark;
	}

	// 检测是否真的需要主题切换
	const needsThemeChange = currentIsDark !== targetIsDark;
	const expectedTheme = targetIsDark ? "github-dark" : "github-light";
	const needsCodeThemeUpdate = currentTheme !== expectedTheme;

	if (!needsThemeChange && !needsCodeThemeUpdate) {
		return;
	}

	if (needsThemeChange) {
		document.documentElement.classList.add("is-theme-transitioning");
	}

	requestAnimationFrame(() => {
		// 应用主题变化
		if (needsThemeChange) {
			if (targetIsDark) {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}
		}

		// Set the theme for Expressive Code based on current mode
		const expressiveTheme = targetIsDark ? "github-dark" : "github-light";
		document.documentElement.setAttribute("data-theme", expressiveTheme);

		// 强制重新渲染代码块 - 解决从首页进入文章页面时的渲染问题
		if (needsCodeThemeUpdate) {
			setTimeout(() => {
				window.dispatchEvent(new CustomEvent("theme-change"));
			}, 0);
		}

		if (needsThemeChange) {
			requestAnimationFrame(() => {
				document.documentElement.classList.remove("is-theme-transitioning");
			});
		}
	});
}

export function setTheme(theme: LIGHT_DARK_MODE): void {
	localStorage.setItem("theme", theme);
	applyThemeToDocument(theme);
	if (theme === SYSTEM_MODE) {
		ensureSystemThemeListener();
	} else {
		removeSystemThemeListener();
	}
}

export function getStoredTheme(): LIGHT_DARK_MODE {
	return (localStorage.getItem("theme") as LIGHT_DARK_MODE) || DEFAULT_THEME;
}