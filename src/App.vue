<script setup>
import AppTopBar from "@/components/AppTopBar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import AppOverlay from "@/components/AppOverlay.vue";
import AppFooter from "@/components/AppFooter.vue";
</script>

<template>
  <div class="h-[100dvh] flex flex-col overflow-hidden">
    <AppTopBar />

    <div class="flex flex-1 relative overflow-hidden">
      <AppSidebar />
      <AppOverlay />

      <main class="flex-1 flex flex-col bg-gray-100 overflow-y-auto">
        <div class="flex-1 p-6 overflow-y-auto">
          <div class="max-w-7xl mx-auto">
            <router-view />
          </div>
        </div>

        <AppFooter />
      </main>
    </div>
  </div>
</template>
