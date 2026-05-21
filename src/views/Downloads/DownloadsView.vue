<template>
  <admin-layout>
    <div class="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div class="flex items-center justify-between mb-6">
        <div>
          <h2 class="text-xl font-semibold text-gray-800 dark:text-white/90">Descargas</h2>
          <p class="text-sm text-gray-500">Links de descarga registrados</p>
        </div>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <svg class="animate-spin h-8 w-8 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
      </div>

      <div v-else-if="downloads.length === 0" class="text-center py-12 text-gray-400">
        No hay descargas registradas
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-200 dark:border-gray-800">
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Archivo</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">URL</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Tamaño</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Estado</th>
              <th class="text-left py-3 px-2 font-medium text-gray-500 dark:text-gray-400">Creado</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dl in downloads" :key="dl.id" class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
              <td class="py-3 px-2">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                  <span class="font-medium text-gray-800 dark:text-white/90">{{ dl.fileName || 'Sin nombre' }}</span>
                </div>
              </td>
              <td class="py-3 px-2">
                <a :href="dl.url" target="_blank" class="text-brand-500 hover:text-brand-600 truncate max-w-[200px] block">{{ dl.url }}</a>
              </td>
              <td class="py-3 px-2 text-gray-500">{{ formatSize(dl.fileSize) }}</td>
              <td class="py-3 px-2">
                <Badge :color="statusColor(dl.status)" size="sm">{{ dl.status }}</Badge>
              </td>
              <td class="py-3 px-2 text-gray-500">{{ new Date(dl.createdAt).toLocaleDateString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </admin-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminLayout from '@/components/layout/AdminLayout.vue'
import Badge from '@/components/ui/Badge.vue'
import { getDownloads } from '@/composables/useApi'

const downloads = ref<any[]>([])
const loading = ref(true)

const loadDownloads = async () => {
  loading.value = true
  try { downloads.value = await getDownloads() }
  catch (e) { console.error(e) }
  finally { loading.value = false }
}

const formatSize = (bytes: number | null) => {
  if (!bytes) return '-'
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i]
}

const statusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'success'
    case 'downloading': return 'info'
    case 'pending': return 'warning'
    case 'error': return 'error'
    default: return 'light'
  }
}

onMounted(loadDownloads)
</script>
