<script setup>
const props = defineProps({
  unansweredQuestions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close", "review"]);

const closeModal = () => {
  emit("close");
};

const reviewQuestions = () => {
  emit("review");
};
</script>

<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    @click="closeModal"
  >
    <div
      class="bg-white rounded-lg shadow-xl max-w-md w-full p-6"
      @click.stop
    >
      <div class="flex items-start mb-4">
        <div class="flex-shrink-0">
          <svg
            class="w-12 h-12 text-yellow-500"
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
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            Υπάρχουν Αναπάντητες Ερωτήσεις
          </h3>
          <p class="text-sm text-gray-600 mb-3">
            Δεν έχετε απαντήσει σε
            <strong>{{ unansweredQuestions.length }}</strong>
            {{ unansweredQuestions.length === 1 ? "ερώτηση" : "ερωτήσεις" }}.
          </p>
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p class="text-sm text-yellow-800 font-medium mb-2">
              Αναπάντητες ερωτήσεις:
            </p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="questionNum in unansweredQuestions"
                :key="questionNum"
                class="inline-flex items-center px-2 py-1 rounded bg-yellow-100 text-yellow-800 text-xs font-medium"
              >
                #{{ questionNum }}
              </span>
            </div>
          </div>
          <p class="text-sm text-gray-600">
            Θέλετε να επιστρέψετε για να απαντήσετε ή να υποβάλετε την αξιολόγηση όπως έχει;
          </p>
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button
          @click="reviewQuestions"
          class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          Επιστροφή
        </button>
        <button
          @click="closeModal"
          class="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 font-medium transition-colors"
        >
          Υποβολή Όπως Έχει
        </button>
      </div>
    </div>
  </div>
</template>

