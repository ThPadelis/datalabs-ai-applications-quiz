<script setup>
import BaseButton from "@/components/BaseButton.vue";
import { useRouter } from "vue-router";
import { useAppInfo } from "@/composables/useAppInfo";

const router = useRouter();
const { version, buildDate, framework, status } = useAppInfo();

const goToDashboard = () => {
  router.push("/");
};
</script>

<template>
  <div class="max-w-4xl mx-auto">
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
        Σχετικά με την Εφαρμογή
      </h1>
      <p class="text-gray-600 dark:text-gray-400 mb-8">Datalabs AI Applications Quiz</p>

      <div class="space-y-8">
        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Τι είναι αυτή η εφαρμογή;
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Η εφαρμογή <strong>Datalabs AI Applications Quiz</strong> είναι ένα
            διαδραστικό σύστημα αξιολόγησης γνώσεων που δημιουργήθηκε για το
            webinar
            <strong
              >"Εφαρμογές Τεχνητής Νοημοσύνης σε Οργανισμούς και
              Επιχειρήσεις"</strong
            >.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Πρόκειται για μια πλήρως λειτουργική Progressive Web App (PWA) που
            επιτρέπει στους χρήστες να αξιολογήσουν τις γνώσεις τους στον τομέα
            της Τεχνητής Νοημοσύνης, ακόμα και χωρίς σύνδεση στο διαδίκτυο.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Σκοπός</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Ο κύριος στόχος της εφαρμογής είναι να παρέχει μια σύγχρονη,
            προσβάσιμη και αποτελεσματική μέθοδο αξιολόγησης για τους
            συμμετέχοντες του webinar. Μέσω αυτής της πλατφόρμας, οι χρήστες
            μπορούν να:
          </p>
          <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 ml-4">
            <li>
              Δοκιμάσουν τις γνώσεις τους σε 7 διαφορετικές αξιολογήσεις + 1 μικτή
            </li>
            <li>Λάβουν άμεση ανατροφοδότηση με αναλυτικές επεξηγήσεις</li>
            <li>
              Παρακολουθήσουν την πρόοδό τους μέσω του πίνακα βαθμολογίας
            </li>
            <li>Μάθουν από τα λάθη τους με εκπαιδευτικό υλικό</li>
            <li>Χρησιμοποιήσουν την εφαρμογή οπουδήποτε, ακόμα και offline</li>
          </ul>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Χαρακτηριστικά
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <svg
                class="w-6 h-6 text-blue-600 flex-shrink-0 mt-1"
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
                <h3 class="font-semibold text-gray-900 dark:text-blue-100">120 Ερωτήσεις</h3>
                <p class="text-sm text-gray-600 dark:text-blue-200">
                  7 αξιολογήσεις + 1 μικτή με τυχαίες ερωτήσεις
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <svg
                class="w-6 h-6 text-green-600 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-green-100">Progressive Web App</h3>
                <p class="text-sm text-gray-600 dark:text-green-200">
                  Εγκαθίσταται στη συσκευή σας σαν εφαρμογή
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
              <svg
                class="w-6 h-6 text-purple-600 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414"
                />
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-purple-100">Λειτουργία Offline</h3>
                <p class="text-sm text-gray-600 dark:text-purple-200">
                  Πλήρης λειτουργικότητα χωρίς διαδίκτυο
                </p>
              </div>
            </div>

            <div class="flex items-start gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
              <svg
                class="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-yellow-100">Παρακολούθηση Προόδου</h3>
                <p class="text-sm text-gray-600 dark:text-yellow-200">
                  Αποθήκευση ιστορικού και στατιστικών
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Τεχνολογίες
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Η εφαρμογή κατασκευάστηκε με σύγχρονες τεχνολογίες web:
          </p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <p class="font-semibold text-gray-900 dark:text-white">Vue 3</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Frontend Framework</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <p class="font-semibold text-gray-900 dark:text-white">Vite</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Build Tool</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <p class="font-semibold text-gray-900 dark:text-white">Tailwind CSS v4</p>
              <p class="text-xs text-gray-400 dark:text-gray-400">Styling</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <p class="font-semibold text-gray-900 dark:text-white">PWA</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Progressive Web App</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <p class="font-semibold text-gray-900 dark:text-white">IndexedDB</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Local Storage</p>
            </div>
            <div class="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-center">
              <p class="font-semibold text-gray-900 dark:text-white">Service Worker</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">Offline Support</p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ανάπτυξη
          </h2>
          <div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div
                  class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                >
                  PT
                </div>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Pantelis Theodosiou
                </h3>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Η εφαρμογή αναπτύχθηκε στο πλαίσιο του webinar για τις
                  Εφαρμογές Τεχνητής Νοημοσύνης σε Οργανισμούς και Επιχειρήσεις.
                </p>
                <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Δημιουργήθηκε με στόχο να προσφέρει μια
                  <strong>διαδραστική εναλλακτική</strong> στην παραδοσιακή
                  μελέτη μέσω αρχείων PDF. Αντί να διαβάζουν στατικά έγγραφα, οι
                  χρήστες μπορούν τώρα να μαθαίνουν μέσω μιας δραστικής,
                  ενδιαφέρουσας και εκπαιδευτικής εμπειρίας.
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Αναπτύχθηκε με σύγχρονες τεχνολογίες web για να παρέχει μια
                  προσβάσιμη, γρήγορη και offline-capable εφαρμογή που βοηθά
                  όποιον θέλει να εμβαθύνει στις γνώσεις του για την Τεχνητή
                  Νοημοσύνη με έναν πιο ενεργητικό και διασκεδαστικό τρόπο.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Ιδιωτικότητα & Δεδομένα
          </h2>
          <div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <div class="flex items-start gap-3 mb-4">
              <svg
                class="w-6 h-6 text-green-600 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
                  Τα δεδομένα σας είναι ασφαλή
                </h3>
                <ul class="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                  <li class="flex items-start gap-2">
                    <svg
                      class="w-5 h-5 text-green-600 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span
                      >Όλα τα δεδομένα αποθηκεύονται τοπικά στη συσκευή
                      σας</span
                    >
                  </li>
                  <li class="flex items-start gap-2">
                    <svg
                      class="w-5 h-5 text-green-600 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Καμία επικοινωνία με εξωτερικούς servers</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <svg
                      class="w-5 h-5 text-green-600 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Χωρίς tracking ή analytics</span>
                  </li>
                  <li class="flex items-start gap-2">
                    <svg
                      class="w-5 h-5 text-green-600 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Πλήρης έλεγχος των δεδομένων από τον χρήστη</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Θεματικές Ενότητες
          </h2>
          <div class="space-y-3">
            <div class="border-l-4 border-green-500 pl-4 py-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Αξιολόγηση 1 - DYPA300: Τεχνητή Νοημοσύνη (AI)
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Επίπεδο: Εύκολο</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Αξιολόγηση 2 - DYPA300: Παραγωγική Τεχνητή Νοημοσύνη (Generative AI)
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Επίπεδο: Μέτριο</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Αξιολόγηση 3 - DYPA300: Πολυτροπικά Μοντέλα και Εργαλεία AI
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Επίπεδο: Μέτριο</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Αξιολόγηση 4 - DYPA300: Επιχειρηματική Εφαρμογή της Τεχνητής Νοημοσύνης
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Επίπεδο: Μέτριο</p>
            </div>
            <div class="border-l-4 border-green-500 pl-4 py-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Αξιολόγηση 5 - DYPA300: Βασικές Έννοιες και Επιπτώσεις της Τεχνητής Νοημοσύνης
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Επίπεδο: Εύκολο</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Αξιολόγηση 6 - DYPA300: Ηθική και Υπεύθυνη Χρήση της Τεχνητής Νοημοσύνης
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Επίπεδο: Μέτριο</p>
            </div>
            <div class="border-l-4 border-yellow-500 pl-4 py-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Αξιολόγηση 7 - DYPA300: AI & Prompt Engineering Quiz (Full Set)
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">Επίπεδο: Μέτριο</p>
            </div>
            <div class="border-l-4 border-purple-500 pl-4 py-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                Μικτή Αξιολόγηση
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Επίπεδο: Μικτό · 10 τυχαίες ερωτήσεις από όλες τις ενότητες
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Έκδοση</h2>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-600 dark:text-gray-400">Έκδοση Εφαρμογής:</p>
                <p class="font-semibold text-gray-900 dark:text-white">{{ version }}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400">Τελευταία Ενημέρωση:</p>
                <p class="font-semibold text-gray-900 dark:text-white">{{ buildDate }}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400">Framework:</p>
                <p class="font-semibold text-gray-900 dark:text-white">{{ framework }}</p>
              </div>
              <div>
                <p class="text-gray-600 dark:text-gray-400">Κατάσταση:</p>
                <p class="font-semibold text-green-600 dark:text-green-400">{{ status }}</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Επικοινωνία
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Για περισσότερες πληροφορίες σχετικά με το webinar ή την εφαρμογή,
            επικοινωνήστε με την ομάδα του Datalabs.
          </p>
        </section>
      </div>

      <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          © 2025
          <a
            href="https://pantelis.theodosiou.me"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-600 hover:text-blue-700 hover:underline font-medium"
          >
            Pantelis Theodosiou
          </a>
          . All rights reserved.
        </p>
      </div>
    </div>
  </div>
</template>

