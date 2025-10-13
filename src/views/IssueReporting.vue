<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import { useGitHub } from "@/composables/useGitHub";

const router = useRouter();
const { isLoading, error, createIssue, checkGitHubConnection } = useGitHub();

const isSubmitting = ref(false);
const submissionResult = ref(null);
const githubAvailable = ref(false);

const form = reactive({
  type: "",
  priority: "",
  title: "",
  description: "",
  steps: "",
  environment: {
    os: "",
    browser: "",
  },
  email: "",
});

const goToDashboard = () => {
  router.push("/");
};

const resetForm = () => {
  Object.assign(form, {
    type: "",
    priority: "",
    title: "",
    description: "",
    steps: "",
    environment: {
      os: "",
      browser: "",
    },
    email: "",
  });
  submissionResult.value = null;
};

const submitIssue = async () => {
  isSubmitting.value = true;
  submissionResult.value = null;

  try {
    const result = await createIssue(form);
    submissionResult.value = result;

    if (result.success) {
      resetForm();
    }
  } catch (err) {
    submissionResult.value = {
      success: false,
      error: err.message || "Απροσδιόριστο σφάλμα",
    };
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  const connectionCheck = await checkGitHubConnection();
  console.log(connectionCheck);
  
  githubAvailable.value = connectionCheck.success;
});
</script>

<template>
  <div>
    <div class="mb-6">
      <BaseButton variant="ghost" size="sm" @click="goToDashboard">
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
    </div>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Αναφορά Προβλήματος
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">
        Βοηθήστε μας να βελτιώσουμε την εφαρμογή αναφέροντας προβλήματα ή
        προτάσεις
      </p>

      <form @submit.prevent="submitIssue" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              for="issue-type"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Τύπος Αναφοράς
            </label>
            <select
              id="issue-type"
              v-model="form.type"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Επιλέξτε τύπο...</option>
              <option value="bug">🐛 Bug/Σφάλμα</option>
              <option value="feature">✨ Νέα Χαρακτηριστικό</option>
              <option value="improvement">🚀 Βελτίωση</option>
              <option value="question">❓ Ερώτηση</option>
              <option value="other">📝 Άλλο</option>
            </select>
          </div>

          <div>
            <label
              for="issue-priority"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Σοβαρότητα
            </label>
            <select
              id="issue-priority"
              v-model="form.priority"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Επιλέξτε σοβαρότητα...</option>
              <option value="low">🟢 Χαμηλή</option>
              <option value="medium">🟡 Μέτρια</option>
              <option value="high">🟠 Υψηλή</option>
              <option value="critical">🔴 Κρίσιμη</option>
            </select>
          </div>
        </div>

        <div>
          <label
            for="issue-title"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Τίτλος
          </label>
          <input
            id="issue-title"
            v-model="form.title"
            type="text"
            required
            maxlength="100"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Σύντομος τίτλος του προβλήματος..."
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ form.title.length }}/100 χαρακτήρες
          </p>
        </div>

        <div>
          <label
            for="issue-description"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Περιγραφή
          </label>
          <textarea
            id="issue-description"
            v-model="form.description"
            required
            rows="6"
            maxlength="2000"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Περιγράψτε το πρόβλημα ή την πρότασή σας με λεπτομέρεια..."
          ></textarea>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ form.description.length }}/2000 χαρακτήρες
          </p>
        </div>

        <div>
          <label
            for="issue-steps"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Βήματα Επανάληψης (για bugs)
          </label>
          <textarea
            id="issue-steps"
            v-model="form.steps"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1. Βήμα πρώτο&#10;2. Βήμα δεύτερο&#10;3. Αποτέλεσμα..."
          ></textarea>
        </div>

        <div>
          <label
            for="issue-environment"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Περιβάλλον
          </label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                for="issue-os"
                class="block text-xs text-gray-600 dark:text-gray-400 mb-1"
              >
                Λειτουργικό Σύστημα
              </label>
              <input
                id="issue-os"
                v-model="form.environment.os"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="π.χ. Windows 10, macOS 14, Ubuntu 22.04"
              />
            </div>
            <div>
              <label
                for="issue-browser"
                class="block text-xs text-gray-600 dark:text-gray-400 mb-1"
              >
                Περιηγητής
              </label>
              <input
                id="issue-browser"
                v-model="form.environment.browser"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="π.χ. Chrome 120, Firefox 119, Safari 17"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            for="issue-email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Email (προαιρετικό)
          </label>
          <input
            id="issue-email"
            v-model="form.email"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="email@example.com"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Χρησιμοποιείται μόνο για να σας ενημερώσουμε για την πρόοδο
          </p>
        </div>

        <div
          v-if="!githubAvailable"
          class="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
        >
          <div class="flex items-start gap-3">
            <svg
              class="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3
                class="text-sm font-medium text-yellow-900 dark:text-yellow-300 mb-1"
              >
                GitHub Integration Not Available
              </h3>
              <p class="text-sm text-yellow-800 dark:text-yellow-200">
                The GitHub integration is not configured. Please install
                @octokit/rest and configure your GitHub credentials.
              </p>
            </div>
          </div>
        </div>

        <div
          v-else
          class="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4"
        >
          <div class="flex items-start gap-3">
            <svg
              class="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
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
            <div>
              <h3
                class="text-sm font-medium text-blue-900 dark:text-blue-300 mb-1"
              >
                Σημείωση
              </h3>
              <p class="text-sm text-blue-800 dark:text-blue-200">
                Η αναφορά θα δημιουργηθεί στο GitHub repository της εφαρμογής.
                Θα λάβετε ενημέρωση μέσω email αν παρέχετε διεύθυνση.
              </p>
            </div>
          </div>
        </div>

        <div class="flex gap-4">
          <BaseButton
            type="button"
            variant="secondary"
            @click="resetForm"
            :disabled="isSubmitting"
          >
            Εκκαθάριση
          </BaseButton>

          <BaseButton type="submit" variant="primary" :disabled="isSubmitting">
            <template #icon-left v-if="isSubmitting">
              <svg
                class="w-4 h-4 animate-spin"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </template>
            <template #icon-left v-else>
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
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </template>
            {{ isSubmitting ? "Υποβολή..." : "Υποβολή Αναφοράς" }}
          </BaseButton>
        </div>
      </form>

      <div v-if="submissionResult" class="mt-6">
        <div
          v-if="submissionResult.success"
          class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4"
        >
          <div class="flex items-start gap-3">
            <svg
              class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
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
            <div>
              <h3
                class="text-sm font-medium text-green-900 dark:text-green-300 mb-1"
              >
                Η αναφορά υποβλήθηκε επιτυχώς!
              </h3>
              <p class="text-sm text-green-800 dark:text-green-200 mb-2">
                Μπορείτε να την δείτε στο GitHub:
                <a
                  :href="submissionResult.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="underline hover:no-underline"
                >
                  {{ submissionResult.url }}
                </a>
              </p>
            </div>
          </div>
        </div>

        <div
          v-else
          class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <div class="flex items-start gap-3">
            <svg
              class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
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
            <div>
              <h3
                class="text-sm font-medium text-red-900 dark:text-red-300 mb-1"
              >
                Σφάλμα κατά την υποβολή
              </h3>
              <p class="text-sm text-red-800 dark:text-red-200">
                {{ submissionResult.error }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
