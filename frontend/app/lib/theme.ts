export type ThemePreference = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'promptshield_theme';
const THEME_CHANGE_EVENT = 'promptshield-theme-change';

function isThemePreference(value: string | null): value is ThemePreference {
    return value === 'light' || value === 'dark' || value === 'system';
}

export function getThemePreference(): ThemePreference {
    if (typeof window === 'undefined') return 'system';

    const storedPreference = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isThemePreference(storedPreference) ? storedPreference : 'system';
}

export function getServerThemePreference(): ThemePreference {
    return 'system';
}

export function subscribeToThemeChanges(onChange: () => void) {
    window.addEventListener(THEME_CHANGE_EVENT, onChange);
    window.addEventListener('storage', onChange);

    return () => {
        window.removeEventListener(THEME_CHANGE_EVENT, onChange);
        window.removeEventListener('storage', onChange);
    };
}

export function setThemePreference(preference: ThemePreference) {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);

    const isDark =
        preference === 'dark' ||
        (preference === 'system' &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}
