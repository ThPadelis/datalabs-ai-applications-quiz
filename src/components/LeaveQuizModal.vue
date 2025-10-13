<script setup>
import BaseButton from "@/components/BaseButton.vue";

const emit = defineEmits(["close", "confirm"]);

const closeModal = () => {
  emit("close");
};

const confirmLeave = () => {
  emit("confirm");
};
</script>

<template>
  <div
    class="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 z-50 flex items-center justify-center p-4"
    @click="closeModal"
  >
    <div
      class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
      @click.stop
    >
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0">
          <svg
            class="w-12 h-12 text-red-500 dark:text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <div class="ml-4 flex-1">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Εγκατάλειψη Αξιολόγησης;
          </h3>
          <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Είστε σίγουροι ότι θέλετε να εγκαταλείψετε την αξιολόγηση;
          </p>
          <div class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3 mb-4">
            <p class="text-sm text-yellow-800 dark:text-yellow-300">
              <strong>Προσοχή:</strong> Η πρόοδός σας δεν θα αποθηκευτεί και θα
              χάσετε όλες τις απαντήσεις σας.
            </p>
          </div>
          <p class="text-sm text-gray-600 dark:text-gray-300">
            Θέλετε να συνεχίσετε την αξιολόγηση ή να επιστρέψετε στο Dashboard;
          </p>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <BaseButton
          variant="primary"
          class="flex-1"
          @click="closeModal"
        >
          Συνέχεια Αξιολόγησης
        </BaseButton>
        <BaseButton
          variant="danger"
          class="flex-1"
          @click="confirmLeave"
        >
          Εγκατάλειψη
        </BaseButton>
      </div>
    </div>
  </div>
</template>

