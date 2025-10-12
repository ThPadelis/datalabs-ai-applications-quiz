import { ref } from "vue";

export const updateAvailable = ref(false);
export const registration = ref(null);

export const useServiceWorker = () => {
  const checkForUpdates = async () => {
    if (registration.value) {
      await registration.value.update();
    }
  };

  const skipWaiting = () => {
    if (registration.value?.waiting) {
      registration.value.waiting.postMessage({ type: "SKIP_WAITING" });
    }
  };

  const updateApp = () => {
    skipWaiting();
    window.location.reload();
  };

  return {
    updateAvailable,
    registration,
    checkForUpdates,
    updateApp,
  };
};

