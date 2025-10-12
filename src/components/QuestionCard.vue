<script setup>
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  question: {
    type: Object,
    required: true,
  },
  selectedAnswer: {
    type: Number,
    default: null,
  },
  questionNumber: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["select-answer"]);

const showExplanation = ref(false);

const selectOption = (index) => {
  emit("select-answer", index);
};

const toggleExplanation = () => {
  showExplanation.value = !showExplanation.value;
};
</script>

<template>
  <div class="bg-white rounded-lg shadow-lg p-6">
    <div class="mb-6">
      <div class="flex items-start justify-between mb-4">
        <span class="text-sm font-medium text-gray-500">
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
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </template>
          {{ showExplanation ? "Απόκρυψη" : "Εμφάνιση" }} Επεξήγησης
        </BaseButton>
      </div>

      <h3 class="text-lg font-semibold text-gray-900 leading-relaxed">
        {{ question.question }}
      </h3>
    </div>

    <div class="space-y-3 mb-6">
      <div
        v-for="(option, index) in question.options"
        :key="index"
        @click="selectOption(index)"
        :class="[
          'p-4 rounded-lg border-2 transition-all cursor-pointer',
          selectedAnswer === index
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50',
        ]"
      >
        <div class="flex items-center">
          <div
            :class="[
              'w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3',
              selectedAnswer === index
                ? 'border-blue-500 bg-blue-500'
                : 'border-gray-300',
            ]"
          >
            <div
              v-if="selectedAnswer === index"
              class="w-2 h-2 bg-white rounded-full"
            ></div>
          </div>
          <span
            :class="[
              'text-sm',
              selectedAnswer === index
                ? 'text-gray-900 font-medium'
                : 'text-gray-700',
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
        class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
      >
        <div class="flex items-start">
          <svg
            class="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0"
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
            <p class="text-sm font-medium text-blue-900 mb-1">Επεξήγηση:</p>
            <p class="text-sm text-blue-800">{{ question.explanation }}</p>
            <p class="text-sm text-blue-900 font-medium mt-2">
              Σωστή Απάντηση: {{ question.options[question.correctIndex] }}
            </p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

