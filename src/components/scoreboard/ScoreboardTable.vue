<script setup>
defineProps({
  loading: {
    type: Boolean,
    required: true
  },
  filteredAttempts: {
    type: Array,
    required: true
  }
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("el-GR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatTime = (seconds) => {
  if (!seconds) return "-";
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const getScoreColor = (percentage) => {
  if (percentage >= 80) return "text-green-600 dark:text-green-400 font-semibold";
  if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400 font-semibold";
  return "text-red-600 dark:text-red-400 font-semibold";
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <div v-if="loading" class="p-8 text-center">
      <p class="text-gray-500 dark:text-gray-400">Φόρτωση δεδομένων...</p>
    </div>

    <div
      v-else-if="filteredAttempts.length === 0"
      class="p-8 text-center"
    >
      <p class="text-gray-500 dark:text-gray-400">Δεν βρέθηκαν προσπάθειες με τα επιλεγμένα φίλτρα.</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead class="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              #
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Αξιολόγηση
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Βαθμολογία
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Ποσοστό
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Χρόνος
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
            >
              Ημερομηνία Ολοκλήρωσης
            </th>
          </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          <tr
            v-for="(attempt, index) in filteredAttempts"
            :key="attempt.id"
            class="hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ index + 1 }}
            </td>
            <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">
              {{ attempt.assessmentTitle }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
              {{ attempt.score }}/{{ attempt.totalQuestions }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm"
              :class="getScoreColor(attempt.percentage)"
            >
              {{ attempt.percentage }}%
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
              {{ formatTime(attempt.timeSpent) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
              {{ formatDate(attempt.completedAt) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
