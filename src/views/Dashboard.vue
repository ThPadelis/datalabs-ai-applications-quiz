<script setup>
import { ref } from "vue";
import AssessmentCard from "@/components/AssessmentCard.vue";
import { assessments as allAssessments } from "@/data";

const assessments = ref(allAssessments);
</script>

<template>
  <div>
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h2>
      <p class="text-gray-600 dark:text-gray-400 mt-1">
        Επιλέξτε μια αξιολόγηση για να ξεκινήσετε
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <AssessmentCard
        v-for="assessment in assessments"
        :key="assessment.id"
        :assessment="assessment"
      />
    </div>

    <div v-if="assessments.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400">Φόρτωση αξιολογήσεων...</p>
    </div>
  </div>
</template>