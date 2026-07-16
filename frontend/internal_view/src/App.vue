<script setup>
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import AppSidebar from '@/components/shared/AppSidebar.vue'
import AppHeader from '@/components/shared/AppHeader.vue'
import DevRoleSwitcher from '@/components/shared/DevRoleSwitcher.vue'

const route = useRoute()
const ui = useUiStore()
</script>

<template>
  <div v-if="route.path === '/login'">
    <RouterView />
  </div>
  <div v-else class="flex min-h-screen bg-[#E8ECF3]">
    <AppSidebar />
    <div
      class="flex w-full flex-col transition-all duration-200"
      :class="ui.sidebarCollapsed ? 'ml-20' : 'ml-68'"
    >
      <AppHeader />
      <main class="flex-1 px-4 pb-8 pt-4">
        <RouterView />
      </main>
    </div>
    <DevRoleSwitcher />
  </div>
</template>
