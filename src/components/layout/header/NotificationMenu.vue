<template>
  <div class="relative" ref="dropdownRef">
    <button
      @click="toggleDropdown"
      class="relative flex items-center justify-center w-10 h-10 text-gray-500 bg-gray-100 rounded-lg dark:text-gray-400 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10 2C6.13401 2 3 5.13401 3 9V12.5858L1.29289 14.2929C1.10536 14.4804 1 14.7348 1 15V16C1 16.5523 1.44772 17 2 17H18C18.5523 17 19 16.5523 19 16V15C19 14.7348 18.8946 14.4804 18.7071 14.2929L17 12.5858V9C17 5.13401 13.866 2 10 2ZM5 9C5 6.23858 7.23858 4 10 4C12.7614 4 15 6.23858 15 9V13H5V9Z" fill="currentColor"/>
      </svg>
    </button>

    <div
      v-if="dropdownOpen"
      class="absolute right-0 mt-[17px] flex w-[300px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
    >
      <div class="px-3 py-2 border-b border-gray-200 dark:border-gray-800">
        <p class="text-sm font-medium text-gray-700 dark:text-gray-400">Notificaciones</p>
      </div>
      <div class="py-4 text-center text-sm text-gray-400">
        No hay notificaciones nuevas
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const dropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => { dropdownOpen.value = !dropdownOpen.value }

const handleClickOutside = (event: Event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) dropdownOpen.value = false
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>
