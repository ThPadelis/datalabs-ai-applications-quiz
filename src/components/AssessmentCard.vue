<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  assessment: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const difficultyColors = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  hard: "bg-red-100 text-red-800",
};

const difficultyLabels = {
  easy: "Εύκολο",
  medium: "Μέτριο",
  hard: "Δύσκολο",
};

const goToQuiz = () => {
  router.push(`/quiz/${props.assessment.id}`);
};
</script>

<template>
  <div
    @click="goToQuiz"
    class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-6 border border-gray-200 hover:border-blue-300"
  >
    <div class="flex items-start justify-between mb-3">
      <h3 class="text-lg font-semibold text-gray-900 flex-1">
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

    <p class="text-gray-600 text-sm mb-4">
      {{ assessment.description }}
    </p>

    <div class="flex items-center justify-between text-sm">
      <div class="flex items-center text-gray-500">
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

      <div class="flex items-center text-blue-600 font-medium">
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

