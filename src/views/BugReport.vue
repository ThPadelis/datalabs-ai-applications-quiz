<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/BaseButton.vue";
import { useGoogleSheets } from "@/composables/useGoogleSheets";
import { useRecaptcha } from "@/composables/useRecaptcha";

const router = useRouter();
const { isLoading, error, submitBugReport: submitToSheets, testConnection } = useGoogleSheets();
const { isLoaded: recaptchaLoaded, executeRecaptcha, error: recaptchaError } = useRecaptcha();

const isSubmitting = ref(false);
const submissionResult = ref(null);
const sheetsAvailable = ref(false);

const form = reactive({
  type: "",
  priority: "",
  title: "",
  description: "",
  steps: "",
  expectedBehavior: "",
  actualBehavior: "",
  contactEmail: "",
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
    expectedBehavior: "",
    actualBehavior: "",
    contactEmail: "",
  });
  submissionResult.value = null;
};

const submitBugReport = async () => {
  isSubmitting.value = true;
  submissionResult.value = null;

  try {
    // Execute reCAPTCHA if available
    let recaptchaToken = null;
    if (recaptchaLoaded.value) {
      try {
        recaptchaToken = await executeRecaptcha("bug_report");
      } catch (err) {
        console.warn("reCAPTCHA failed:", err);
        // Continue without reCAPTCHA if it fails
      }
    }

    const result = await submitToSheets(form);
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
  const connectionCheck = await testConnection();
  sheetsAvailable.value = connectionCheck.success;
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

      <!-- Connection Status -->
      <div v-if="!sheetsAvailable" class="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span class="text-sm text-gray-700 dark:text-gray-300">
            ⚠️ Google Sheets connection not available. Form will not submit.
          </span>
        </div>
      </div>

      <!-- reCAPTCHA Status -->
      <div v-if="recaptchaLoaded || recaptchaError" class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg">
        <div class="flex items-center gap-2">
          <svg v-if="recaptchaLoaded" class="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="recaptchaError" class="w-5 h-5 text-yellow-600 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span class="text-sm text-gray-700 dark:text-gray-300">
            <span v-if="recaptchaLoaded">🛡️ reCAPTCHA ενεργό - Προστασία από spam</span>
            <span v-else-if="recaptchaError">⚠️ reCAPTCHA μη διαθέσιμο - Συνεχίζουμε χωρίς προστασία</span>
          </span>
        </div>
      </div>

      <form @submit.prevent="submitBugReport" class="space-y-6">
        <!-- Basic Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="bug-type" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Τύπος Αναφοράς
            </label>
            <select
              id="bug-type"
              v-model="form.type"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Επιλέξτε τύπο...</option>
              <option value="Bug">🐛 Bug/Σφάλμα</option>
              <option value="Feature">✨ Νέα Χαρακτηριστικό</option>
              <option value="Improvement">🚀 Βελτίωση</option>
              <option value="Question">❓ Ερώτηση</option>
            </select>
          </div>

          <div>
            <label for="priority" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Προτεραιότητα
            </label>
            <select
              id="priority"
              v-model="form.priority"
              required
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Επιλέξτε προτεραιότητα...</option>
              <option value="Low">🟢 Χαμηλή</option>
              <option value="Medium">🟡 Μέτρια</option>
              <option value="High">🟠 Υψηλή</option>
              <option value="Critical">🔴 Κρίσιμη</option>
            </select>
          </div>
        </div>

        <!-- Title -->
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Τίτλος
          </label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            maxlength="100"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Σύντομος και περιγραφικός τίτλος..."
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ form.title.length }}/100 χαρακτήρες
          </p>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Περιγραφή
          </label>
          <textarea
            id="description"
            v-model="form.description"
            required
            rows="4"
            maxlength="1000"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Περιγράψτε το πρόβλημα ή την πρότασή σας με λεπτομέρεια..."
          ></textarea>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ form.description.length }}/1000 χαρακτήρες
          </p>
        </div>

        <!-- Steps to Reproduce -->
        <div>
          <label for="steps" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Βήματα Επανάληψης (για bugs)
          </label>
          <textarea
            id="steps"
            v-model="form.steps"
            rows="3"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="1. Βήμα πρώτο&#10;2. Βήμα δεύτερο&#10;3. Αποτέλεσμα..."
          ></textarea>
        </div>

        <!-- Expected vs Actual Behavior -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="expected" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Αναμενόμενη Συμπεριφορά
            </label>
            <textarea
              id="expected"
              v-model="form.expectedBehavior"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Τι θα έπρεπε να συμβαίνει..."
            ></textarea>
          </div>

          <div>
            <label for="actual" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Πραγματική Συμπεριφορά
            </label>
            <textarea
              id="actual"
              v-model="form.actualBehavior"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Τι συμβαίνει πραγματικά..."
            ></textarea>
          </div>
        </div>

        <!-- Contact Email -->
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Επικοινωνίας (προαιρετικό)
          </label>
          <input
            id="email"
            v-model="form.contactEmail"
            type="email"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="your@email.com"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Αν παρέχετε email, μπορούμε να σας ενημερώσουμε για την πρόοδο
          </p>
        </div>

        <!-- Submit Buttons -->
        <div class="flex gap-4">
          <BaseButton
            type="button"
            variant="secondary"
            @click="resetForm"
            :disabled="isSubmitting"
          >
            Εκκαθάριση
          </BaseButton>

          <BaseButton 
            type="submit" 
            variant="primary" 
            :disabled="isSubmitting || !sheetsAvailable"
          >
            <template #icon-left v-if="isSubmitting">
              <svg class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </template>
            <template #icon-left v-else>
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </template>
            {{ isSubmitting ? "Υποβολή..." : "Υποβολή Αναφοράς" }}
          </BaseButton>
        </div>
      </form>

      <!-- Submission Result -->
      <div v-if="submissionResult" class="mt-6">
        <div
          v-if="submissionResult.success"
          class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4"
        >
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="font-semibold text-green-800 dark:text-green-200">Επιτυχής Υποβολή!</h3>
              <p class="text-sm text-green-700 dark:text-green-300 mt-1">
                Η αναφορά σας υποβλήθηκε επιτυχώς. Θα την εξετάσουμε το συντομότερο δυνατό.
              </p>
            </div>
          </div>
        </div>

        <div
          v-else
          class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4"
        >
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 class="font-semibold text-red-800 dark:text-red-200">Σφάλμα Υποβολής</h3>
              <p class="text-sm text-red-700 dark:text-red-300 mt-1">
                {{ submissionResult.error }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
