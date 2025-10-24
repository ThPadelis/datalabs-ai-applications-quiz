<script setup>
import { ref, computed, onMounted } from "vue";
import { useIndexedDB } from "@/composables/useIndexedDB";
import { assessments as allAssessments } from "@/data";
import { 
  ScoreboardStats, 
  ScoreboardFilters, 
  ScoreboardTable, 
  ResetScoreboardModal 
} from "@/components/scoreboard";

const { getAllAttempts, clearAllAttempts } = useIndexedDB();

const attempts = ref([]);
const loading = ref(true);
const selectedQuiz = ref("all");
const selectedDateRange = ref("all");
const minScore = ref(0);
const maxScore = ref(100);
const showResetModal = ref(false);
const resetting = ref(false);

const assessments = computed(() => {
  return [{ id: "all", title: "Όλες οι Αξιολογήσεις" }, ...allAssessments];
});

const filteredAttempts = computed(() => {
  let filtered = [...attempts.value];

  if (selectedQuiz.value !== "all") {
    filtered = filtered.filter(
      (attempt) => attempt.assessmentId === parseInt(selectedQuiz.value)
    );
  }

  filtered = filtered.filter(
    (attempt) =>
      attempt.percentage >= minScore.value &&
      attempt.percentage <= maxScore.value
  );

  if (selectedDateRange.value !== "all") {
    const now = new Date();
    const filterDate = new Date();

    switch (selectedDateRange.value) {
      case "today":
        filterDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        filterDate.setDate(now.getDate() - 7);
        break;
      case "month":
        filterDate.setMonth(now.getMonth() - 1);
        break;
    }

    filtered = filtered.filter(
      (attempt) => new Date(attempt.completedAt) >= filterDate
    );
  }

  return filtered.sort(
    (a, b) => new Date(b.completedAt) - new Date(a.completedAt)
  );
});

const statistics = computed(() => {
  if (filteredAttempts.value.length === 0) return null;

  const total = filteredAttempts.value.length;
  const avgScore =
    filteredAttempts.value.reduce((sum, attempt) => sum + attempt.percentage, 0) /
    total;
  const bestScore = Math.max(
    ...filteredAttempts.value.map((a) => a.percentage)
  );
  const worstScore = Math.min(
    ...filteredAttempts.value.map((a) => a.percentage)
  );

  return {
    total,
    avgScore: avgScore.toFixed(1),
    bestScore,
    worstScore,
  };
});

const loadAttempts = async () => {
  loading.value = true;
  try {
    attempts.value = await getAllAttempts();
  } catch (error) {
    console.error("Failed to load attempts:", error);
  } finally {
    loading.value = false;
  }
};

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

const exportToCSV = () => {
  const headers = [
    "Αξιολόγηση",
    "Βαθμολογία",
    "Ποσοστό (%)",
    "Χρόνος",
    "Ημερομηνία Ολοκλήρωσης",
  ];

  const rows = filteredAttempts.value.map((attempt) => [
    attempt.assessmentTitle,
    `${attempt.score}/${attempt.totalQuestions}`,
    attempt.percentage,
    formatTime(attempt.timeSpent),
    formatDate(attempt.completedAt),
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");

  const blob = new Blob(["\ufeff" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `scoreboard_${Date.now()}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const exportToExcel = () => {
  const headers = [
    "Αξιολόγηση",
    "Βαθμολογία",
    "Ποσοστό (%)",
    "Χρόνος",
    "Ημερομηνία Ολοκλήρωσης",
  ];

  const rows = filteredAttempts.value.map((attempt) => [
    attempt.assessmentTitle,
    `${attempt.score}/${attempt.totalQuestions}`,
    attempt.percentage,
    formatTime(attempt.timeSpent),
    formatDate(attempt.completedAt),
  ]);

  let tableHTML = '<table border="1"><thead><tr>';
  headers.forEach((header) => {
    tableHTML += `<th>${header}</th>`;
  });
  tableHTML += "</tr></thead><tbody>";

  rows.forEach((row) => {
    tableHTML += "<tr>";
    row.forEach((cell) => {
      tableHTML += `<td>${cell}</td>`;
    });
    tableHTML += "</tr>";
  });
  tableHTML += "</tbody></table>";

  const blob = new Blob([tableHTML], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `scoreboard_${Date.now()}.xls`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const printTable = () => {
  window.print();
};

const openResetModal = () => {
  showResetModal.value = true;
};

const closeResetModal = () => {
  showResetModal.value = false;
};

const resetScoreboard = async () => {
  resetting.value = true;
  try {
    await clearAllAttempts();
    await loadAttempts();
    closeResetModal();
  } catch (error) {
    console.error("Failed to reset scoreboard:", error);
    alert("Σφάλμα κατά την επαναφορά του πίνακα βαθμολογίας");
  } finally {
    resetting.value = false;
  }
};

onMounted(() => {
  loadAttempts();
});
</script>

<template>
  <div class="scoreboard-container">
    <div class="mb-6 no-print">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Πίνακας Βαθμολογίας</h2>
      <p class="text-gray-600 dark:text-gray-400">
        Δείτε το ιστορικό των προσπαθειών σας σε όλες τις αξιολογήσεις
      </p>
    </div>

    <ScoreboardStats :statistics="statistics" />

    <ScoreboardFilters
      :assessments="assessments"
      v-model:selected-quiz="selectedQuiz"
      v-model:selected-date-range="selectedDateRange"
      v-model:min-score="minScore"
      v-model:max-score="maxScore"
      :attempts-count="attempts.length"
      @export-csv="exportToCSV"
      @export-excel="exportToExcel"
      @print-table="printTable"
      @reset-scoreboard="openResetModal"
    />

    <ScoreboardTable
      :loading="loading"
      :filtered-attempts="filteredAttempts"
    />

    <ResetScoreboardModal
      :show="showResetModal"
      :attempts-count="attempts.length"
      :resetting="resetting"
      @close="closeResetModal"
      @confirm-reset="resetScoreboard"
    />
  </div>
</template>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }

  .scoreboard-container {
    width: 100%;
    max-width: none;
  }

  table {
    page-break-inside: auto;
  }

  tr {
    page-break-inside: avoid;
    page-break-after: auto;
  }

  thead {
    display: table-header-group;
  }
}
</style>

