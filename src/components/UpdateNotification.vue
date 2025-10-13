<script setup>
import { useServiceWorker } from "@/composables/useServiceWorker";
import BaseButton from "@/components/BaseButton.vue";

const { updateAvailable, updateApp } = useServiceWorker();

const dismissUpdate = () => {
  updateAvailable.value = false;
};
</script>

<template>
  <transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="opacity-0 transform translate-y-2"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform translate-y-2"
  >
    <div
      v-if="updateAvailable"
      class="fixed bottom-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border-2 border-blue-500 dark:border-blue-600 p-4 max-w-sm z-50"
    >
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <svg
            class="w-8 h-8 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        <div class="flex-1">
          <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            Νέα Έκδοση Διαθέσιμη!
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Υπάρχει μια νέα έκδοση της εφαρμογής. Ενημερώστε για να λάβετε τις
            τελευταίες βελτιώσεις.
          </p>
          <div class="flex gap-2">
            <BaseButton variant="primary" size="sm" @click="updateApp">
              Ενημέρωση
            </BaseButton>
            <BaseButton variant="ghost" size="sm" @click="dismissUpdate">
              Αργότερα
            </BaseButton>
          </div>
        </div>
        <button
          @click="dismissUpdate"
          class="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </transition>
</template>

