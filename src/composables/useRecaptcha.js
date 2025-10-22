import { ref, onMounted } from "vue";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export function useRecaptcha() {
  const isLoaded = ref(false);
  const isLoading = ref(false);
  const error = ref(null);

  const loadRecaptcha = () => {
    return new Promise((resolve, reject) => {
      if (window.grecaptcha) {
        isLoaded.value = true;
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        window.grecaptcha.ready(() => {
          isLoaded.value = true;
          resolve();
        });
      };

      script.onerror = () => {
        reject(new Error("Failed to load reCAPTCHA"));
      };

      document.head.appendChild(script);
    });
  };

  const executeRecaptcha = async (action = "submit") => {
    if (!isLoaded.value) {
      throw new Error("reCAPTCHA not loaded");
    }

    try {
      isLoading.value = true;
      error.value = null;

      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
        action: action,
      });

      return token;
    } catch (err) {
      error.value = err.message;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    if (RECAPTCHA_SITE_KEY) {
      loadRecaptcha().catch((err) => {
        console.warn("reCAPTCHA failed to load:", err);
        error.value = err.message;
      });
    }
  });

  return {
    isLoaded,
    isLoading,
    error,
    loadRecaptcha,
    executeRecaptcha,
  };
}
