import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swPath = import.meta.env.BASE_URL + "sw.js";
    navigator.serviceWorker.register(swPath, { scope: import.meta.env.BASE_URL }).then(
      (registration) => {
        console.log("SW registered: ", registration);
      },
      (error) => {
        console.log("SW registration failed: ", error);
      }
    );
  });
}

createApp(App).use(router).mount("#app");
