<script setup>
import { ref, computed } from "vue";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  selectedAnswer: {
    type: [Number, Array],
    default: null,
  },
  questionNumber: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["select-answer"]);

const showExplanation = ref(false);

// Check if question has multiple correct answers
const hasMultipleAnswers = computed(() => {
  return Array.isArray(props.question.correctIndex);
});

// Convert selectedAnswer to array format for easier handling
const selectedAnswersArray = computed(() => {
  if (props.selectedAnswer === null || props.selectedAnswer === undefined) {
    return [];
  }
  if (Array.isArray(props.selectedAnswer)) {
    return props.selectedAnswer;
  }
  return [props.selectedAnswer];
});

const isOptionSelected = (index) => {
  return selectedAnswersArray.value.includes(index);
};

const selectOption = (index) => {
  if (hasMultipleAnswers.value) {
    // For multiple choice: toggle selection
    const current = selectedAnswersArray.value;
    const newSelection = current.includes(index)
      ? current.filter(i => i !== index)
      : [...current, index].sort((a, b) => a - b);
    emit("select-answer", newSelection);
  } else {
    // For single choice: replace selection
    emit("select-answer", index);
  }
};

const toggleExplanation = () => {
  showExplanation.value = !showExplanation.value;
};

const getCorrectAnswersText = () => {
  if (hasMultipleAnswers.value) {
    const correctIndices = props.question.correctIndex;
    return correctIndices.map(idx => props.question.options[idx]).join(", ");
  } else {
    return props.question.options[props.question.correctIndex];
  }
};
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div class="mb-6">
      <div class="flex items-start justify-between mb-4">
        <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
          Ερώτηση {{ questionNumber }}
        </span>
        <BaseButton
          variant="ghost"
          size="sm"
          @click="toggleExplanation"
        >
          <template #icon-left>
            <svg
              class="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
          </template>
          {{ showExplanation ? "Απόκρυψη" : "Εμφάνιση" }} Επεξήγησης
        </BaseButton>
      </div>

      <h3 class="text-lg font-semibold text-gray-900 dark:text-white leading-relaxed">
        {{ question.question }}
      </h3>
    </div>

    <div class="space-y-3 mb-6">
      <div
        v-if="hasMultipleAnswers"
        class="mb-3 text-sm text-gray-600 dark:text-gray-400 italic"
      >
        Μπορείτε να επιλέξετε πολλαπλές απαντήσεις
      </div>
      <div
        v-for="(option, index) in question.options"
        :key="index"
        @click="selectOption(index)"
        :class="[
          'p-4 rounded-lg border-2 transition-all cursor-pointer',
          isOptionSelected(index)
            ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30'
            : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:bg-gray-50 dark:hover:bg-gray-700',
        ]"
      >
        <div class="flex items-center">
          <div
            :class="[
              hasMultipleAnswers
                ? 'w-5 h-5 rounded border-2 flex items-center justify-center mr-3'
                : 'w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3',
              isOptionSelected(index)
                ? 'border-blue-500 dark:border-blue-400 bg-blue-500 dark:bg-blue-400'
                : 'border-gray-300 dark:border-gray-600',
            ]"
          >
            <div
              v-if="isOptionSelected(index)"
              :class="[
                hasMultipleAnswers
                  ? 'w-3 h-3 bg-white rounded'
                  : 'w-2 h-2 bg-white rounded-full'
              ]"
            ></div>
            <svg
              v-if="hasMultipleAnswers && isOptionSelected(index)"
              class="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span
            :class="[
              'text-sm',
              isOptionSelected(index)
                ? 'text-gray-900 dark:text-white font-medium'
                : 'text-gray-700 dark:text-gray-300',
            ]"
          >
            {{ option }}
          </span>
        </div>
      </div>
    </div>

    <transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 transform -translate-y-2"
      enter-to-class="opacity-100 transform translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 transform translate-y-0"
      leave-to-class="opacity-0 transform -translate-y-2"
    >
      <div
        v-if="showExplanation"
        class="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg"
      >
        <div class="flex items-start">
          <svg
            class="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <div>
            <p class="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1">Επεξήγηση:</p>
            <p class="text-sm text-blue-800 dark:text-blue-200">{{ question.explanation }}</p>
            <p class="text-sm text-blue-900 dark:text-blue-300 font-medium mt-2">
              {{ hasMultipleAnswers ? 'Σωστές Απαντήσεις' : 'Σωστή Απάντηση' }}: {{ getCorrectAnswersText() }}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

