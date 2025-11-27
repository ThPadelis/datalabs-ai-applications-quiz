<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  assessment: {
    type: Object,
    required: true,
  },
  answers: {
    type: Object,
    required: true,
  },
  timeSpent: {
    type: Number,
    default: 0,
  },
});

const router = useRouter();

// Helper function to check if an answer is correct
const isAnswerCorrect = (question, userAnswer) => {
  const correctIndex = question.correctIndex;
  
  // Handle multiple correct answers (array)
  if (Array.isArray(correctIndex)) {
    if (!Array.isArray(userAnswer)) {
      return false;
    }
    // Sort both arrays for comparison
    const sortedCorrect = [...correctIndex].sort((a, b) => a - b);
    const sortedUser = [...userAnswer].sort((a, b) => a - b);
    // Check if arrays have same length and all elements match
    if (sortedCorrect.length !== sortedUser.length) {
      return false;
    }
    return sortedCorrect.every((val, idx) => val === sortedUser[idx]);
  }
  
  // Handle single correct answer (number)
  return userAnswer === correctIndex;
};

const score = computed(() => {
  let correct = 0;
  props.assessment.questions.forEach((question) => {
    if (isAnswerCorrect(question, props.answers[question.id])) {
      correct++;
    }
  });
  return correct;
});

const percentage = computed(() => {
  return Math.round((score.value / props.assessment.questions.length) * 100);
});

const scoreColor = computed(() => {
  if (percentage.value >= 80) return "text-green-600 dark:text-green-400";
  if (percentage.value >= 60) return "text-yellow-600 dark:text-yellow-400";
  return "text-red-600 dark:text-red-400";
});

const scoreBgColor = computed(() => {
  if (percentage.value >= 80) return "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800";
  if (percentage.value >= 60) return "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-800";
  return "bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800";
});

const goToDashboard = () => {
  router.push("/");
};

const isCorrect = (questionId, userAnswer) => {
  const question = props.assessment.questions.find((q) => q.id === questionId);
  if (!question) return false;
  return isAnswerCorrect(question, userAnswer);
};

const isMultipleChoice = (question) => {
  return Array.isArray(question.correctIndex);
};

const isCorrectAnswer = (question, index) => {
  if (isMultipleChoice(question)) {
    return question.correctIndex.includes(index);
  }
  return index === question.correctIndex;
};

const isUserAnswer = (questionId, index) => {
  const userAnswer = props.answers[questionId];
  if (Array.isArray(userAnswer)) {
    return userAnswer.includes(index);
  }
  return userAnswer === index;
};

const formattedTime = computed(() => {
  const minutes = Math.floor(props.timeSpent / 60);
  const seconds = props.timeSpent % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});
</script>

<template>
  <div>
    <div class="mb-6">
      <BaseButton
        variant="ghost"
        size="sm"
        @click="goToDashboard"
      >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </template>
        Επιστροφή στο Dashboard
      </BaseButton>

      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Ολοκλήρωση Αξιολόγησης
      </h2>
      <p class="text-gray-600 dark:text-gray-400">{{ assessment.title }}</p>
    </div>

    <div :class="['rounded-lg border-2 p-8 mb-8 text-center', scoreBgColor]">
      <div class="mb-4">
        <svg
          v-if="percentage >= 80"
          class="w-16 h-16 mx-auto text-green-600 dark:text-green-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else-if="percentage >= 60"
          class="w-16 h-16 mx-auto text-yellow-600 dark:text-yellow-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          class="w-16 h-16 mx-auto text-red-600 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h3 :class="['text-4xl font-bold mb-2', scoreColor]">
        {{ percentage }}%
      </h3>
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-1">
        Σωστές Απαντήσεις: {{ score }} / {{ assessment.questions.length }}
      </p>
      <p class="text-md text-gray-600 dark:text-gray-400 mb-2 flex items-center justify-center gap-2">
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
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Χρόνος: {{ formattedTime }}
      </p>
      <p v-if="percentage >= 80" class="text-green-700 dark:text-green-300 font-medium">
        Εξαιρετική Επίδοση!
      </p>
      <p v-else-if="percentage >= 60" class="text-yellow-700 dark:text-yellow-300 font-medium">
        Καλή Προσπάθεια!
      </p>
      <p v-else class="text-red-700 dark:text-red-300 font-medium">
        Χρειάζεται Βελτίωση
      </p>
    </div>

    <div class="mb-4">
      <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Αναλυτική Επισκόπηση Απαντήσεων
      </h3>
    </div>

    <div class="space-y-4">
      <div
        v-for="question in assessment.questions"
        :key="question.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
      >
        <div class="flex items-start justify-between mb-3">
          <div class="flex-1">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ερώτηση {{ question.id }}
            </span>
            <h4 class="text-base font-semibold text-gray-900 dark:text-white mt-1">
              {{ question.question }}
            </h4>
          </div>
          <span
            v-if="isCorrect(question.id, answers[question.id])"
            class="ml-4 flex-shrink-0 w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-green-600 dark:text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
          <span
            v-else
            class="ml-4 flex-shrink-0 w-8 h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
          >
            <svg
              class="w-5 h-5 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </span>
        </div>

        <div class="space-y-2 mb-4">
          <div
            v-for="(option, index) in question.options"
            :key="index"
            :class="[
              'p-3 rounded-lg text-sm',
              isCorrectAnswer(question, index) && isUserAnswer(question.id, index)
                ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-600'
                : isCorrectAnswer(question, index) && !isUserAnswer(question.id, index)
                ? 'bg-green-50 dark:bg-green-900/30 border-2 border-green-500 dark:border-green-600 border-dashed'
                : !isCorrectAnswer(question, index) && isUserAnswer(question.id, index)
                ? 'bg-red-50 dark:bg-red-900/30 border-2 border-red-500 dark:border-red-600'
                : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600',
            ]"
          >
            <div class="flex items-center justify-between">
              <span
                :class="[
                  isCorrectAnswer(question, index)
                    ? 'text-green-900 dark:text-green-300 font-medium'
                    : isUserAnswer(question.id, index)
                    ? 'text-red-900 dark:text-red-300'
                    : 'text-gray-600 dark:text-gray-300',
                ]"
              >
                {{ option }}
              </span>
              <div class="flex items-center gap-2">
                <span v-if="isCorrectAnswer(question, index)" class="text-xs font-medium text-green-700 dark:text-green-400">
                  Σωστή
                </span>
                <span
                  v-if="isUserAnswer(question.id, index)"
                  :class="[
                    'text-xs font-medium',
                    isCorrectAnswer(question, index)
                      ? 'text-green-700 dark:text-green-400'
                      : 'text-red-700 dark:text-red-400'
                  ]"
                >
                  {{ isCorrectAnswer(question, index) ? 'Επιλέξατε' : 'Η επιλογή σας' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p class="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">Επεξήγηση:</p>
          <p class="text-sm text-blue-800 dark:text-blue-200">{{ question.explanation }}</p>
        </div>
      </div>
    </div>

    <div class="mt-8 flex justify-center">
      <BaseButton
        variant="primary"
        size="lg"
        @click="goToDashboard"
      >
        Επιστροφή στο Dashboard
      </BaseButton>
    </div>
  </div>
</template>

