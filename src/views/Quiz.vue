<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import QuestionCard from "@/components/QuestionCard.vue";
import QuizResults from "@/components/QuizResults.vue";
import UnansweredQuestionsModal from "@/components/UnansweredQuestionsModal.vue";
import LeaveQuizModal from "@/components/LeaveQuizModal.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useIndexedDB } from "@/composables/useIndexedDB";
import quizData from "@/assets/data/voucher_ai_quizzes.json";

const route = useRoute();
const router = useRouter();
const quizId = parseInt(route.params.id);
const { saveAttempt } = useIndexedDB();

const startTime = ref(Date.now());
const elapsedSeconds = ref(0);
let timerInterval = null;
const showLeaveModal = ref(false);

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const originalAssessment = quizData.assessments.find((a) => a.id === quizId) || null;
const assessment = ref(
  originalAssessment
    ? {
        ...originalAssessment,
        questions: shuffleArray(originalAssessment.questions),
      }
    : null
);

const currentQuestionIndex = ref(0);
const answers = ref({});
const isCompleted = ref(false);
const showUnansweredModal = ref(false);

const currentQuestion = computed(() => {
  return assessment.value?.questions[currentQuestionIndex.value];
});

const isFirstQuestion = computed(() => currentQuestionIndex.value === 0);
const isLastQuestion = computed(
  () => currentQuestionIndex.value === assessment.value?.questions.length - 1
);

const progress = computed(() => {
  const total = assessment.value?.questions.length || 1;
  return ((currentQuestionIndex.value + 1) / total) * 100;
});

const unansweredQuestions = computed(() => {
  if (!assessment.value) return [];
  return assessment.value.questions
    .filter((q) => answers.value[q.id] === undefined)
    .map((q) => q.id);
});

const formattedTime = computed(() => {
  const minutes = Math.floor(elapsedSeconds.value / 60);
  const seconds = elapsedSeconds.value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
});

const selectAnswer = (answerIndex) => {
  answers.value[currentQuestion.value.id] = answerIndex;
  
  setTimeout(() => {
    nextQuestion();
  }, 300);
};

const nextQuestion = () => {
  if (isLastQuestion.value) {
    currentQuestionIndex.value = 0;
  } else {
    currentQuestionIndex.value++;
  }
};

const previousQuestion = () => {
  if (isFirstQuestion.value) {
    currentQuestionIndex.value = assessment.value.questions.length - 1;
  } else {
    currentQuestionIndex.value--;
  }
};

const attemptFinishQuiz = () => {
  if (unansweredQuestions.value.length > 0) {
    showUnansweredModal.value = true;
  } else {
    finishQuiz();
  }
};

const finishQuiz = async () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  let correctAnswers = 0;
  assessment.value.questions.forEach((question) => {
    if (answers.value[question.id] === question.correctIndex) {
      correctAnswers++;
    }
  });

  const totalQuestions = assessment.value.questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  try {
    await saveAttempt({
      assessmentId: assessment.value.id,
      assessmentTitle: assessment.value.title,
      score: correctAnswers,
      totalQuestions: totalQuestions,
      percentage: percentage,
      timeSpent: elapsedSeconds.value,
    });
  } catch (error) {
    console.error("Failed to save attempt:", error);
  }

  isCompleted.value = true;
  showUnansweredModal.value = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const closeModal = () => {
  showUnansweredModal.value = false;
  finishQuiz();
};

const reviewQuestions = () => {
  showUnansweredModal.value = false;
  if (unansweredQuestions.value.length > 0) {
    const firstUnanswered = assessment.value.questions.findIndex(
      (q) => answers.value[q.id] === undefined
    );
    if (firstUnanswered !== -1) {
      currentQuestionIndex.value = firstUnanswered;
    }
  }
};

const attemptGoBack = () => {
  showLeaveModal.value = true;
};

const confirmLeave = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
  showLeaveModal.value = false;
  router.push("/");
};

const closeLeaveModal = () => {
  showLeaveModal.value = false;
};

onMounted(() => {
  startTime.value = Date.now();
  timerInterval = setInterval(() => {
    elapsedSeconds.value = Math.floor((Date.now() - startTime.value) / 1000);
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) {
    clearInterval(timerInterval);
  }
});
</script>

<template>
  <div v-if="assessment">
    <QuizResults
      v-if="isCompleted"
      :assessment="assessment"
      :answers="answers"
      :time-spent="elapsedSeconds"
    />

    <div v-else>
      <div class="mb-6">
        <BaseButton
          variant="ghost"
          size="sm"
          @click="attemptGoBack"
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
          Επιστροφή
        </BaseButton>

        <div class="mb-4">
          <h2 class="text-2xl font-bold text-gray-900">
            {{ assessment.title }}
          </h2>
          <p class="text-gray-600 text-sm mt-1">{{ assessment.description }}</p>
        </div>

      <div class="mb-2">
        <div
          class="flex justify-between items-center text-sm text-gray-600 mb-2"
        >
          <span>
            Πρόοδος: {{ currentQuestionIndex + 1 }} /
            {{ assessment.questions.length }}
          </span>
          <div class="flex items-center gap-4">
            <span class="flex items-center gap-1">
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {{ formattedTime }}
            </span>
            <span>{{ Math.round(progress) }}%</span>
          </div>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-blue-600 h-2 rounded-full transition-all duration-300"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>
      </div>

    <QuestionCard
      v-if="currentQuestion"
      :key="currentQuestionIndex"
      :question="currentQuestion"
      :question-number="currentQuestionIndex + 1"
      :selected-answer="answers[currentQuestion.id]"
      @select-answer="selectAnswer"
    />

      <div class="flex flex-wrap gap-4 mt-6">
        <BaseButton
          variant="secondary"
          class="flex-1 min-w-[120px]"
          @click="previousQuestion"
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
          Προηγούμενη
        </BaseButton>

        <BaseButton
          variant="success"
          class="flex-1 min-w-[200px]"
          @click="attemptFinishQuiz"
        >
          Ολοκλήρωση Αξιολόγησης
        </BaseButton>

        <BaseButton
          variant="primary"
          class="flex-1 min-w-[120px]"
          @click="nextQuestion"
        >
          Επόμενη
          <template #icon-right>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </template>
        </BaseButton>
      </div>
    </div>

    <UnansweredQuestionsModal
      v-if="showUnansweredModal"
      :unanswered-questions="unansweredQuestions"
      @close="closeModal"
      @review="reviewQuestions"
    />

    <LeaveQuizModal
      v-if="showLeaveModal"
      @close="closeLeaveModal"
      @confirm="confirmLeave"
    />
  </div>

  <div v-else class="text-center py-12">
    <p class="text-gray-500">Η αξιολόγηση δεν βρέθηκε.</p>
    <BaseButton variant="primary" class="mt-4" @click="confirmLeave">
      Επιστροφή στο Dashboard
    </BaseButton>
  </div>
</template>

