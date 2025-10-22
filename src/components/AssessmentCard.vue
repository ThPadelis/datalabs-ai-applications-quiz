<script setup>
import { useRouter } from "vue-router";
import useDateFormat from "../composables/useDateFormat";

const props = defineProps({
  assessment: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const { formatDate } = useDateFormat();

const difficultyColors = {
  easy: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300",
  medium: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300",
  hard: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300",
  mixed: "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300",
};

const difficultyLabels = {
  easy: "Εύκολο",
  medium: "Μέτριο",
  hard: "Δύσκολο",
  mixed: "Μικτό",
};

const goToQuiz = () => {
  router.push(`/quiz/${props.assessment.id}`);
};
</script>

<template>
  <div
    @click="goToQuiz"
    class="flex flex-col justify-between bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-6 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600"
  >
    <div class="flex items-start justify-between mb-3">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex-1">
        {{ assessment.title }}
      </h3>
      <span
        :class="[
          'px-3 py-1 rounded-full text-xs font-medium ml-2',
          difficultyColors[assessment.difficulty],
        ]"
      >
        {{ difficultyLabels[assessment.difficulty] }}
      </span>
    </div>

    <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">
      {{ assessment.description }}
    </p>

    <div class="flex flex-col items-start justify-between text-sm gap-1">
      <div class="flex items-center text-gray-500 dark:text-gray-400">
        <svg
          class="w-5 h-5 mr-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{{ assessment.questions.length }} ερωτήσεις</span>
      </div>

      <div class="text-gray-500 dark:text-gray-400">
        <span class="mr-2">Δημιουργήθηκε:</span>
        <span class="font-medium">{{ formatDate(assessment.createdAt, 'dd-MM-yyyy') }}</span>
      </div>

      <div class="flex items-center text-blue-600 dark:text-blue-400 font-medium">
        <span class="mr-1">Έναρξη</span>
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

