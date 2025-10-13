import { ref } from "vue";

const isDarkMode = ref(false);
let initialized = false;

const updateDarkMode = () => {
  if (isDarkMode.value) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("darkMode", "true");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("darkMode", "false");
  }
};

const initializeDarkMode = () => {
  if (initialized) return;

  const savedMode = localStorage.getItem("darkMode");

  if (savedMode !== null) {
    isDarkMode.value = savedMode === "true";
  } else {
    isDarkMode.value = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
  }

  updateDarkMode();
  initialized = true;
};

if (typeof window !== "undefined") {
  initializeDarkMode();
}

export const useDarkMode = () => {
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    updateDarkMode();
  };

  const enableDarkMode = () => {
    isDarkMode.value = true;
    updateDarkMode();
  };

  const disableDarkMode = () => {
    isDarkMode.value = false;
    updateDarkMode();
  };

  return {
    isDarkMode,
    toggleDarkMode,
    enableDarkMode,
    disableDarkMode,
  };
};
