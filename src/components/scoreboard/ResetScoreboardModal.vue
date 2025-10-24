<script setup>
import BaseButton from "@/components/BaseButton.vue";

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  attemptsCount: {
    type: Number,
    required: true
  },
  resetting: {
    type: Boolean,
    required: true
  }
});

defineEmits(['close', 'confirm-reset']);
</script>

<template>
  <!-- Reset Confirmation Modal -->
  <div
    v-if="show"
    class="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50"
    @click.self="$emit('close')"
  >
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
      <div class="p-6">
        <div class="flex items-center gap-3 mb-4">
          <div class="flex-shrink-0">
            <svg
              class="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Επαναφορά Πίνακα Βαθμολογίας
          </h3>
        </div>
        
        <div class="mb-6">
          <p class="text-gray-600 dark:text-gray-400 mb-3">
            Είστε σίγουροι ότι θέλετε να διαγράψετε όλες τις προσπάθειές σας;
          </p>
          <div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div class="flex items-start gap-2">
              <svg
                class="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <div>
                <p class="text-sm text-red-800 dark:text-red-200 font-medium mb-1">
                  Προσοχή: Αυτή η ενέργεια δεν μπορεί να αναιρεθεί!
                </p>
                <p class="text-sm text-red-700 dark:text-red-300">
                  Θα διαγραφούν {{ attemptsCount }} προσπάθειες και όλα τα στατιστικά σας.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-3 justify-end">
          <BaseButton variant="secondary" @click="$emit('close')" :disabled="resetting">
            Ακύρωση
          </BaseButton>
          <BaseButton variant="danger" @click="$emit('confirm-reset')" :disabled="resetting">
            <template #icon-left v-if="!resetting">
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </template>
            <template #icon-left v-else>
              <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </template>
            {{ resetting ? 'Διαγραφή...' : 'Διαγραφή Όλων' }}
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
