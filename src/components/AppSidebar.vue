<script setup>
import { useSidebar } from "@/composables/useSidebar";
import OfflineIndicator from "@/components/OfflineIndicator.vue";

const { isSidebarOpen, closeSidebar } = useSidebar();
</script>

<template>
  <aside
    :class="[
      'fixed lg:static inset-y-0 left-0 top-16 z-20 w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 flex flex-col',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
    style="height: calc(100dvh - 4rem);"
  >
    <nav class="p-4 space-y-2 flex-1 overflow-y-auto">
      <router-link
        to="/"
        @click="closeSidebar"
        class="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        active-class="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
      >
        Dashboard
      </router-link>
      <router-link
        to="/scoreboard"
        @click="closeSidebar"
        class="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        active-class="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
      >
        Πίνακας Βαθμολογίας
      </router-link>
      <router-link
        to="/about"
        @click="closeSidebar"
        class="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        active-class="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
      >
        Σχετικά
      </router-link>
      <!-- <router-link
        to="/report-issue"
        @click="closeSidebar"
        class="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        active-class="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium"
      >
        Αναφορά Προβλήματος
      </router-link> -->
    </nav>

    <OfflineIndicator />
  </aside>
</template>

