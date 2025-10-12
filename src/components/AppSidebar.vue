<script setup>
import { useSidebar } from "@/composables/useSidebar";

const { isSidebarOpen, closeSidebar } = useSidebar();
</script>

<template>
  <aside
    :class="[
      'fixed lg:static inset-y-0 left-0 top-16 z-20 w-64 bg-gray-50 border-r border-gray-200 transform transition-transform duration-300',
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <nav class="p-4 space-y-2">
      <router-link
        to="/"
        @click="closeSidebar"
        class="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
        active-class="bg-blue-50 text-blue-700 font-medium"
      >
        Dashboard
      </router-link>
      <router-link
        to="/scoreboard"
        @click="closeSidebar"
        class="block px-4 py-2 rounded-md hover:bg-gray-100 text-gray-700"
        active-class="bg-blue-50 text-blue-700 font-medium"
      >
        Πίνακας Βαθμολογίας
      </router-link>
    </nav>
  </aside>
</template>

