import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";
import { updateAvailable, registration } from "@/composables/useServiceWorker";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swPath = import.meta.env.BASE_URL + "sw.js";
    navigator.serviceWorker
      .register(swPath, { scope: import.meta.env.BASE_URL })
      .then((reg) => {
        registration.value = reg;

        reg.addEventListener("updatefound", () => {
          const newWorker = reg.installing;

          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              updateAvailable.value = true;
            }
          });
        });

        let refreshing = false;
        navigator.serviceWorker.addEventListener("controllerchange", () => {
          if (!refreshing) {
            refreshing = true;
            window.location.reload();
          }
        });
      })
      .catch((error) => {
        console.log("SW registration failed: ", error);
      });
  });
}

createApp(App).use(router).mount("#app");
