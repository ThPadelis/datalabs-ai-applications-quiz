<script setup>
import { useSidebar } from "@/composables/useSidebar";

const { toggleSidebar } = useSidebar();
</script>

<template>
  <header
    class="bg-white border-b border-gray-200 h-16 flex items-center px-4 sticky top-0 z-30"
  >
    <button
      @click="toggleSidebar"
      class="lg:hidden mr-4 p-2 rounded-md hover:bg-gray-100 transition-colors"
    >
      <svg
        class="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    <router-link to="/" class="text-xl font-semibold">
      Datalabs AI Applications
    </router-link>
  </header>
</template>
