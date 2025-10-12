import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { router } from "./router";

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").then(
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
