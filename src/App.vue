<script setup>
import AppTopBar from "@/components/AppTopBar.vue";
import AppSidebar from "@/components/AppSidebar.vue";
import AppOverlay from "@/components/AppOverlay.vue";
import AppFooter from "@/components/AppFooter.vue";
import OfflineIndicator from "@/components/OfflineIndicator.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppTopBar />

    <div class="flex flex-1 relative">
      <AppSidebar />
      <AppOverlay />

      <main class="flex-1 flex flex-col bg-gray-100 overflow-auto">
        <div class="flex-1 p-6">
          <div class="max-w-7xl mx-auto">
            <router-view />
          </div>
        </div>

        <AppFooter />
      </main>
    </div>

    <OfflineIndicator />
  </div>
</template>
