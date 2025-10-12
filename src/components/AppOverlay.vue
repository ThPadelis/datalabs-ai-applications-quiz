<script setup>
import { useSidebar } from "@/composables/useSidebar";

const { isSidebarOpen, toggleSidebar } = useSidebar();
</script>

<template>
  <div
    v-if="isSidebarOpen"
    @click="toggleSidebar"
    class="lg:hidden fixed inset-0 backdrop-blur-sm bg-white/30 z-10 top-16"
  ></div>
</template>

