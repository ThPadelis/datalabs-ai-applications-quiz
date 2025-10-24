<script setup>
defineProps({
  statistics: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div v-if="statistics" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 no-print">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-blue-500">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Συνολικές Προσπάθειες</p>
      <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ statistics.total }}</p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-green-500">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Καλύτερη Βαθμολογία</p>
      <p class="text-2xl font-bold text-green-600 dark:text-green-400">{{ statistics.bestScore }}%</p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-yellow-500">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Μέση Βαθμολογία</p>
      <p class="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
        {{ statistics.avgScore }}%
      </p>
    </div>
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-red-500">
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-1">Χειρότερη Βαθμολογία</p>
      <p class="text-2xl font-bold text-red-600 dark:text-red-400">{{ statistics.worstScore }}%</p>
    </div>
  </div>
</template>
