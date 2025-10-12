<script setup>
import { ref, computed, onMounted } from "vue";
import { useIndexedDB } from "@/composables/useIndexedDB";
import quizData from "@/assets/data/voucher_ai_quizzes.json";

const { getAllAttempts } = useIndexedDB();

const attempts = ref([]);
const loading = ref(true);
const selectedQuiz = ref("all");
const selectedDateRange = ref("all");
const minScore = ref(0);
const maxScore = ref(100);

const assessments = computed(() => {
  return [{ id: "all", title: "Όλες οι Αξιολογήσεις" }, ...quizData.assessments];
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

const getScoreColor = (percentage) => {
  if (percentage >= 80) return "text-green-600 font-semibold";
  if (percentage >= 60) return "text-yellow-600 font-semibold";
  return "text-red-600 font-semibold";
};

const exportToCSV = () => {
  const headers = [
    "Αξιολόγηση",
    "Βαθμολογία",
    "Ποσοστό (%)",
    "Ημερομηνία Ολοκλήρωσης",
  ];

  const rows = filteredAttempts.value.map((attempt) => [
    attempt.assessmentTitle,
    `${attempt.score}/${attempt.totalQuestions}`,
    attempt.percentage,
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
    "Ημερομηνία Ολοκλήρωσης",
  ];

  const rows = filteredAttempts.value.map((attempt) => [
    attempt.assessmentTitle,
    `${attempt.score}/${attempt.totalQuestions}`,
    attempt.percentage,
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

onMounted(() => {
  loadAttempts();
});
</script>

<template>
  <div class="scoreboard-container">
    <div class="mb-6 no-print">
      <h2 class="text-2xl font-bold text-gray-900 mb-2">Πίνακας Βαθμολογίας</h2>
      <p class="text-gray-600">
        Δείτε το ιστορικό των προσπαθειών σας σε όλες τις αξιολογήσεις
      </p>
    </div>

    <div v-if="statistics" class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 no-print">
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
        <p class="text-sm text-gray-600 mb-1">Συνολικές Προσπάθειες</p>
        <p class="text-2xl font-bold text-gray-900">{{ statistics.total }}</p>
      </div>
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
        <p class="text-sm text-gray-600 mb-1">Καλύτερη Βαθμολογία</p>
        <p class="text-2xl font-bold text-green-600">{{ statistics.bestScore }}%</p>
      </div>
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
        <p class="text-sm text-gray-600 mb-1">Μέση Βαθμολογία</p>
        <p class="text-2xl font-bold text-yellow-600">
          {{ statistics.avgScore }}%
        </p>
      </div>
      <div class="bg-white rounded-lg shadow p-4 border-l-4 border-red-500">
        <p class="text-sm text-gray-600 mb-1">Χειρότερη Βαθμολογία</p>
        <p class="text-2xl font-bold text-red-600">{{ statistics.worstScore }}%</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow mb-6 no-print">
      <div class="p-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Φίλτρα</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Αξιολόγηση
            </label>
            <select
              v-model="selectedQuiz"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Χρονική Περίοδος
            </label>
            <select
              v-model="selectedDateRange"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">Όλες οι Ημερομηνίες</option>
              <option value="today">Σήμερα</option>
              <option value="week">Τελευταία Εβδομάδα</option>
              <option value="month">Τελευταίος Μήνας</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Ελάχιστο Ποσοστό (%)
            </label>
            <input
              v-model.number="minScore"
              type="number"
              min="0"
              max="100"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Μέγιστο Ποσοστό (%)
            </label>
            <input
              v-model.number="maxScore"
              type="number"
              min="0"
              max="100"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div class="p-4 flex gap-2 flex-wrap">
        <button
          @click="exportToCSV"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors flex items-center gap-2"
        >
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
          Εξαγωγή CSV
        </button>

        <button
          @click="exportToExcel"
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors flex items-center gap-2"
        >
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
          Εξαγωγή Excel
        </button>

        <button
          @click="printTable"
          class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium transition-colors flex items-center gap-2"
        >
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
          Εκτύπωση
        </button>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div v-if="loading" class="p-8 text-center">
        <p class="text-gray-500">Φόρτωση δεδομένων...</p>
      </div>

      <div
        v-else-if="filteredAttempts.length === 0"
        class="p-8 text-center"
      >
        <p class="text-gray-500">Δεν βρέθηκαν προσπάθειες με τα επιλεγμένα φίλτρα.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                #
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Αξιολόγηση
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Βαθμολογία
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ποσοστό
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ημερομηνία Ολοκλήρωσης
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(attempt, index) in filteredAttempts"
              :key="attempt.id"
              class="hover:bg-gray-50"
            >
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ index + 1 }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-900">
                {{ attempt.assessmentTitle }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ attempt.score }}/{{ attempt.totalQuestions }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm"
                :class="getScoreColor(attempt.percentage)"
              >
                {{ attempt.percentage }}%
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(attempt.completedAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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

