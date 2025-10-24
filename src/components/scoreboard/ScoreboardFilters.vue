<script setup>
import BaseButton from "@/components/BaseButton.vue";

defineProps({
  assessments: {
    type: Array,
    required: true
  },
  selectedQuiz: {
    type: [String, Number],
    required: true
  },
  selectedDateRange: {
    type: String,
    required: true
  },
  minScore: {
    type: Number,
    required: true
  },
  maxScore: {
    type: Number,
    required: true
  },
  attemptsCount: {
    type: Number,
    required: true
  }
});

defineEmits([
  'update:selectedQuiz',
  'update:selectedDateRange', 
  'update:minScore',
  'update:maxScore',
  'export-csv',
  'export-excel',
  'print-table',
  'reset-scoreboard'
]);
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow mb-6 no-print">
    <div class="p-4 border-b border-gray-200 dark:border-gray-700">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Φίλτρα</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Αξιολόγηση
          </label>
          <select
            :value="selectedQuiz"
            @input="$emit('update:selectedQuiz', $event.target.value)"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option
              v-for="assessment in assessments"
              :key="assessment.id"
              :value="assessment.id"
            >
              {{ assessment.title }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Χρονική Περίοδος
          </label>
          <select
            :value="selectedDateRange"
            @input="$emit('update:selectedDateRange', $event.target.value)"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">Όλες οι Ημερομηνίες</option>
            <option value="today">Σήμερα</option>
            <option value="week">Τελευταία Εβδομάδα</option>
            <option value="month">Τελευταίος Μήνας</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Ελάχιστο Ποσοστό (%)
          </label>
          <input
            :value="minScore"
            @input="$emit('update:minScore', parseInt($event.target.value))"
            type="number"
            min="0"
            max="100"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Μέγιστο Ποσοστό (%)
          </label>
          <input
            :value="maxScore"
            @input="$emit('update:maxScore', parseInt($event.target.value))"
            type="number"
            min="0"
            max="100"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>

    <div class="p-4 flex gap-2 flex-wrap">
      <BaseButton variant="success" @click="$emit('export-csv')">
        <template #icon-left>
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </template>
        Εξαγωγή CSV
      </BaseButton>

      <BaseButton variant="primary" @click="$emit('export-excel')">
        <template #icon-left>
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </template>
        Εξαγωγή Excel
      </BaseButton>

      <BaseButton variant="secondary" @click="$emit('print-table')">
        <template #icon-left>
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
        </template>
        Εκτύπωση
      </BaseButton>

      <BaseButton variant="danger" @click="$emit('reset-scoreboard')" :disabled="attemptsCount === 0">
        <template #icon-left>
          <svg
            class="w-5 h-5"
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
        Επαναφορά Πίνακα
      </BaseButton>
    </div>
  </div>
</template>
